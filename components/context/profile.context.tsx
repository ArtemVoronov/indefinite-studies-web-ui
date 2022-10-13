import { createContext, useState } from 'react'
import * as React from 'react';
import { User } from '../../services/users/users.service';

interface Props {
    children?: React.ReactNode
    // any props that come into the component
}

type ProfileContextType = {
    profile: User | undefined,
    setProfile: any
}

export const ProfileContext = createContext({} as ProfileContextType)

const { Provider } = ProfileContext

const ProfileProvider = ({ children }: Props) => {
    const [profile, setProfile] = useState(undefined)

    return (
        <Provider value={{ profile, setProfile }}>
            {children}
        </Provider>
    )
}

export default ProfileProvider