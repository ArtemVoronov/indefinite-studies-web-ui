import * as React from "react"

const ButtonWithToolTip = (props: { text: string, action: () => void, icon?: any }) => {
    return (
        <button onClick={props.action} className="group relative text-indigo-600 hover:text-indigo-500 background-transparent font-bold uppercase px-1 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            {props.icon}
            <span className="z-10 absolute hidden group-hover:flex -top-2 -right-3 translate-x-full w-40 px-2 py-2 bg-gray-700 rounded-lg text-center text-white text-sm before:content-[''] before:absolute before:top-1/2  before:right-[100%] before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-gray-700">
                {props.text}
            </span>
        </button>

    )
}

export default ButtonWithToolTip


