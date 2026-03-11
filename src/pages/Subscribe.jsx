import React, { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  User, Phone, Mail, Building2, MapPin, CreditCard, Upload,
  CheckCircle, ArrowRight, ArrowLeft, Star, Crown, BadgeCheck,
  Landmark, Smartphone, Wallet, ClipboardCheck, X, Eye, EyeOff
} from 'lucide-react'

// ── Constants ─────────────────────────────────────────────────────────────────

const estates = [
  { id: 'BDR', name: 'BDR Estate',         location: 'BDR, Lagos'        },
  { id: 'BKH', name: 'Buckingham Heights', location: 'Buckingham, Lagos' },
  { id: 'BHH', name: 'BHH Residence',      location: 'BHH, Lagos'        },
]

const tiers = [
  {
    id: 'gold', label: 'Gold', badge: '1 Bedroom', icon: Star,
    accent: 'from-yellow-500 to-amber-400', textAccent: 'text-yellow-400',
    border: 'border-yellow-500/40', bg: 'bg-yellow-500/10',
    deposit: 30000, roomRate: 2400, roomYears: 6, roomTotal: 5256000,
    infraRate: 2400, infraYears: 4, infraTotal: 3504000,
  },
  {
    id: 'platinum', label: 'Platinum', badge: '2 Bedroom', icon: BadgeCheck,
    accent: 'from-slate-300 to-gray-400', textAccent: 'text-slate-300',
    border: 'border-slate-400/40', bg: 'bg-slate-400/10',
    deposit: 40000, roomRate: 4400, roomYears: 6, roomTotal: 9636000,
    infraRate: 4400, infraYears: 4, infraTotal: 6424000,
  },
  {
    id: 'royal', label: 'Royal', badge: '3 Bedroom', icon: Crown,
    accent: 'from-indigo-400 to-purple-500', textAccent: 'text-indigo-400',
    border: 'border-indigo-400/40', bg: 'bg-indigo-500/10',
    deposit: 50000, roomRate: 6400, roomYears: 6, roomTotal: 14016000,
    infraRate: 6400, infraYears: 4, infraTotal: 9344000,
  },
]

const paymentMethods = [
  { id: 'bank',       label: 'Bank Transfer',      icon: Landmark,    desc: 'Direct bank transfer to our account'       },
  { id: 'card',       label: 'Card Payment',        icon: CreditCard,  desc: 'Debit or credit card payment'              },
  { id: 'paystack',   label: 'Paystack/Flutterwave',icon: Smartphone,  desc: 'Pay via Paystack or Flutterwave gateway'   },
  { id: 'manual',     label: 'Manual Payment',      icon: Wallet,      desc: 'Admin confirms after offline payment'      },
]

const fmt = (n) => '₦' + Number(n).toLocaleString('en-NG')

const STEPS = ['Personal Info', 'Apartment', 'Payment Plan', 'Payment Method', 'Review & Pay']

// ── Step indicator ────────────────────────────────────────────────────────────

const StepBar = ({ current }) => (
  <div className="flex items-center justify-center gap-0 mb-10 flex-wrap gap-y-4">
    {STEPS.map((label, i) => {
      const done = i < current
      const active = i === current
      return (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1">
            <div className={`w-9 h-9 rounded-full flex items-center 
            justify-center text-sm font-bold border-2 transition-all duration-300
              ${done ? 'bg-indigo-600 border-indigo-600 text-white' : active ? 
              'bg-gray-900 border-indigo-400 text-black' : 
              'bg-gray-900 border-gray-700 text-gray-600'}`}>
              {done ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${active ? 
                'text-white' : done ? 'text-indigo-400' : 'text-gray-600'}`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 w-8 sm:w-12 mx-1 transition-all 
                duration-300 ${i < current ? 'bg-indigo-600' : 'bg-gray-700'}`} />
          )}
        </React.Fragment>
      )
    })}
  </div>
)

// ── Input component ───────────────────────────────────────────────────────────

const Field = ({ label, icon: Icon, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-white text-sm font-medium flex items-center gap-2">
      {Icon && <Icon size={14} className="text-indigo-400" />} {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-xs">{error}</p>}
  </div>
)

const Input = ({ className = '', ...props }) => (
  <input
    {...props}
    className={`w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm
      placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30
      transition-all duration-200 ${className}`}
  />
)

// ── Steps ─────────────────────────────────────────────────────────────────────

const Step1 = ({ data, onChange, errors }) => (
  <div className="flex flex-col gap-5">
    <h2 className="text-xl font-bold text-white mb-1">Personal Information</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <Field label="Full Name" icon={User} error={errors.fullName}>
        <Input placeholder="e.g. John Adeyemi" value={data.fullName} onChange={e => onChange('fullName', e.target.value)} />
      </Field>
      <Field label="Phone Number" icon={Phone} error={errors.phone}>
        <Input placeholder="+234 800 000 0000" value={data.phone} onChange={e => onChange('phone', e.target.value)} />
      </Field>
    </div>
    <Field label="Email Address" icon={Mail} error={errors.email}>
      <Input type="email" placeholder="john@email.com" value={data.email} onChange={e => onChange('email', e.target.value)} />
    </Field>
    <Field label="Home Address" icon={MapPin} error={errors.address}>
      <Input placeholder="Your current residential address" value={data.address} onChange={e => onChange('address', e.target.value)} />
    </Field>
    <Field label="Realtor / Agent CID (optional)" icon={BadgeCheck}>
      <Input placeholder="Enter your agent's CID e.g. HH-2024-0012" 
      value={data.agentCID} onChange={e => onChange('agentCID', e.target.value)} />
      <p className="text-gray-500 text-xs mt-1">If you were referred by a realtor, enter 
        their unique CID here. Commission will be auto-allocated.</p>
    </Field>
    <Field label="Upload ID Document" icon={Upload} error={errors.idDoc}>
      <label className="flex flex-col items-center justify-center w-full h-28 
      border-2 border-dashed border-gray-700 rounded-xl
        cursor-pointer bg-gray-800/50 hover:border-indigo-500
         hover:bg-gray-800 transition-all duration-200 group">
        <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf"
          onChange={e => onChange('idDoc', e.target.files[0])} />
        {data.idDoc ? (
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
            <CheckCircle size={18} /> {data.idDoc.name}
          </div>
        ) : (
          <>
            <Upload size={22} className="text-gray-500
             group-hover:text-indigo-400 transition-colors mb-2" />
            <p className="text-gray-500 text-xs text-center">Click to 
                upload NIN, Passport or Driver's License<br /><span className="text-gray-600">JPG, 
                    PNG or  PDF — max 5MB</span></p>
          </>
        )}
      </label>
    </Field>
  </div>
)

const Step2 = ({ data, onChange, errors }) => (
  <div className="flex flex-col gap-6">
    <h2 className="text-xl font-bold text-white mb-1">Choose Apartment & Estate</h2>

    <Field label="Select Estate" icon={Building2} error={errors.estate}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {estates.map(e => (
          <button key={e.id} onClick={() => onChange('estate', e.id)}
            className={`flex flex-col items-start p-4 rounded-xl border 
                text-left transition-all duration-200
              ${data.estate === e.id ? 'border-indigo-500 bg-indigo-500/10 text-white' :
               'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-500'}`}>
            <MapPin size={16} className={data.estate === e.id ? 'text-indigo-400 mb-1' : 'text-gray-600 mb-1'} />
            <span className="font-semibold text-sm">{e.name}</span>
            <span className="text-xs text-gray-500">{e.location}</span>
          </button>
        ))}
      </div>
    </Field>

    <Field label="Select Apartment Tier" icon={Star} error={errors.tier}>
      <div className="flex flex-col gap-3">
        {tiers.map(t => {
          const Icon = t.icon
          const selected = data.tier === t.id
          return (
            <button key={t.id} onClick={() => onChange('tier', t.id)}
              className={`flex items-center gap-4 p-4 rounded-xl border 
                text-left transition-all duration-200
              ${selected ? `${t.border} ${t.bg}` : 
              'border-gray-700 bg-gray-800/50 hover:border-gray-500'}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                 bg-gray-900 ${selected ? t.textAccent : 'text-gray-600'}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${selected ? 
                    t.textAccent : 'text-white'}`}>{t.label}</span>
                  <span className="text-gray-500 text-xs">— {t.badge}</span>
                </div>
                <span className="text-gray-500 text-xs">Initial deposit: 
                    <span className="text-white font-semibold">{fmt(t.deposit)}</span></span>
              </div>
              {selected && <CheckCircle size={18} className="text-indigo-400 shrink-0" />}
            </button>
          )
        })}
      </div>
    </Field>
  </div>
)

const Step3 = ({ data, onChange, errors }) => {
  const tier = tiers.find(t => t.id === data.tier)
  if (!tier) return <p className="text-gray-500 text-sm">Please select an apartment tier first.</p>

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-white mb-1">Select Payment Plan</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: 'room', label: 'Room Payment', rate: tier.roomRate, years: tier.roomYears, total: tier.roomTotal, desc: 'Pay for your apartment room over 6 years' },
          { id: 'infra', label: 'Infrastructure', rate: tier.infraRate, years: tier.infraYears, total: tier.infraTotal, desc: 'Pay for estate infrastructure over 4 years' },
        ].map(plan => {
          const selected = data.paymentPlan === plan.id
          return (
            <button key={plan.id} onClick={() => onChange('paymentPlan', plan.id)}
              className={`flex flex-col gap-3 p-5 rounded-xl border text-left transition-all duration-200
                ${selected ? `border-indigo-500 bg-indigo-500/10` : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'}`}>
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">{plan.label}</span>
                {selected && <CheckCircle size={16} className="text-indigo-400" />}
              </div>
              <p className="text-gray-500 text-xs">{plan.desc}</p>
              <div className="border-t border-gray-700 pt-3 flex flex-col gap-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Daily Rate</span>
                  <span className="text-white font-semibold">{fmt(plan.rate)}/day</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white font-semibold">{plan.years} Years</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-indigo-400 pt-1 border-t border-gray-700 mt-1">
                  <span>Total</span>
                  <span>{fmt(plan.total)}</span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {errors.paymentPlan && <p className="text-red-400 text-xs">{errors.paymentPlan}</p>}

      <div className={`rounded-xl border p-4 ${tier.border} ${tier.bg}`}>
        <p className="text-white text-sm font-semibold mb-1">Initial Deposit Required</p>
        <p className="text-2xl font-extrabold text-white">{fmt(tier.deposit)}</p>
        <p className="text-gray-400 text-xs mt-1">Payable now to secure your unit. Balance continues on daily payment plan.</p>
      </div>
    </div>
  )
}

const Step4 = ({ data, onChange, errors }) => (
  <div className="flex flex-col gap-6">
    <h2 className="text-xl font-bold text-white mb-1">Payment Method</h2>

    <div className="flex flex-col gap-3">
      {paymentMethods.map(m => {
        const Icon = m.icon
        const selected = data.paymentMethod === m.id
        return (
          <button key={m.id} onClick={() => onChange('paymentMethod', m.id)}
            className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200
              ${selected ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-700 bg-gray-800/50 hover:border-gray-500'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-900 ${selected ? 'text-indigo-400' : 'text-gray-500'}`}>
              <Icon size={18} />
            </div>
            <div className="flex-1">
              <p className={`font-semibold text-sm ${selected ? 'text-white' : 'text-gray-300'}`}>{m.label}</p>
              <p className="text-gray-500 text-xs">{m.desc}</p>
            </div>
            {selected && <CheckCircle size={18} className="text-indigo-400 shrink-0" />}
          </button>
        )
      })}
    </div>

    {errors.paymentMethod && <p className="text-red-400 text-xs">{errors.paymentMethod}</p>}

    {data.paymentMethod === 'bank' && (
      <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-5 flex flex-col gap-2">
        <p className="text-white font-semibold text-sm mb-1">Bank Transfer Details</p>
        <div className="flex justify-between text-sm"><span className="text-gray-400">Bank</span><span className="text-white font-medium">First Bank of Nigeria</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-400">Account Name</span><span className="text-white font-medium">Hope Home Properties Ltd</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-400">Account Number</span><span className="text-white font-mono font-bold">0123456789</span></div>
        <p className="text-yellow-400 text-xs mt-2">⚠ Use your Full Name as transfer narration. Upload receipt in next step.</p>
      </div>
    )}

    {data.paymentMethod === 'paystack' && (
      <div className="rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
        <p className="text-indigo-400 text-sm font-semibold">Paystack / Flutterwave</p>
        <p className="text-gray-400 text-xs mt-1">You will be redirected to a secure payment gateway after review. Ensure your details are correct.</p>
      </div>
    )}

    {data.paymentMethod === 'manual' && (
      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
        <p className="text-yellow-400 text-sm font-semibold">Manual Payment</p>
        <p className="text-gray-400 text-xs mt-1">Make payment at our office and an admin will verify and confirm your subscription within 24 hours.</p>
      </div>
    )}
  </div>
)

const Step5 = ({ data }) => {
  const tier = tiers.find(t => t.id === data.tier)
  const estate = estates.find(e => e.id === data.estate)
  const plan = data.paymentPlan
  const method = paymentMethods.find(m => m.id === data.paymentMethod)

  const totalAmount = tier ? (plan === 'room' ? tier.roomTotal : tier.infraTotal) : 0
  const dailyRate = tier ? (plan === 'room' ? tier.roomRate : tier.infraRate) : 0

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl font-bold text-white mb-1">Review Your Subscription</h2>

      <div className="rounded-2xl border border-gray-700 overflow-hidden">
        <div className="bg-gray-800/80 px-5 py-3 text-white text-xs font-semibold uppercase tracking-widest">Subscriber Details</div>
        <div className="divide-y divide-gray-800">
          {[
            { label: 'Full Name',     value: data.fullName  },
            { label: 'Phone',         value: data.phone     },
            { label: 'Email',         value: data.email     },
            { label: 'Address',       value: data.address   },
            { label: 'Agent CID',     value: data.agentCID || 'None' },
            { label: 'ID Document',   value: data.idDoc?.name || 'Not uploaded' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between px-5 py-3 text-sm">
              <span className="text-gray-400">{label}</span>
              <span className="text-white font-medium text-right max-w-[55%] truncate">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-gray-700 overflow-hidden">
        <div className="bg-gray-800/80 px-5 py-3 text-white text-xs font-semibold uppercase tracking-widest">Apartment & Payment</div>
        <div className="divide-y divide-gray-800">
          {[
            { label: 'Estate',         value: estate?.name         },
            { label: 'Apartment Tier', value: `${tier?.label} — ${tier?.badge}` },
            { label: 'Payment Plan',   value: plan === 'room' ? 'Room Payment' : 'Infrastructure' },
            { label: 'Daily Rate',     value: fmt(dailyRate) + '/day' },
            { label: 'Initial Deposit',value: fmt(tier?.deposit)   },
            { label: 'Total Amount',   value: fmt(totalAmount)      },
            { label: 'Payment Method', value: method?.label        },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between px-5 py-3 text-sm">
              <span className="text-gray-400">{label}</span>
              <span className={`font-semibold text-right ${label === 'Total Amount' ? 'text-indigo-400 text-base' : 'text-white'}`}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 text-xs text-yellow-300">
        ⚠ By clicking <strong>Confirm & Pay</strong>, you agree to Hope_Home's subscription terms. Commission will be automatically allocated to your agent (if CID provided).
      </div>
    </div>
  )
}

// ── Success Screen ────────────────────────────────────────────────────────────

const SuccessScreen = ({ data }) => {
  const tier = tiers.find(t => t.id === data.tier)
  return (
    <div className="flex flex-col items-center text-center py-8 gap-5">
      <div className="w-20 h-20 rounded-full bg-indigo-500/10 border-2 border-indigo-500 flex items-center justify-center animate-bounce">
        <CheckCircle size={40} className="text-indigo-400" />
      </div>
      <div>
        <h2 className="text-2xl font-extrabold text-white mb-2">Subscription Submitted!</h2>
        <p className="text-gray-400 text-sm max-w-sm">
          Thank you, <span className="text-white font-semibold">{data.fullName}</span>. Your <span className="text-indigo-400 font-semibold">{tier?.label}</span> apartment subscription has been received.
        </p>
      </div>
      <div className="w-full rounded-2xl border border-gray-700 bg-gray-800/50 p-5 text-left flex flex-col gap-2 text-sm">
        <p className="text-white font-semibold mb-1">What happens next?</p>
        <div className="flex items-start gap-2 text-gray-400"><CheckCircle size={14} className="text-indigo-400 mt-0.5 shrink-0" />Our team will verify your ID and payment within 24 hours.</div>
        <div className="flex items-start gap-2 text-gray-400"><CheckCircle size={14} className="text-indigo-400 mt-0.5 shrink-0" />A confirmation email will be sent to <span className="text-white">{data.email}</span>.</div>
        <div className="flex items-start gap-2 text-gray-400"><CheckCircle size={14} className="text-indigo-400 mt-0.5 shrink-0" />Your subscriber dashboard will be activated with document access.</div>
        {data.agentCID && <div className="flex items-start gap-2 text-gray-400"><CheckCircle size={14} className="text-yellow-400 mt-0.5 shrink-0" />Agent <span className="text-yellow-400 font-mono">{data.agentCID}</span> commission will be auto-allocated on payment confirmation.</div>}
      </div>
      <div className="flex gap-3 mt-2">
        <Link to="/" className="px-6 py-3 bg-gray-800 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors">Back to Home</Link>
        <Link to="/services" className="px-6 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-500 transition-colors flex items-center gap-2">View Plans <ArrowRight size={16} /></Link>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

const Subscribe = () => {
  const location = useLocation()
  const preselected = location.state

  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const topRef = useRef(null)

  const [data, setData] = useState({
    fullName: '', phone: '', email: '', address: '', agentCID: '', idDoc: null,
    estate: preselected?.estate || '',
    tier: preselected?.tier || '',
    paymentPlan: preselected?.plan || '',
    paymentMethod: '',
  })

  const onChange = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }))
    setErrors(prev => ({ ...prev, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (!data.fullName.trim()) e.fullName = 'Full name is required'
      if (!data.phone.trim())    e.phone    = 'Phone number is required'
      if (!data.email.trim())    e.email    = 'Email is required'
      if (!data.address.trim())  e.address  = 'Address is required'
      if (!data.idDoc)           e.idDoc    = 'Please upload an ID document'
    }
    if (step === 1) {
      if (!data.estate) e.estate = 'Please select an estate'
      if (!data.tier)   e.tier   = 'Please select an apartment tier'
    }
    if (step === 2) {
      if (!data.paymentPlan) e.paymentPlan = 'Please select a payment plan'
    }
    if (step === 3) {
      if (!data.paymentMethod) e.paymentMethod = 'Please select a payment method'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => {
    if (!validate()) return
    setStep(s => s + 1)
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const back = () => {
    setStep(s => s - 1)
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const submit = () => {
    // Here you would call your API / Paystack / etc.
    setSubmitted(true)
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={topRef} className="min-h-screen text-white py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 
          border border-indigo-500/20 text-black text-xs font-semibold 
          px-4 py-2 rounded-full mb-3 uppercase 
          tracking-widest">
            <ClipboardCheck size={14} /> Subscribe to a Property
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            <span className="text-green-600">Hope</span>
            <span className="text-black">_</span>
            <span className="text-black">Home</span>
            <span className="text-indigo-800"> Subscription</span>
          </h1>
        </div>

        {/* Card */}
        <div className="bg-gray-900/80 backdrop-blur border
         border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40">
          {submitted ? (
            <SuccessScreen data={data} />
          ) : (
            <>
              <StepBar current={step} />

              <div className="min-h-[400px]">
                {step === 0 && <Step1 data={data} onChange={onChange} errors={errors} />}
                {step === 1 && <Step2 data={data} onChange={onChange} errors={errors} />}
                {step === 2 && <Step3 data={data} onChange={onChange} errors={errors} />}
                {step === 3 && <Step4 data={data} onChange={onChange} errors={errors} />}
                {step === 4 && <Step5 data={data} />}
              </div>

              {/* Nav buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-800">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl
                   bg-gray-800 text-white text-sm font-semibold
                    hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed 
                    transition-all duration-200"
                >
                  <ArrowLeft size={16} /> Back
                </button>

                {step < 4 ? (
                  <button onClick={next}
                    className="flex items-center gap-2 px-6 py-3 
                    rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm 
                    font-semibold
                      transition-all duration-200 shadow-lg 
                      shadow-indigo-500/30 hover:scale-105">
                    Next <ArrowRight size={16} />
                  </button>
                ) : (
                  <button onClick={submit}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r
                     from-indigo-600 to-purple-600
                      hover:from-indigo-500 hover:to-purple-500 text-white 
                      text-sm font-bold
                      transition-all duration-200 shadow-lg shadow-indigo-500/30 
                      hover:scale-105">
                    <CheckCircle size={16} /> Confirm & Pay
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Subscribe