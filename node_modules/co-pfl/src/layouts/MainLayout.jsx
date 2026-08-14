import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../components/NavbarComponent'
import FooterComponent from '../components/FooterComponent'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900">
      <NavbarComponent />
      <main className="container mx-auto px-4 py-10">
        <Outlet />
      </main>
      <FooterComponent />
    </div>
  )
}
