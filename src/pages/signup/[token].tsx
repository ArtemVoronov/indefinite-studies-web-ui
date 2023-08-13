import * as React from "react"
import Overlay from "../../components/overlay/overlay"
import { USERS_SERVICE } from "../../services/users/users.service"
import { SPIN_ICON_SHOWING_TIMEOUT } from "../../utils/utils"
import StyledLink from "../../components/buttons/styled.link"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"

const SignUpConfirmationPage = (props: { token?: string }) => {
  const { t } = useTranslation()
  const { token } = props
  const [isLoading, setIsLoading] = React.useState(false)
  const [isConfirmed, setIsConfirmed] = React.useState(false)

  const fetchConfirmRegistration = async () => {
    if (!token) {
      return
    }
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, SPIN_ICON_SHOWING_TIMEOUT)

    try {
      const response = await USERS_SERVICE.confirmRegistration({ token: token })
      clearTimeout(timer)
      if (response.status === 200) {
        setIsConfirmed(true)
      }
    } finally {
      clearTimeout(timer)
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchConfirmRegistration()
  }, [])

  if (isLoading) return (
    <div>
      <Overlay />
    </div>
  )

  if (isConfirmed) return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-1 justify-center items-center flex-col h-screen">
        <p>{t("email.was.confirmed")}</p>
        <StyledLink href="/login" text={t("sign.in")} />
      </div>
    </div>
  )

  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-1 justify-center items-center flex-col h-screen">
        <p>{t("error.occured")}</p>
        <StyledLink href="/signup/resend" text={t("resend.confirmation")} />
      </div>
    </div>
  )
}

export default SignUpConfirmationPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

export { Head } from "../../components/layout/basic.layout"