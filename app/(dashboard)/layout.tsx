import Header from '@/components/header'
import React from 'react'

type props = {
children: React.ReactNode
}

function DashboardLayout({
    children
}: props) {
  return (
    <>
    <Header />
    <main className='px-3 lg:px-14'>
        {children}
    </main>
    </>

  )
}

export default DashboardLayout