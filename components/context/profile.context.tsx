import { createContext, useState } from 'react'

export const ProfileContext = createContext()

const { Provider } = ProfileContext

const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState(undefined)

    return (
        <Provider value={{ profile, setProfile }}>
            {children}
        </Provider>
    )
}

export default ProfileProvider