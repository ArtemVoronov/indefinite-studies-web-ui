
import { classNames } from "../../utils/utils"

const StyledTextInput = (props: {
  id: string, register: any, required?: boolean, placeholder?: any, classes?: string,
  defaultValue?: any, type?: any, autoComplete?: any
}) => {
  const { id, required, placeholder, classes, register, defaultValue, type, autoComplete } = props

  return (
    <input
      defaultValue={defaultValue}
      id={id}
      required={required}
      type={type}
      autoComplete={autoComplete}
      {...register(id)}
      placeholder={placeholder}
      className={classNames(
        classes ? classes : "",
        "primary-input relative block w-full appearance-none rounded-md border px-3 py-2 focus:z-10 focus:outline-none sm:text-sm"
      )}
    />
  )
}

export default StyledTextInput
