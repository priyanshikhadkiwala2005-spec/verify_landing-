import { useEffect, useRef, useState } from 'react'
import {
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  ShieldAlert,
  Fingerprint,
  CreditCard,
  Building2,
  FileSignature,
  ShieldCheck,
  History,
  Store,
  Coins,
  Shield,
  Handshake,
  Zap,
  Lock,
  ClipboardCheck,
  LayoutDashboard,
  LifeBuoy,
  Search,
  Check,
  Star,
  ChevronDown,
} from 'lucide-react'
import './App.css'

const NAV = [
  ['Services', '#services'],
  ['How It Works', '#how'],
  ['Features', '#features'],
  ['Security', '#security'],
  ['FAQ', '#faq'],
]

const TRUST = ['Consent-based', 'Real-time results', 'Encrypted data', 'Full audit trail']

const STATS = [
  { to: 10, suffix: 'L+', label: 'Verifications processed' },
  { to: 99.9, suffix: '%', label: 'Platform uptime', decimals: 1 },
  { prefix: '< ', to: 3, suffix: ' sec', label: 'Average response time' },
  { to: 500, suffix: '+', label: 'Retailers onboarded' },
]

const PROBLEMS = [
  ['Slow onboarding', 'Document checks take hours and customers drop off.', <Clock size={26} />],
  ['Fraud risk', 'Fake IDs and mismatched details slip through.', <AlertTriangle size={26} />],
  ['Messy records', 'Paper files and scattered spreadsheets make audits painful.', <FileSpreadsheet size={26} />],
  ['Compliance pressure', 'Missing consent trails can create legal trouble.', <ShieldAlert size={26} />],
]

const SERVICES = [
  ['Aadhaar Verification', "Confirms identity through OTP-based Aadhaar authentication with the customer's consent.", <Fingerprint size={26} />],
  ['PAN Verification', "Validates a PAN number and checks the holder's name instantly.", <CreditCard size={26} />],
  ['Bank Penny Drop', 'Sends a small test credit to verify the account number, IFSC and account holder name.', <Building2 size={26} />],
  ['Consent & eSign', 'Captures explicit customer consent and legally valid digital signatures.', <FileSignature size={26} />],
  ['Complete KYC', 'Runs Aadhaar, PAN, bank and consent in a single guided flow.', <ShieldCheck size={26} />],
  ['Verification History', 'Stores every result with date, status and reference for easy lookup.', <History size={26} />],
]

const STEPS = [
  ['Create your account', 'Register as a retailer and complete your profile.'],
  ['Fund your wallet', 'Add balance once and use it across all services. You are charged only when a verification runs.'],
  ['Verify instantly', 'Enter customer details, collect consent and get a clear result in seconds.'],
]

const AUDIENCE = [
  [<Store size={26} />, 'Retail & distribution partners', 'Verify customers at the point of sale.'],
  [<Coins size={26} />, 'Fintech & lending companies', 'Cut onboarding time and defaults.'],
  [<Shield size={26} />, 'Insurance & investment agents', 'Complete KYC without paperwork.'],
  [<Handshake size={26} />, 'Service providers & agencies', 'Verify vendors, staff and clients with confidence.'],
]

const WHY = [
  [<Zap size={22} />, 'Lightning fast', 'Most verifications finish in under 3 seconds.'],
  [<Lock size={22} />, 'Secure by design', 'Encrypted data, role-based access and consent for every check.'],
  [<CreditCard size={22} />, 'Pay as you use', 'Prepaid wallet with no lock-in.'],
  [<ClipboardCheck size={22} />, 'Audit-ready', 'A complete, searchable trail for every verification.'],
  [<LayoutDashboard size={22} />, 'Clean dashboard', 'Easy to use, with light and dark mode.'],
  [<LifeBuoy size={22} />, 'Reliable support', 'Help is a message away when you need it.'],
]

const SECURITY = [
  'Consent required before every verification',
  'Data encrypted in transit and at rest',
  'Role-based access for retailers and admins',
  'Secure sessions with automatic logout on expiry',
  'Complete activity logs for accountability',
]

const TESTIMONIALS = [
  ['Onboarding used to take us two days. With VerifyHub it takes a couple of minutes.', 'Rahul S.', 'Retail Partner'],
  ['The penny drop and PAN checks are fast and reliable. Our fraud cases have dropped noticeably.', 'Neha K.', 'Fintech Operations'],
  ['The wallet and reports make it easy to track exactly what we spend on verifications.', 'Amit P.', 'Distributor'],
]

const FAQS = [
  ['What is VerifyHub?', 'It is an online platform for Aadhaar, PAN, bank account and eSign verification.'],
  ['Who can use it?', 'Registered retailers and business partners, managed by a super admin.'],
  ['Is customer data safe?', 'Yes. Every check is consent-based, and data is encrypted and access-controlled.'],
  ['How does billing work?', 'You add money to your wallet, and each verification deducts its cost automatically.'],
  ['How fast are results?', 'Most verifications complete in under 3 seconds.'],
  ['Can I see past verifications?', 'Yes. Your history is always available to search and review.'],
  ['What if a verification fails?', '(Add your policy here.)'],
]

/* Fade/slide in on scroll */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function Counter({ to, decimals = 0, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / 1400, 1)
        setVal(to * (1 - Math.pow(1 - p, 3)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [to])
  return (
    <span ref={ref}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  )
}

const Heading = ({ eyebrow, title, sub }) => (
  <Reveal className="head">
    {eyebrow && <span className="eyebrow">{eyebrow}</span>}
    <h2 className="h2">{title}</h2>
    {sub && <p className="sub">{sub}</p>}
  </Reveal>
)

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 10)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label="VerifyHub home">
          <img src="/logo-nav.png" alt="VerifyHub logo" />
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {NAV.map(([n, h]) => (
            <a key={n} href={h} onClick={() => setOpen(false)}>{n}</a>
          ))}
          <div className="nav-cta-mobile">
            <a href="#login" className="btn btn-ghost" onClick={() => setOpen(false)}>Login</a>
            <a href="#start" className="btn btn-primary" onClick={() => setOpen(false)}>Get Started</a>
          </div>
        </nav>
        <div className="nav-cta">
          <a href="#login" className="btn btn-ghost">Login</a>
          <a href="#start" className="btn btn-primary">Get Started</a>
        </div>
        <button className={`burger ${open ? 'active' : ''}`} aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

/* Ultra-Clean & Simple Interactive Verification Hub */
function HeroVisual() {
  const [activeTab, setActiveTab] = useState('aadhaar')

  const docs = {
    aadhaar: {
      label: 'Aadhaar Card',
      num: '5482 •••• 8492',
      badge: 'UIDAI OTP Verified',
      speed: '0.8s',
      holder: 'Rahul Sharma',
      status: 'Active & Linked',
      icon: '🇮🇳',
    },
    pan: {
      label: 'PAN Card',
      num: 'ABCPS8492K',
      badge: 'NSDL Active',
      speed: '0.4s',
      holder: 'Rahul Sharma',
      status: 'Verified Valid',
      icon: '🪪',
    },
    bank: {
      label: 'Bank Account',
      num: 'HDFC •••• 4120',
      badge: 'Penny Drop ₹1.00',
      speed: '1.2s',
      holder: 'Rahul Sharma',
      status: 'Account Verified',
      icon: '🏦',
    },
  }

  const current = docs[activeTab]

  return (
    <div className="hv-sim-wrap">
      {/* Soft light ambient glow */}
      <div className="sim-glow-ambient g-top" />
      <div className="sim-glow-ambient g-bot" />

      {/* Main Clean Card */}
      <div className="sim-card">
        {/* Header Bar */}
        <div className="sim-header">
          <div className="sim-live-badge">
            <span className="sim-dot" />
            <span>Instant API Hub</span>
          </div>
          <span className="sim-lock">🔒 256-bit Encrypted</span>
        </div>

        {/* 3 Clickable Service Tabs */}
        <div className="sim-tabs">
          <button
            type="button"
            className={`sim-tab ${activeTab === 'aadhaar' ? 'active' : ''}`}
            onClick={() => setActiveTab('aadhaar')}
          >
            🇮🇳 Aadhaar
          </button>
          <button
            type="button"
            className={`sim-tab ${activeTab === 'pan' ? 'active' : ''}`}
            onClick={() => setActiveTab('pan')}
          >
            🪪 PAN Card
          </button>
          <button
            type="button"
            className={`sim-tab ${activeTab === 'bank' ? 'active' : ''}`}
            onClick={() => setActiveTab('bank')}
          >
            🏦 Bank Drop
          </button>
        </div>

        {/* Active Verification Card */}
        <div className="sim-display">
          <div className="sim-doc-header">
            <div className="sim-doc-title">
              <span className="sim-doc-ico">{current.icon}</span>
              <div>
                <strong>{current.label}</strong>
                <small>{current.num}</small>
              </div>
            </div>
            <span className="sim-status-tag">✓ {current.status}</span>
          </div>

          {/* Verification Result Pill */}
          <div className="sim-result-box">
            <div className="sim-check-icon">✓</div>
            <div className="sim-result-meta">
              <div className="sim-res-name">
                <h5>{current.holder}</h5>
                <span className="sim-pill-badge">{current.badge}</span>
              </div>
              <p>Instant Gov. Verification in <b>{current.speed}</b></p>
            </div>
          </div>
        </div>

        {/* 3 Multi-Service Quick Badges */}
        <div className="sim-quick-pills">
          <span className="sim-qp">✓ UIDAI Ready</span>
          <span className="sim-qp">✓ NSDL Connected</span>
          <span className="sim-qp">✓ Zero Paperwork</span>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <span className="pill fade-up">Trusted KYC &amp; Identity Verification Platform</span>
          <h1 className="fade-up" style={{ animationDelay: '.1s' }}>
            Verify Customers in <span className="grad">Seconds</span>, Not Days
          </h1>
          <p className="lead fade-up" style={{ animationDelay: '.2s' }}>
            VerifyHub brings Aadhaar, PAN, bank account and eSign verification together in one secure dashboard. Onboard customers faster, reduce fraud and stay compliant without paperwork.
          </p>
          <div className="hero-btns fade-up" style={{ animationDelay: '.3s' }}>
            <a href="#start" className="btn btn-primary btn-lg">Get Started</a>
            <a href="#how" className="btn btn-outline btn-lg">See How It Works</a>
          </div>
          <p className="trust fade-up" style={{ animationDelay: '.4s' }}>
            {TRUST.map((t) => <span key={t}>{t}</span>)}
          </p>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 100} className="stat">
            <strong><Counter {...s} /></strong>
            <span>{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section className="section">
      <div className="container">
        <Heading eyebrow="The problem" title="Manual KYC Is Slowing Your Business Down" />
        <div className="grid4">
          {PROBLEMS.map(([t, d, i], k) => (
            <Reveal key={t} delay={k * 100} className="card problem">
              <div className="ico red">{i}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="bridge">
          <span>✓</span> VerifyHub replaces all of this with one fast, automated and auditable workflow.
        </Reveal>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section alt">
      <div className="container">
        <Heading
          eyebrow="Services"
          title="One Platform. Every Verification You Need."
          sub="Pick a single check or run the complete KYC flow in one go."
        />
        <div className="grid3">
          {SERVICES.map(([t, d, i], k) => (
            <Reveal key={t} delay={(k % 3) * 100} className="card feature">
              <div className="ico">{i}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function How() {
  return (
    <section id="how" className="section">
      <div className="container">
        <Heading eyebrow="How it works" title="From Sign-up to Verified in 3 Steps" />
        <div className="steps">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 150} className="step">
              <div className="num">{i + 1}</div>
              <div className="step-body">
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Mini mock visuals for feature blocks ---- */
function MockRealtime() {
  return (
    <div className="mock mock-rt">
      <div className="gauge">
        <svg viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" className="g-bg" />
          <circle cx="60" cy="60" r="52" className="g-fg" />
        </svg>
        <div><b>2.4s</b><small>response</small></div>
      </div>
      <ul>
        <li><i className="ok">✓</i> Request received</li>
        <li><i className="ok">✓</i> Consent confirmed</li>
        <li><i className="ok">✓</i> Result delivered</li>
      </ul>
    </div>
  )
}
function MockWallet() {
  return (
    <div className="mock mock-wallet">
      <div className="wbal"><small>Wallet balance</small><b>₹ 12,450</b><span>+ Add money</span></div>
      <ul>
        <li><span>PAN Verification</span><em>− debited</em></li>
        <li><span>Wallet top-up</span><em className="credited">+ credited</em></li>
        <li><span>Bank Penny Drop</span><em>− debited</em></li>
      </ul>
    </div>
  )
}
function MockHistory() {
  const rows = [['PAN', 'VH-20481', 'Success'], ['Aadhaar', 'VH-20480', 'Success'], ['Bank', 'VH-20479', 'Success'], ['eSign', 'VH-20478', 'Signed']]
  return (
    <div className="mock mock-hist">
      <div className="search">🔍 Search by name, ID or reference…</div>
      {rows.map(([a, b, c]) => (
        <div className="hrow" key={b}><b>{a}</b><span>{b}</span><em>{c}</em></div>
      ))}
    </div>
  )
}
function MockReports() {
  const bars = [38, 55, 46, 72, 64, 88, 78]
  return (
    <div className="mock mock-rep">
      <div className="rhead"><b>Verifications this week</b><em>97% success</em></div>
      <div className="bars">
        {bars.map((h, i) => <i key={i} style={{ '--h': `${h}%`, transitionDelay: `${i * 80}ms` }} />)}
      </div>
      <div className="days">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i}>{d}</span>)}</div>
    </div>
  )
}

const BLOCKS = [
  ['Real-time Verification', 'Get answers while your customer is still at the counter. No waiting, no follow-ups, no manual checking.', MockRealtime],
  ['Smart Wallet', 'One prepaid wallet for every service. Track balance, top-ups and per-verification charges transparently, with no subscriptions and no hidden fees.', MockWallet],
  ['Complete Verification History', 'Every check is logged with a timestamp, status and reference ID. Search, filter and review any record whenever you need it.', MockHistory],
  ['Insightful Reports', 'See daily and monthly verification volumes, success rates and spending, so you always know how your business is performing.', MockReports],
]

function Features() {
  return (
    <section id="features" className="section alt">
      <div className="container">
        <Heading eyebrow="Features" title="Built to Make Verification Effortless" />
        {BLOCKS.map(([t, d, Mock], i) => (
          <div className={`block ${i % 2 ? 'flip' : ''}`} key={t}>
            <Reveal className="block-text">
              <span className="idx">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
            <Reveal delay={150} className="block-vis"><Mock /></Reveal>
          </div>
        ))}
      </div>
    </section>
  )
}

function Audience() {
  return (
    <section className="section">
      <div className="container">
        <Heading eyebrow="Who it's for" title="Built for Businesses That Onboard Customers" />
        <div className="grid4">
          {AUDIENCE.map(([e, t, d], i) => (
            <Reveal key={t} delay={i * 100} className="card aud">
              <div className="emoji">{e}</div>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Why() {
  return (
    <section className="section alt">
      <div className="container">
        <Heading eyebrow="Why choose us" title="Why Choose VerifyHub" />
        <div className="grid3">
          {WHY.map(([e, t, d], i) => (
            <Reveal key={t} delay={(i % 3) * 100} className="why">
              <div className="emoji">{e}</div>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Security() {
  return (
    <section id="security" className="section sec">
      <div className="container sec-grid">
        <Reveal>
          <span className="eyebrow light">Security &amp; Compliance</span>
          <h2 className="h2 left">Your Customers' Data Deserves Real Protection</h2>
          <ul className="checks">
            {SECURITY.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </Reveal>
        <Reveal delay={150} className="shield-wrap">
          <div className="shield">
            <svg viewBox="0 0 24 24"><path d="M12 2l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5z" /><path d="M8 12l3 3 5-6" /></svg>
          </div>
          <div className="orbit o1" /><div className="orbit o2" />
        </Reveal>
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="section">
      <div className="container">
        <Heading eyebrow="Testimonials" title="Trusted by Teams That Verify Every Day" />
        <div className="grid3">
          {TESTIMONIALS.map(([q, n, r], i) => (
            <Reveal key={n} delay={i * 120} className="card quote">
              <div className="stars">★★★★★</div>
              <p>“{q}”</p>
              <div className="who"><span>{n[0]}</span><div><b>{n}</b><small>{r}</small></div></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="section alt">
      <div className="container narrow">
        <Heading eyebrow="FAQ" title="Frequently Asked Questions" />
        {FAQS.map(([q, a], i) => (
          <Reveal key={q} className={`faq ${open === i ? 'open' : ''}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              {q}<span className="plus" />
            </button>
            <div className="ans"><div><p>{a}</p></div></div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="cta-wrap" id="start">
      <Reveal className="container cta">
        <h2>Make Customer Verification Effortless</h2>
        <p>Join the retailers who verify faster, onboard smoother and stay protected with VerifyHub.</p>
        <div className="cta-btns">
          <a href="#start" className="btn btn-green btn-lg">Get Started</a>
          <a href="#login" className="btn btn-light btn-lg">Login</a>
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="foot-grid">
          <div>
            <img src="/logo.png" alt="VerifyHub logo" />
            <p>VerifyHub is a fast, secure identity verification platform for modern businesses.</p>
          </div>
          <div>
            <h4>Product</h4>
            <a href="#services">Services</a><a href="#how">How It Works</a><a href="#security">Security</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#faq">FAQ</a><a href="mailto:support@verifyhub.com">Contact Us</a>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#privacy">Privacy Policy</a><a href="#terms">Terms &amp; Conditions</a>
            <a href="mailto:support@verifyhub.com">support@verifyhub.com</a>
          </div>
        </div>
        <div className="foot-bot">© 2026 VerifyHub. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Problem />
        <Services />
        <How />
        <Features />
        <Audience />
        <Why />
        <Security />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
