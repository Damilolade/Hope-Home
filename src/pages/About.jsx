import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2, Users, Wrench, FileText, TrendingUp, ShieldCheck,
  CreditCard, ArrowRight, CheckCircle, BadgeCheck, Receipt, Eye
} from 'lucide-react'

// ── Animation hook ────────────────────────────────────────────────────────────

const useFadeIn = (delay = 0) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0) scale(1)'
          }, delay)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return ref
}

// ── Data ──────────────────────────────────────────────────────────────────────

const coreFeatures = [
  {
    icon: Building2,
    title: 'Landlords & Subscribers ',
    desc: 'Property owners list their estates. Subscribers choose, pay, and track their investment — all from one dashboard.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
  },
  {
    icon: BadgeCheck,
    title: 'Realtor Agency & Unique CID',
    desc: 'Every realtor — from any agency — gets a unique Client Identification (CID). Commissions are auto-calculated and paid instantly at the point of subscriber payment.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
  },
  {
    icon: Wrench,
    title: 'Contractors & Vendors',
    desc: 'Registered vendors and contractors receive their percentage automatically when a subscriber makes payment — zero delay, zero dispute.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
  },
  {
    icon: CreditCard,
    title: 'Automatic Split Payments',
    desc: 'Whether the realtor belongs to Hope Homes or an external agency, their CID is recognized and their share is disbursed automatically.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  {
    icon: Eye,
    title: 'Live Site Progress',
    desc: 'Subscribers can monitor real-time construction and renovation progress on their property directly from their personal dashboard.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
  },
  {
    icon: FileText,
    title: 'Full Document Access',
    desc: 'Survey, Deed, Contract of Sales, Receipts, Invoices — all automatically updated and available to print anytime.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
  },
]

const values = [
  { title: 'Transparency',  desc: 'Every naira is tracked. Every document is accessible. Nothing is hidden.'       },
  { title: 'Automation',    desc: 'Payments, commissions, invoices — all handled without manual intervention.'      },
  { title: 'Inclusivity',   desc: 'Designed for first-time buyers, investors, agents and contractors alike.'        },
  { title: 'Trust',         desc: 'Built on verified identities, secured documents, and reliable payment rails.'    },
]

const team = [
  { name: 'Citi Buildings',    role: 'Parent Company & Developer'          },
  { name: 'Hope Homes Team',   role: 'Platform Operations & Management'    },
  { name: 'Realtor Network',   role: 'Sales & Client Relations (CID-Based)'},
  { name: 'Vendor Partners',   role: 'Construction, Infrastructure & Works' },
]

// ── Feature Card ──────────────────────────────────────────────────────────────

const FeatureCard = ({ icon: Icon, title, desc, color, bg, border, index }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0) scale(1)'
          }, index * 100)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [index])

  return (
    <div
      ref={ref}
      style={{ opacity: 0, transform: 'translateY(40px) scale(0.97)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}
      className={`rounded-2xl border ${border} ${bg} p-6 flex flex-col gap-3
        hover:-translate-y-2 hover:shadow-xl hover:shadow-black/30 transition-all duration-300`}
    >
      <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gray-950 ${color}`}>
        <Icon size={20} />
      </div>
      <h3 className="text-black font-bold text-lg leading-snug">{title}</h3>
      <p className="text-black text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const About = () => {
  const heroRef = useFadeIn(0)
  const missionRef = useFadeIn(100)
  const valuesRef = useFadeIn(100)
  const teamRef = useFadeIn(100)

  return (
    <div className="text-white min-h-screen">

      {/* Hero */}
      <section
        ref={heroRef}
        style={{ opacity: 0, transform: 'translateY(30px) scale(1)', 
          transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        className="relative text-center py-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950
         via-indigo-950/40 to-gray-950 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px]
         bg-indigo-600/10 blur-3xl rounded-full -z-10" />

        <div className="inline-flex items-center gap-2 bg-white border
         border-indigo-500/20 text-black text-xs font-semibold px-4 py-2 
         rounded-full mb-5 uppercase tracking-widest">
          <Building2 size={14} /> About Us
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          <span className="text-green-900">Hope Homes</span>{' '}
          <span className="text-black">by</span>{' '}
          <span className="text-indigo-600">Citi Buildings</span>
        </h1>

        <p className="text-black text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          A next-generation real estate platform built to make property ownership
          simple, transparent, and accessible — for subscribers, realtors, and vendors alike.
        </p>

        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl
            transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:scale-105"
        >
          View Our Properties <ArrowRight size={18} />
        </Link>
      </section>

      {/* Mission */}
      <section
        ref={missionRef}
        style={{ opacity: 0, transform: 'translateY(30px) scale(1)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        className="py-16 px-4 bg-gray-900/50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-black text-xs font-bold 
              uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                Sack Your Landlord —{' '}
                <span className="text-indigo-600">You Self Fit Buy House!</span>
              </h2>
              <p className="text-black leading-relaxed mb-4">
                Hope Homes was created to break the barrier between renters and homeowners.
                Through our daily contribution model, anyone can own a home without the
                burden of a lump-sum payment.
              </p>
              <p className="text-black leading-relaxed">
                We automate every financial transaction — from subscriber payments to realtor
                commissions and vendor fees — so every stakeholder gets paid fairly, on time,
                every time.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { icon: ShieldCheck, label: 'Verified Realtor Network',  
                   sub: 'Every agent identified by unique CID'        },
                { icon: CreditCard,  label: 'Auto Commission Disbursement', 
                  sub: 'Paid instantly at point of subscriber payment' },
                { icon: Receipt,     label: 'Live Document Management',    
                  sub: 'Receipts & invoices always up to date'        },
                { icon: TrendingUp,  label: 'Real-Time Site Progress',    
                   sub: 'Track your property construction live'        },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-4
                 bg-gray-800/50 border border-gray-700/50 rounded-xl p-4
                  hover:border-indigo-500/30 hover:bg-gray-800 transition-all duration-200">
                  <div className="w-10 h-10 flex items-center justify-center 
                  rounded-xl bg-indigo-500/10 text-indigo-600 shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-black font-semibold text-sm">{label}</p>
                    <p className="text-black text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-indigo-600 text-xs font-bold 
            uppercase tracking-widest mb-2">What We Do</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold
             text-black mb-2">Everything the Platform Handles</h2>
            <p className="text-black max-w-xl
             mx-auto">Built for every role in the property ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        ref={valuesRef}
        style={{ opacity: 0, transform: 'translateY(30px) scale(1)', 
          transition: 'opacity 0.7s ease, transform 0.7s ease' }}
        className="py-16 px-4 bg-gray-900/50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-indigo-600 text-xs font-bold 
            uppercase tracking-widest mb-2">Our Values</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold
             text-black">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ title, desc }, i) => (
              <div key={title}
                style={{ animationDelay: `${i * 100}ms` }}
                className="bg-gray-800/50 border border-gray-700/50 
                rounded-2xl p-6 text-center
                  hover:border-yellow-500/30 hover:bg-gray-800 
                  hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full
                 bg-yellow-500/10 border border-yellow-500/20 
                 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={18} className="text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{title}</h3>
                <p className="text-black text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Structure */}
      <section
        ref={teamRef}
        style={{ opacity: 0, transform: 'translateY(30px) scale(1)', transition: 
          'opacity 0.7s ease, transform 0.7s ease' }}
        className="py-16 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-black text-xs font-bold 
            uppercase tracking-widest mb-2">Our Structure</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold
             text-indigo-600">Who Powers Hope Homes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {team.map(({ name, role }, i) => (
              <div key={name}
                className="flex items-center gap-4 bg-gray-900/80 border
                 border-gray-800 rounded-2xl p-5
                  hover:border-indigo-500/30
                   hover:bg-gray-800/60 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border
                 border-indigo-500/20 flex items-center justify-center
                  text-indigo-600 font-extrabold text-lg shrink-0">
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-bold">{name}</p>
                  <p className="text-black text-sm">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br
         from-indigo-900/40 to-gray-900 border
          border-indigo-500/20 rounded-3xl p-10
          hover:border-indigo-500/40 hover:shadow-xl 
          hover:shadow-indigo-500/10 transition-all duration-500">
          <CheckCircle size={40} className="text-green-900 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Own Your Home?</h2>
          <p className="text-black mb-6">
            Join hundreds of subscribers, realtors and vendors already using Hope Homes
            to make real estate simple and automated.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 bg-indigo-600
               hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl
                transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:scale-105"
            >
              View Properties <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2
               bg-gray-800 hover:bg-gray-700 text-white 
               font-semibold px-6 py-3 rounded-xl
                transition-all duration-200 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About