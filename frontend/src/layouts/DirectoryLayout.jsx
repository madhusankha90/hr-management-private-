import React from 'react'
import { Outlet } from 'react-router-dom'

const DirectoryLayout = () => {
  return (
    <div className='flex mx-auto'>
        <Outlet />
    </div>
  )
}

export default DirectoryLayout