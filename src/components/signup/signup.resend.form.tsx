import * as React from "react"
import { useForm } from "react-hook-form"
import { USERS_SERVICE } from "../../services/users/users.service"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { useErrorModal } from "../hooks/use.error.modal.hook"
import StyledButton from "../buttons/styled.button"
import StyledTextInput from "../form/styled.input"

const ResendSignUpConfirmationForm = () => {
  const { t } = useTranslation()
  const { register, handleSubmit } = useForm()
  const [showErrorModal] = useErrorModal()
  const [isEmailSent, setIsEmailSent] = React.useState(false)

  const resend = (data: any) => {
    const { email } = data
    USERS_SERVICE.resendRegistration({ email }).then((res) => {
      if (!res || res.status != 200) {
        showErrorModal(true,
          t("error.page.unexpected.error.occurred"),
          t("error.page.unable.to.resend.sign.up.confirmation.link") + " " + t("error.page.please.repeat.action.or.reload.the.page")
        )
        return
      }
      setIsEmailSent(true)
    })
  }

  if (isEmailSent) {
    return (
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {t("sign.up.page.link.was.sent")}
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
            {t("send.cofirmation.header")}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(resend)}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                {t("sign.up.page.email.label")}
              </label>
              <StyledTextInput id="email" type="email" autoComplete="email" placeholder={t("sign.up.page.email.placeholder")} required register={register} />
            </div>

          </div>

          <div>
            <StyledButton text={t("send.cofirmation.btn")} classes="w-52" />
          </div>
        </form>

      </div>
    </div>
  )
}

export default ResendSignUpConfirmationForm