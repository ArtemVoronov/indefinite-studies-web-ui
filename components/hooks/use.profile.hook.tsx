import { useContext } from 'react'
import { ProfileContext } from '../context/profile.context'

export const useProfile = () => {
  const { profile, setProfile } = useContext(ProfileContext)
  return [profile, setProfile]
}