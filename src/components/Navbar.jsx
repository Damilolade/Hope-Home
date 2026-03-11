import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Info, Briefcase, Mail, Menu, X } from 'lucide-react'
import logo from '../assets/logo.jpg'

const navLinks = [
  { to: '/',         label: 'Home',     icon: Home      },
  { to: '/about',    label: 'About',    icon: Info      },
  { to: '/services', label: 'Services', icon: Briefcase },
  { to: '/contact',  label: 'Contact',  icon: Mail      },
]

const Navbar = () => {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-green-600 border-b border-black shadow-lg rounded-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between ">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src={logo} alt="Hope Home Logo" className="w-8 h-8 object-contain" />
          <h2 className="font-bold text-xl tracking-tight">
            <span className="text-indigo-600">Hope</span>
            <span className="text-black">_</span>
            <span className="text-white">Home</span>
          </h2>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'text-black hover:text-white hover:bg-yellow-500 hover:shadow-md hover:shadow-yellow-400/30   '
                  }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-900 border-t border-gray-800 px-4 pb-4 flex flex-col gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const active = pathname === to
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${active
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}

export default Navbar