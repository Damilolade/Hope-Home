import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Info, ConciergeBell, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  const socials = [
    { icon: Facebook,  href: '#' },
    { icon: Twitter,   href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin,  href: '#' },
  ]

  const navLinks = [
    { to: '/',         label: 'Home',     icon: Home          },
    { to: '/about',    label: 'About',    icon: Info          },
    { to: '/services', label: 'Services', icon: ConciergeBell },
    { to: '/contact',  label: 'Contact',  icon: Mail          },
  ]

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl tracking-tight">
            <span className="text-indigo-400">Hope</span>
            <span className="text-gray-500">_</span>
            <span className="text-white">Home</span>
          </h2>
          <p className="text-sm leading-relaxed">
            Your trusted partner in finding the perfect home. We connect people with properties they'll love.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Quick Links</h3>
          <nav className="flex flex-col gap-2">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2 text-sm hover:text-indigo-400 transition-colors"
              >
                <Icon size={14} />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Contact</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-indigo-400 shrink-0" />
              123 Hope Street, Lagos, Nigeria
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-indigo-400 shrink-0" />
              +234 800 000 0000
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-indigo-400 shrink-0" />
              info@hopehome.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider">Follow Us</h3>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href }, i) => (
                <a
                key={i}
                href={href}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-indigo-600 hover:text-white transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} Hope_Home. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer