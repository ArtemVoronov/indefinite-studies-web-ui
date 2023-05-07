import * as React from "react"
import { useForm } from "react-hook-form"
import { AUTH_SERVICE } from "../../services/auth/auth.service"
import { USERS_SERVICE } from "../../services/users/users.service"
import Router from "next/router"
import Image from 'next/image'
import faviconPic from '../../public/favicon.ico'
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'
import { useProfile } from '../hooks/use.profile.hook'
import { useTranslation } from "next-i18next"
import { useErrorModal } from "../hooks/use.error.modal.hook"
import StyledButton from "../buttons/styled.button"
import StyledLink from "../buttons/styled.link"
import StyledTextInput from "../form/styled.input"

const LoginForm = () => {
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()
  const [showErrorModal] = useErrorModal()
  const { t } = useTranslation()
  const [, setProfile] = useProfile()

  const login = (data: any) => {
    const { email, password } = data
    AUTH_SERVICE.login(email, password).then(() => {
      USERS_SERVICE.getMe().then((res) => {
        if (!res) {
          setError("wrongCreds", { type: "focus", message: t("sign.in.page.error.wrong.credentials") }, { shouldFocus: true });
          return
        }
        setProfile(res)
        Router.push("/posts/0")
      })
    }).catch(() => {
      showErrorModal(true,
        t("error.page.unexpected.error.occurred"),
        t("error.page.unable.to.sign.in") + " " + t("error.page.please.repeat.action.or.reload.the.page")
      )
    })
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center">
          <Image src={faviconPic} alt="Indefinite Studies" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            {t("sign.in.page.header")}
          </h2>
        </div>
        <form className="mt-8 space-y-6"
          onSubmit={(e) => {
            clearErrors()
            handleSubmit(login)(e)
          }}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                {t("sign.in.page.email.label")}
              </label>
              <StyledTextInput id="email" type="email" autoComplete="email" placeholder={t("sign.in.page.email.placeholder")} required register={register} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                {t("sign.in.page.password.label")}
              </label>
              <StyledTextInput id="password" type="password" autoComplete="current-password" placeholder={t("sign.in.page.password.placeholder")} required register={register} />
            </div>
            {errors.wrongCreds && (
              <div className="primary-error-content-block my-1 py-2 px-2 rounded-md text-sm flex justify-center items-center">
                <div className="primary-modal-error-icon-wrapper mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon className="h-6 w-6 primary-modal-error-icon" aria-hidden="true" />
                </div>
                <div className="ml-2">{`${errors.wrongCreds.message}`}</div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-bold">
              <StyledLink href="/restorepwd" text={t("sign.in.page.forgot.password.link")} />
            </div>
          </div>

          <div className="flex justify-center">
            <StyledButton text={t("btn.sign.in")} classes="w-52" />
          </div>
        </form>

      </div>
    </div>
  )
}

export default LoginForm