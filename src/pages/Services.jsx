import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Home, Star, Crown, Shield, Zap, Droplets, Trees, Camera,
  CheckCircle, ArrowRight, Building2, MapPin, BadgeCheck,
} from 'lucide-react'

const listings = [
  { id: 'BDR', name: 'BDR Estate',         location: 'BDR, Lagos'        },
  { id: 'BKH', name: 'Buckingham Heights', location: 'Buckingham, Lagos' },
  { id: 'BHH', name: 'BHH Residence',      location: 'BHH, Lagos'        },
]

const infrastructure = [
  { icon: Trees,    label: 'Green Park & Recreation Playground' },
  { icon: Zap,      label: '24/7 Electricity Supply'            },
  { icon: Home,     label: 'Well-Paved Internal Roads'          },
  { icon: Droplets, label: 'Constant Water Supply'              },
  { icon: Shield,   label: 'Manned Security'                    },
  { icon: Camera,   label: 'CCTV Surveillance'                  },
]

const plans = [
  {
    id: 'gold',
    tier: 'Gold',
    badge: '1 Bedroom',
    deposit: 30000,
    icon: Star,
    accent: 'from-yellow-500 to-amber-400',
    border: 'border-yellow-500/30',
    glow: 'shadow-yellow-500/20',
    textAccent: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    features: ['1 Ensuite Bedroom', 'Spacious Parlour', 'Guest Toilet', 'Modern Kitchen'],
    roomRate: 2400, roomYears: 6, roomTotal: 5256000,
    infraRate: 2400, infraYears: 4, infraTotal: 3504000,
  },
  {
    id: 'platinum',
    tier: 'Platinum',
    badge: '2 Bedroom',
    deposit: 40000,
    icon: BadgeCheck,
    accent: 'from-slate-300 to-gray-400',
    border: 'border-slate-400/30',
    glow: 'shadow-slate-400/20',
    textAccent: 'text-slate-300',
    bg: 'bg-slate-400/10',
    features: ['2 Ensuite Bedrooms', 'Spacious Parlour', 'Guest Toilet', 'Modern Kitchen'],
    roomRate: 4400, roomYears: 6, roomTotal: 9636000,
    infraRate: 4400, infraYears: 4, infraTotal: 6424000,
    popular: true,
  },
  {
    id: 'royal',
    tier: 'Royal',
    badge: '3 Bedroom',
    deposit: 50000,
    icon: Crown,
    accent: 'from-indigo-400 to-purple-500',
    border: 'border-indigo-400/30',
    glow: 'shadow-indigo-400/20',
    textAccent: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
    features: ['3 Ensuite Bedrooms', 'Spacious Parlour', 'Guest Toilet', 'Modern Kitchen'],
    roomRate: 6400, roomYears: 6, roomTotal: 14016000,
    infraRate: 6400, infraYears: 4, infraTotal: 9344000,
  },
]

const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG')

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

// ── InfraCard ─────────────────────────────────────────────────────────────────

const InfraCard = ({ icon: Icon, label, index }) => {
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
      style={{ opacity: 0, transform: 'translateY(20px)', transition: 
        'opacity 0.5s ease, transform 0.5s ease' }}
      className="flex items-center gap-3 bg-gray-800/50 border
       border-gray-700/50 rounded-xl p-4
        hover:border-indigo-500/30 hover:bg-gray-800
         hover:-translate-y-1 transition-all duration-300"
    >
      <div className="w-9 h-9 flex items-center justify-center 
      rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
        <Icon size={18} />
      </div>
      <span className="text-white text-sm font-medium">{label}</span>
    </div>
  )
}

// ── PlanCard ──────────────────────────────────────────────────────────────────

const PlanCard = ({ plan, index, selectedListing }) => {
  const ref = useFadeIn(index * 150)
  const [tab, setTab] = useState('room')
  const navigate = useNavigate()
  const Icon = plan.icon

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: 'translateY(50px) scale(0.96)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}
      className={`relative rounded-3xl border ${plan.border} bg-gray-900/80 backdrop-blur
        shadow-2xl ${plan.glow} flex flex-col overflow-hidden
        hover:-translate-y-2 hover:shadow-2xl transition-all duration-300`}
    >
      {plan.popular && (
        <div className="absolute top-4 right-4 bg-indigo-600
         text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          Most Popular
        </div>
      )}

      <div className={`h-2 w-full bg-gradient-to-r ${plan.accent}`} />

      <div className={`p-6 ${plan.bg}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center 
            justify-center bg-gray-900 ${plan.textAccent}`}>
            <Icon size={20} />
          </div>
          <div>
            <p className="text-black text-xs font-medium uppercase 
            tracking-widest">{plan.badge}</p>
            <h3 className={`text-xl font-extrabold ${plan.textAccent}`}>{plan.tier}</h3>
          </div>
        </div>
        <div className="flex items-baseline gap-1 mb-1">
          <span className="text-white text-2xl font-bold">{fmt(plan.deposit)}</span>
          <span className="text-black text-sm">initial deposit</span>
        </div>
        {selectedListing && (
          <div className="flex items-center gap-1 mt-2">
            <MapPin size={12} className="text-black" />
            <span className="text-black text-xs">{listings.find(l => l.id === selectedListing)?.location}</span>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-gray-800">
        <p className="text-black text-xs uppercase tracking-widest mb-3">What's Included</p>
        <ul className="flex flex-col gap-2">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-white">
              <CheckCircle size={14} className={plan.textAccent} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 py-4 border-t border-gray-800 flex-1">
        <p className="text-black text-xs uppercase tracking-widest mb-3">Payment Plan</p>
        <div className="flex rounded-lg overflow-hidden border
         border-gray-700 mb-4 text-sm font-medium">
          <button
            onClick={() => setTab('room')}
            className={`flex-1 py-2 transition-colors duration-200
              ${tab === 'room' ? `bg-gradient-to-r ${plan.accent}
               text-gray-900` : 'bg-gray-800 text-white hover:text-white'}`}
          >
            Room
          </button>
          <button
            onClick={() => setTab('infra')}
            className={`flex-1 py-2 transition-colors duration-200
              ${tab === 'infra' ? `bg-gradient-to-r ${plan.accent}
               text-gray-900` : 'bg-gray-800 text-white hover:text-white'}`}
          >
            Infrastructure
          </button>
        </div>

        {tab === 'room' ? (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-black">Daily Rate</span>
              <span className="text-white font-semibold">{fmt(plan.roomRate)}/day</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-black">Duration</span>
              <span className="text-white font-semibold">{plan.roomYears} Years</span>
            </div>
            <div className={`flex justify-between text-sm font-bold 
              mt-1 pt-2 border-t border-gray-700 ${plan.textAccent}`}>
              <span>Total</span>
              <span>{fmt(plan.roomTotal)}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="text-black">Daily Rate</span>
              <span className="text-white font-semibold">{fmt(plan.infraRate)}/day</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-black">Duration</span>
              <span className="text-white font-semibold">{plan.infraYears} Years</span>
            </div>
            <div className={`flex justify-between text-sm 
              font-bold mt-1 pt-2 border-t border-gray-700 ${plan.textAccent}`}>
              <span>Total</span>
              <span>{fmt(plan.infraTotal)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 pt-0">
        <button
          onClick={() => navigate('/subscribe', { state: 
            { tier: plan.id, estate: selectedListing } })}
          className={`w-full flex items-center justify-center 
            gap-2 py-3 rounded-xl font-semibold text-sm
            bg-gradient-to-r ${plan.accent} text-gray-900 
            hover:opacity-90 hover:scale-[1.02]
            transition-all duration-200 shadow-lg`}
        >
          Start Now <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const Services = () => {
  const [selectedListing, setSelectedListing] = useState(null)
  const heroRef = useFadeIn(0)
  const infraRef = useFadeIn(100)

  return (
    <div className="text-white min-h-screen">

      {/* Hero */}
      <section
        ref={heroRef}
        style={{ opacity: 0, transform: 'translateY(30px) scale(1)', transition:
           'opacity 0.7s ease, transform 0.7s ease' }}
        className="relative text-center py-16 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950
         via-indigo-950/30 to-gray-950 -z-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 
        w-[700px] h-[250px]
         bg-indigo-600/10 blur-3xl rounded-full -z-10" />

        <h1 className="inline-flex items-center gap-2
         bg-indigo-500/10 border border-indigo-500/20
          text-black text-xs font-semibold px-4 py-2 
          rounded-full mb-4 uppercase tracking-widest">
          <Building2 size={14} /> Property Listings
        </h1>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Find <span cl>Your</span> <span className="text-black">Dream</span> Home
        </h1>
        <p className="text-black max-w-xl mx-auto text-lg mb-8">
          Choose from our premium apartment tiers across{' '}
          <span className="text-green-600 font-medium">BDR</span>,{' '}
          <span className="text-white font-medium">Buckingham</span>, and{' '}
          <span className="text-green-600 font-medium">BHH</span> estates.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedListing(null)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold border 
              transition-all duration-200
              ${!selectedListing ? 'bg-indigo-600 border-indigo-500 text-white' :
                 'bg-gray-800 border-gray-700 text-white hover:border-gray-500'}`}
          >
            All Estates
          </button>
          {listings.map((l) => (
            <button
              key={l.id}
              onClick={() => setSelectedListing(l.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200
                ${selectedListing === l.id ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-gray-800 border-gray-700 text-white hover:border-gray-500'}`}
            >
              <MapPin size={13} /> {l.name}
            </button>
          ))}
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} selectedListing={selectedListing} />
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section
        ref={infraRef}
        style={{ opacity: 0, transform: 
          'translateY(30px) scale(1)', 
          transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s' }}
        className="py-16 px-4 bg-gray-900/50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">World-Class Infrastructure</h2>
            <p className="text-black">Every estate comes with 
              premium amenities included in your plan.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {infrastructure.map(({ icon, label }, i) => (
              <InfraCard key={label} icon={icon} label={label} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Summary Table */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">Payment Summary</h2>
          <p className="text-black text-center mb-8">Full breakdown of all apartment tiers 
            and payment plans.</p>
          <div className="rounded-2xl border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800/80 text-white uppercase text-xs tracking-widest">
                    <th className="text-left px-5 py-4">Tier</th>
                    <th className="text-left px-5 py-4">Deposit</th>
                    <th className="text-left px-5 py-4">Room (6yrs)</th>
                    <th className="text-left px-5 py-4">Infra (4yrs)</th>
                    <th className="text-left px-5 py-4">Daily Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((p, i) => {
                    const Icon = p.icon
                    return (
                      <tr key={p.id} className={`border-t border-gray-800 ${i % 2 === 0 ? 
                      'bg-gray-900/40' : 'bg-gray-900/20'} hover:bg-gray-800/60 transition-colors`}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Icon size={16} className={p.textAccent} />
                            <span className={`font-bold ${p.textAccent}`}>{p.tier}</span>
                            <span className="text-black text-xs">({p.badge})</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-white font-semibold">{fmt(p.deposit)}</td>
                        <td className="px-5 py-4 text-white font-semibold">{fmt(p.roomTotal)}</td>
                        <td className="px-5 py-4 text-white font-semibold">{fmt(p.infraTotal)}</td>
                        <td className="px-5 py-4 text-white">{fmt(p.roomRate)}/day</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br
         from-indigo-900/40 to-gray-900 border border-indigo-500/20 rounded-3xl p-10
          hover:border-indigo-500/40 hover:shadow-xl 
          hover:shadow-indigo-500/10 transition-all duration-500">
          <CheckCircle size={40} className="text-indigo-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Subscribe?</h2>
          <p className="text-black mb-6">Contact our team to get started with your preferred apartment tier today.</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-indigo-600
             hover:bg-indigo-500 text-white font-semibold px-8 py-3 rounded-xl
              transition-all duration-200 shadow-lg shadow-indigo-500/30 hover:scale-105"
          >
            Get In Touch <ArrowRight size={18} />
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Services