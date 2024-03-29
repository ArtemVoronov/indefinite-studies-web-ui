import * as React from "react"
import { useForm } from "react-hook-form"
import { USERS_SERVICE } from "../../services/users/users.service"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useErrorModal } from "../hooks/use.error.modal.hook"
import StyledButton from "../buttons/styled.button"
import StyledLink from "../buttons/styled.link"
import StyledTextInput from "../form/styled.input"

const RestorePasswordForm = (props: { token: string }) => {
  const { t } = useTranslation()
  const { register, handleSubmit } = useForm()
  const [showErrorModal] = useErrorModal()
  const [isDone, setDone] = React.useState(false)
  const { token } = props
  const resend = (data: any) => {
    const { password } = data
    USERS_SERVICE.confirmPassword({ token, password }).then((res) => {
      if (!res || res.status != 200) {
        showErrorModal(true,
          t("error.page.unexpected.error.occurred"),
          t("error.page.unable.to.restore.password") + " " + t("error.page.please.repeat.action.or.reload.the.page")
        )
        return
      }
      setDone(true)
    })
  }

  if (isDone) {
    return (
      <div className="flex flex-1 justify-center items-center flex-col h-screen">
        <p>{t("restore.pwd.page.password.was.changed")}</p>
        <StyledLink href={"/login"} text={t("restore.pwd.page.sign.in.link")} />
      </div>
    )
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          {/* TODO */}
          {/* <Image src={faviconPic} alt="Indefinite Studies" /> */}
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            {t("restore.pwd.page.header")}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(resend)}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">
                {t("restore.pwd.page.password.label")}
              </label>
              <StyledTextInput id="password" type="password" autoComplete="current-password" placeholder={t("restore.pwd.page.password.placeholder")} required register={register} />
            </div>
          </div>

          <div>
            <StyledButton text={t("restore.pwd.page.btn.restore.password")} classes="w-52" />
          </div>
        </form>

      </div>
    </div>
  )
}

export default RestorePasswordForm