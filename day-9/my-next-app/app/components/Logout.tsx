import React from 'react'
import logout from '../actions/logout'

function Logout() {
  return (
    <button onClick={logout}>Logout</button>
  )
}

export default Logout
