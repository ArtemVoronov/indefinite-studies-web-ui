
import React from "react"
import { classNames } from "../../utils/utils"

const StyledTextInput = (props: {
  id: string, register?: any, required?: boolean, placeholder?: any, classes?: string,
  defaultValue?: any, type?: any, autoComplete?: any, onChange?: (e: any) => void
  checked?: boolean, autofocus?: boolean, disabled?: boolean
}) => {
  const { id, required, placeholder, classes, defaultValue, type, autoComplete, onChange, checked, autofocus, disabled } = props
  let register = props.register
  if (!register) {
    register = {}
  } else {
    register = register(id)
  }
  return (
    <input
      defaultValue={defaultValue}
      id={id}
      required={required}
      type={type}
      autoComplete={autoComplete}
      onChange={onChange}
      autoFocus={autofocus}
      checked={checked}
      disabled={disabled}
      {...register}
      placeholder={placeholder}
      className={classNames(
        classes ? classes : "w-full",
        "primary-input relative block appearance-none rounded-md border px-3 py-3 focus:z-10 focus:outline-none sm:text-sm"
      )}
    />
  )
}

export default StyledTextInput
