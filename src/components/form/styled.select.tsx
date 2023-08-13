
import React from "react"
import { classNames } from "../../utils/utils"

const StyledSelect = (props: {
  id: string, register?: any, required?: boolean, placeholder?: any, classes?: string,
  defaultValue?: any, multiline?: boolean, options: Option[], onChange?: (e: any) => void
}) => {
  const { id, required, classes, defaultValue, options, placeholder, onChange } = props
  let register = props.register
  if (!register) {
    register = {}
  } else {
    register = register(id)
  }

  return (
    <select
      defaultValue={defaultValue}
      id={id}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      {...register}
      className={classNames(
        classes ? classes : "w-56",
        "primary-input mt-1 block rounded-md border py-3 px-3 shadow-sm sm:text-sm"
      )}>
      {options.map(function (p: Option, idx) {
        return <option value={p.value} label={p.label} key={idx} />
      })}
    </select>
  )
}

export type Option = {
  value: string,
  label: string
}

export default StyledSelect
