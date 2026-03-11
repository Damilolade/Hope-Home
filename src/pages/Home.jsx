import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'
import ad from '../assets/ad.mp4'
import {
  Building2, Users, Wrench, FileText, TrendingUp,
  ShieldCheck, CreditCard, ArrowRight, CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: Building2,
    title: 'Landlords & Subscribers',
    desc: 'List properties, manage tenants, track payments and monitor site progress all in one place.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
  },
  {
    icon: Users,
    title: 'Realtor Agencies',
    desc: 'Each realtor gets a unique CID. Commissions are calculated and paid automatically at the point of subscriber payment.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10 border-yellow-500/20',
  },
  {
    icon: Wrench,
    title: 'Contractors & Vendors',
    desc: 'Vendors are automatically paid their percentage at the point of transaction — no delays, no disputes.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: CreditCard,
    title: 'Automatic Split Payments',
    desc: 'Payments are instantly split among realtors, vendors, and landlords based on preset percentages.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10 border-pink-500/20',
  },
  {
    icon: FileText,
    title: 'Document Access',
    desc: 'Subscribers can view, access and print their Survey, Deed, Contract of Sales, Receipts and Invoices anytime.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10 border-sky-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Site Progress Tracking',
    desc: 'Subscribers follow real-time construction or renovation progress directly from their dashboard.',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
  },
]

const steps = [
  { label: 'Register & Get Your CID',       desc: 'Landlords, Realtors and Vendors each receive a unique identifier.' },
  { label: 'List or Subscribe to Property', desc: 'Landlords list. Subscribers choose and pay securely.' },
  { label: 'Auto-Split Payments',           desc: 'Commissions and vendor fees are distributed instantly.' },
  { label: 'Track, Sign & Download Docs',   desc: 'All legal documents are auto-updated and available anytime.' },
]

// Reusable hook for scroll-triggered animation
const useScrollReveal = (options = {}) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-in')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

// Animated feature card
const FeatureCard = ({ icon: Icon, title, desc, color, bg, index }) => {
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
      style={{
        opacity: 0,
        transform: 'translateY(40px) scale(0.95)',
        transition: `opacity 0.6s ease, transform 0.6s ease`,
      }}
      className={`rounded-2xl border p-6 flex flex-col gap-3 ${bg} cursor-pointer
        hover:-translate-y-2 hover:shadow-xl hover:shadow-black/30 hover:scale-[1.02]
        transition-all duration-300`}
    >
      <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-black ${color}
        group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={20} />
      </div>
      <h3 className="text-green-600 font-semibold text-lg">{title}</h3>
      <p className="text-black text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

// Animated step card
const StepCard = ({ label, desc, index }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateX(0)'
          }, index * 150)
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
      style={{
        opacity: 0,
        transform: 'translateX(-40px)',
        transition: `opacity 0.5s ease, transform 0.5s ease`,
      }}
      className="flex items-start gap-4 bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5
        hover:border-indigo-500/40 hover:bg-gray-800/80 hover:shadow-lg hover:shadow-indigo-500/10
        transition-all duration-300"
    >
      <div className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full
        bg-indigo-600 text-white font-bold text-sm hover:scale-110 transition-transform duration-200">
        {index + 1}
      </div>
      <div>
        <h4 className="text-white font-semibold mb-1">{label}</h4>
        <p className="text-black text-sm">{desc}</p>
      </div>
    </div>
  )
}

// Animated trust card
const TrustCard = ({ icon: Icon, label, sub, index }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, index * 150)
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
      style={{
        opacity: 0,
        transform: 'translateY(30px)',
        transition: `opacity 0.5s ease, transform 0.5s ease`,
      }}
      className="flex flex-col items-center gap-2
        hover:scale-105 transition-transform duration-300"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-2xl
        bg-indigo-500/10 border border-indigo-500/20 text-black
        hover:bg-indigo-500/30 hover:border-indigo-400 transition-all duration-300">
        <Icon size={22} />
      </div>
      <p className="text-black font-semibold">{label}</p>
      <p className="text-black text-sm">{sub}</p>
    </div>
  )
}

const Home = () => {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    const els = [heroRef.current, videoRef.current, ctaRef.current]
    els.forEach((el, i) => {
      if (!el) return
      setTimeout(() => {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, i * 200)
    })
  }, [])

  return (
    <div className="text-white">

      {/* Hero */}
      <section
        ref={heroRef}
        style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        className="relative text-center py-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-950 to-gray-900 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-3xl rounded-full -z-10" />

        <img src={logo} alt="Hope Home Logo" className="w-20 h-20 object-contain mx-auto mb-6 drop-shadow-xl
          hover:scale-110 transition-transform duration-300" />

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Welcome to{' '}
          <span className="text-indigo-400">Hope</span>
          <span className="text-gray-500">_</span>
          <span className="text-white">Home</span>
        </h1>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          A smart real estate platform connecting <span className="text-white font-medium">Landlords</span>,{' '}
          <span className="text-yellow-400 font-medium">Realtors</span>, and{' '}
          <span className="text-emerald-400 font-medium">Vendors</span> — with automated payments, live tracking, and instant document access.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl
              transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:scale-105 hover:shadow-indigo-500/50"
          >
            Explore Services <ArrowRight size={18} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700
              text-gray-200 font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>

      {/* Video Section */}
      <section
        ref={videoRef}
        style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}
        className="py-16 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">See Hope_Home in Action</h2>
          <p className="text-black text-center mb-8">Watch how we simplify real estate for everyone.</p>
          <div className="rounded-2xl overflow-hidden border border-black shadow-2xl shadow-indigo-500/10
            hover:shadow-indigo-500/30 hover:scale-[1.01] transition-all duration-500">
            <video
              src={ad}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Everything You Need</h2>
          <p className="text-black text-center mb-10">Built for every role in the property chain.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-black">How It Works</h2>
          <p className="text-black text-center mb-10">Simple steps from registration to completion.</p>
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <StepCard key={i} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: ShieldCheck, label: 'Verified Realtors',      sub: 'Every agent has a unique CID'       },
            { icon: CreditCard,  label: 'Auto Commissions',       sub: 'Paid instantly at point of payment' },
            { icon: FileText,    label: 'All Docs, Always Ready', sub: 'Print receipts, deeds & contracts'  },
          ].map(({ icon, label, sub }, i) => (
            <TrustCard key={label} icon={icon} label={label} sub={sub} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div
          ref={ctaRef}
          style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s' }}
          className="max-w-3xl mx-auto text-center
            bg-gradient-to-br from-indigo-900/40 to-gray-900 border border-indigo-500/20 rounded-3xl p-10
            hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500"
        >
          <CheckCircle size={40} className="text-black mx-auto mb-4 hover:scale-110 transition-transform duration-300" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Get Started?</h2>
          <p className="text-black mb-6">Join landlords, realtors and vendors already using Hope_Home to simplify real estate transactions.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl
              transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:scale-105 hover:shadow-indigo-500/50"
          >
            Get In Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Home