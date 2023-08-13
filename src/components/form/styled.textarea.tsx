
import React from "react"
import { classNames } from "../../utils/utils"

const StyledTextArea = (props: { id: string, register: any, required?: boolean, rows?: any, placeholder?: any, classes?: string, defaultValue?: any }) => {
  const { id, required, placeholder, rows, classes, register, defaultValue } = props

  return (
    <textarea
      defaultValue={defaultValue}
      id={id}
      required={required}
      {...register(id)}
      placeholder={placeholder}
      rows={rows}
      className={classNames(
        classes ? classes : "",
        "primary-input relative block w-full appearance-none rounded-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
      )}
    />
  )
}

export default StyledTextArea
