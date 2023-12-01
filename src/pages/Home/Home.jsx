import React from 'react'

import useUserContext from '../../hooks/useUserContext'

export default function Home() {
  const user = useUserContext()

  // if(user) ==> set Avatar,....

  return (
    <div>
      <div> goi bac si</div>
      <div> trang result</div>
      <div> Do nhip tim</div>
    </div>
  )
}
