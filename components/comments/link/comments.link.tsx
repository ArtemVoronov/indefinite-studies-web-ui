import * as React from "react"
import StyledLink from "../../buttons/styled.link"

const CommentLink = (props: { postUuid: string, commentIndex: number }) => {
  const { postUuid, commentIndex } = props
  return (
    <StyledLink href={"/post/" + postUuid + "#comment_" + commentIndex} text={"#" + commentIndex} />
  )
}

export default CommentLink