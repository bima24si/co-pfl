import React from 'react'
import { NavLink } from 'react-router-dom'
import ButtonComponent from './ButtonComponent'

const navLinkClass = ({ isActive }) =>
  `text-gray-700 hover:text-green-600 transition ${isActive ? 'font-semibold text-green-600' : ''}`

export default function NavbarComponent() {

  return (
    <header className="w-full bg-white">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-2xl font-extrabold text-green-600">PCR</div>
          <div className="hidden md:block text-sm text-gray-600">Politeknik Caltex Riau</div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass} end>
            Beranda
          </NavLink>
          <NavLink to="/prodi" className={navLinkClass}>
            Prodi
          </NavLink>
          <NavLink to="/tentang" className={navLinkClass}>
            Tentang
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <a href="#" className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.879v-6.99H7.898v-2.889h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.775-1.63 1.568v1.882h2.773l-.443 2.889h-2.33v6.99C18.343 21.128 22 16.99 22 12z" /></svg>
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.04c-5.496 0-9.96 4.464-9.96 9.96 0 4.406 2.868 8.152 6.84 9.48.5.092.68-.216.68-.48 0-.236-.008-.866-.012-1.698-2.782.604-3.37-1.34-3.37-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.068-.606.068-.606 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.342 1.087 2.91.832.09-.646.35-1.087.636-1.337-2.222-.252-4.555-1.112-4.555-4.944 0-1.092.39-1.986 1.03-2.684-.104-.253-.447-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.56 9.56 0 0112 6.844c.85.004 1.705.115 2.504.338 1.909-1.294 2.748-1.025 2.748-1.025.547 1.377.203 2.394.1 2.647.642.698 1.03 1.592 1.03 2.684 0 3.843-2.337 4.688-4.565 4.936.36.31.68.92.68 1.857 0 1.34-.012 2.42-.012 2.748 0 .267.18.577.688.48A9.964 9.964 0 0022 12c0-5.496-4.464-9.96-9.96-9.96z" /></svg>
            </a>
          </div>

          <div className="hidden md:block">
            <ButtonComponent label="Daftar / Masuk" variant="outline" />
          </div>

          <div className="md:hidden">
            <button aria-label="menu" className="p-2 rounded-md hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
