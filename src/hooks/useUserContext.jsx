import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'

const useUserContext = () => {
  const user = useContext(UserContext)

  if (!user) throw Error('not user')

  return user
}

export default useUserContext
