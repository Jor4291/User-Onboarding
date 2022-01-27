import React from 'react'

function Member({ details }) {
  if (!details) {
    return <h3>Working fetching your Member&apo;s details...</h3>
  }

  return (
    <div className='Member container'>
      <h2>{details.username}</h2>
      <p>Email: {details.email}</p>
      <p>Role: {details.role}</p>
      <p>Password: {details.password}</p>
    </div>
  )
}

export default Member;
