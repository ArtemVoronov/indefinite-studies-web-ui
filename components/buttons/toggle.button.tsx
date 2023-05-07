import * as React from "react"

const ToggleButton = (props: { checked: boolean, text?: string, action: () => void, icon?: any }) => {
  return (
    <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
      <input type="checkbox" value="" checked={props.checked} id="default-toggle" className="sr-only peer" onChange={props.action} />
      <div className="primary-toggle w-11 h-6 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
      <span className="ml-2 text-sm font-medium primary-toggle-text">
        {props.icon}
      </span>
      <span className="ml-2 text-sm font-medium primary-toggle-text">
        {props.text}
      </span>
    </label>
  )
}

export default ToggleButton


