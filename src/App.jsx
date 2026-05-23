import { useState, useEffect, useRef } from 'react'
import { MapPinHouse } from 'lucide-react';
import heroImg from '../assets/images/club_1.png'
import './App.css'

/* ---- Scroll animation hook ---- */
function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

/* ---- Navbar ---- */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'dj', label: 'DJs' },
    { id: 'drinks', label: 'Drinks' },
    { id: 'experience', label: 'Experience' },
    { id: 'staff', label: 'Team' },
  ]

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => go('hero')}>
          <span className="logo-mark">✦</span>
          <span className="logo-wordmark">CLUB LUMOS</span>
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {links.map(({ id, label }) => (
            <li key={id}>
              <button className="nav-link" onClick={() => go(id)}>{label}</button>
            </li>
          ))}
          <li className="nav-cta-mobile">
            <button className="btn-nav-cta" onClick={() => go('reserve')}>Reserve</button>
          </li>
        </ul>

        <button className="btn-nav-cta desktop-only" onClick={() => go('reserve')}>
          Reserve
        </button>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(m => !m)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}

/* ---- Hero ---- */
function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t) }, [])
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg">
        <img src={heroImg} alt="" className="hero-img" loading="eager" />
        <div className="hero-overlay" />
        <div className="hero-vignette" />
        <div className="hero-noise" />
      </div>

      <div className={`hero-content${loaded ? ' loaded' : ''}`}>
        <div className="hero-eyebrow">
          <span className="eyebrow-line" />
          <span className="eyebrow-text">Tonberry's Finest Night Venue</span>
          <span className="eyebrow-line" />
        </div>

        <h1 className="hero-title">
          <span className="hero-title-club">CLUB</span>
          <span className="hero-title-lumos">LUMOS</span>
        </h1>

        <p className="hero-tagline">
          Where darkness becomes art.<br />
          Where night becomes legend.
        </p>
      </div>

      <button className="scroll-down" onClick={() => go('about')} aria-label="Scroll down">
        <span className="scroll-label">Scroll</span>
        <span className="scroll-bar" />
      </button>

      <div className="hero-meta">
        {[
          { icon: MapPinHouse, label: 'Location', val: 'Tonberry | Empyreum Plot 42, Ward 8' },
        ].map(({ icon: Icon, label, val }, i) => (
          <>
            {i > 0 && <span key={`d${i}`} className="meta-divider" />}
            <div key={label} className="meta-item">
              <div className="meta-title">
                <Icon size={13} strokeWidth={2} color="#00c8d4" />
                <span className="meta-label">{label}</span>
              </div>
              <span className="meta-val">{val}</span>
            </div>
          </>
        ))}
      </div>
    </section>
  )
}

/* ---- About ---- */
function About() {
  const [ref, inView] = useInView()
  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="noise-layer" />
      <div className={`about-inner reveal${inView ? ' in' : ''}`}>
        <div className="about-text">
          <p className="section-label">✦ About Us</p>
          <h2 className="section-heading">
            A Universe<br />of Night
          </h2>
          <div className="rule" />
          <p className="body-text">
            Club Lumos is not merely a venue — it is a sensory world unto itself.
            Born from a vision of luxury, darkness, and transcendence, we curate
            experiences that blur the line between reality and euphoria.
          </p>
          <p className="body-text">
            From hand-crafted cocktails to world-class resident DJs, every detail
            at Lumos is designed to immerse you in an atmosphere of refined exclusivity.
          </p>
          <div className="about-stats">
            {[
              { num: '05+', label: 'Years Active' },
              { num: '50+', label: 'Signature Cocktails' },
              { num: '∞', label: 'Unforgettable Nights' },
            ].map(({ num, label }) => (
              <div key={label} className="stat">
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-visual">
          <div className="about-frame">
            <div className="about-img-main"><div className="photo-art art-club-1" /><div className="photo-fade" /></div>
            <div className="about-img-accent"><div className="photo-art art-club-2" /><div className="photo-fade" /></div>
            <div className="about-badge">
              <span className="badge-est">EST.</span>
              <span className="badge-year">2019</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Services ---- */
const SERVICES = [
  { icon: '◈', title: 'Premium Bar', desc: 'Curated spirits, rare vintages, and bespoke cocktails crafted by master mixologists.', tag: 'Full bar · Bottle service · Private selection' },
  { icon: '◉', title: 'VIP Tables', desc: 'Exclusive sections with dedicated service, premium bottle packages, and priority entry.', tag: 'VIP · Semi-private · Floor access' },
  { icon: '◬', title: 'Live DJs', desc: 'World-class resident and international guest DJs spinning across genres from midnight to dawn.', tag: 'House · Techno · Deep · Afro' },
  { icon: '◫', title: 'Private Events', desc: 'Transform Lumos into your exclusive venue for corporate, birthday, or product launch events.', tag: 'Buyout · Semi-private · Packages' },
  { icon: '◭', title: 'Luxury Lounge', desc: 'A dedicated lounge for premium guests featuring rare cigars, premium shisha, and curated service.', tag: 'Cigar · Shisha · Private area' },
  { icon: '◮', title: 'Bottle Service', desc: 'Our concierge arranges arrival, seating, and a personalized bottle parade for your group.', tag: 'Arrival · Parade · Premium bottles' },
]

function Services() {
  const [ref, inView] = useInView()
  return (
    <section id="services" className="services-section" ref={ref}>
      <div className="noise-layer" />
      <div className={`services-inner reveal${inView ? ' in' : ''}`}>
        <div className="section-header center">
          <p className="section-label">✦ What We Offer</p>
          <h2 className="section-heading">Our Services</h2>
          <p className="section-sub">Tailored experiences for the discerning guest</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <div key={s.title} className="service-card" style={{ '--i': i }}>
              <span className="service-icon">{s.icon}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <span className="service-tag">{s.tag}</span>
              <span className="card-accent-line" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- DJ Section ---- */
const DJS = [
  { name: 'DJ ZENITH', slot: 'RESIDENT', genre: 'Techno · House · Experimental', nights: 'Every Friday', bio: 'Internationally acclaimed, Zenith has headlined clubs from Berlin to Tokyo. His sets are a relentless journey through sound architecture and emotional intensity.' },
  { name: 'NOIRE', slot: 'RESIDENT', genre: 'Afro · Deep House · Soul', nights: 'Every Saturday', bio: 'NOIRE brings the warmth of African rhythms fused with deep house grooves. Each set is a soul-stirring narrative that moves the floor as one.' },
  { name: 'KIRA VOSS', slot: 'FEATURED', genre: 'Progressive · Melodic · Trance', nights: 'Monthly Special', bio: 'Award-winning producer and DJ, Kira\'s sets blend melodic progressions with emotional depth — a rare balance of cerebral and visceral.' },
]

function DJSection() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)
  const dj = DJS[active]

  return (
    <section id="dj" className="dj-section" ref={ref}>
      <div className="noise-layer" />
      <div className={`dj-inner reveal${inView ? ' in' : ''}`}>
        <div className="dj-header">
          <p className="section-label">✦ Behind the Decks</p>
          <h2 className="section-heading">Resident DJs</h2>
        </div>
        <div className="dj-layout">
          <div className="dj-visual">
            <div className="dj-img-wrap">
              <div className="photo-art art-dj" />
              <div className="dj-overlay" />
              <span className="dj-slot-badge">{dj.slot}</span>
            </div>
            <div className="dj-eq">
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="eq-bar" style={{ '--i': i }} />
              ))}
            </div>
          </div>

          <div className="dj-content">
            <div className="dj-tabs">
              {DJS.map((d, i) => (
                <button
                  key={d.name}
                  className={`dj-tab${active === i ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                >{d.name}</button>
              ))}
            </div>

            <div className="dj-detail" key={active}>
              <h3 className="dj-name">{dj.name}</h3>
              <p className="dj-genre">{dj.genre}</p>
              <div className="dj-schedule">
                <span className="sched-label">Plays</span>
                <span className="sched-val">{dj.nights}</span>
              </div>
              <p className="dj-bio">{dj.bio}</p>
              <button className="btn-outline">View Schedule</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Drinks ---- */
const DRINKS = [
  { name: 'Lumos Noir', type: 'Signature', desc: 'Aged rum, activated charcoal, black currant, smoked rosemary', price: 'IDR 185k', hue: 'purple' },
  { name: 'Midnight Veil', type: 'Signature', desc: 'Gin, elderflower, butterfly pea, citrus foam, edible silver', hue: 'blue', price: 'IDR 195k' },
  { name: 'Neon Haze', type: 'Signature', desc: 'Vodka, blue curaçao, lime, tonic, UV reactive garnish', hue: 'cyan', price: 'IDR 165k' },
  { name: 'Eclipse', type: 'Premium', desc: 'Japanese whisky, black sugar, smoked ice, charred citrus', hue: 'amber', price: 'IDR 245k' },
  { name: 'Velvet Dusk', type: 'Premium', desc: 'Mezcal, hibiscus, tamarind, black salt rim, dehydrated rose', hue: 'rose', price: 'IDR 215k' },
  { name: 'The Void', type: 'Reserve', desc: 'Cognac, aged port, walnut bitters, gold leaf, house-smoked oak', hue: 'dark', price: 'IDR 325k' },
]

function Drinks() {
  const [ref, inView] = useInView()
  return (
    <section id="drinks" className="drinks-section" ref={ref}>
      <div className="noise-layer" />
      <div className={`drinks-inner reveal${inView ? ' in' : ''}`}>
        <div className="section-header">
          <p className="section-label">✦ The Bar</p>
          <h2 className="section-heading">Signature Drinks</h2>
          <p className="section-sub">Crafted for the extraordinary palate</p>
        </div>
        <div className="drinks-grid">
          {DRINKS.map((d, i) => (
            <div key={d.name} className="drink-card" style={{ '--i': i }}>
              <div className="drink-art">
                <div className={`glass-art glass-${d.hue}`}>
                  <div className="glass-body" />
                  <div className="glass-liquid" />
                  <div className="glass-shine" />
                </div>
              </div>
              <div className="drink-info">
                <span className="drink-type">{d.type}</span>
                <h3 className="drink-name">{d.name}</h3>
                <p className="drink-desc">{d.desc}</p>
                <span className="drink-price">{d.price}</span>
              </div>
              <span className="card-accent-line" />
            </div>
          ))}
        </div>
        <div className="drinks-footer">
          <button className="btn-outline">View Full Menu</button>
        </div>
      </div>
    </section>
  )
}

/* ---- Experience ---- */
function Experience() {
  const [ref, inView] = useInView()
  return (
    <section id="experience" className="exp-section" ref={ref}>
      <div className="noise-layer" />
      <div className={`exp-inner reveal${inView ? ' in' : ''}`}>
        <div className="exp-text">
          <p className="section-label">✦ The Atmosphere</p>
          <h2 className="section-heading exp-heading">
            Feel the<br />
            <em className="accent-italic">Energy</em>
          </h2>
          <p className="body-text">
            Step into a world where sound, light, and architecture converge.
            Club Lumos is designed from the ground up to create an immersive
            multi-sensory experience unlike anything else in the city.
          </p>
          <ul className="exp-list">
            {[
              'State-of-the-art Funktion-One sound system',
              'Custom architectural lighting design',
              '1,200 m² premium floor space',
              'Two distinct zones: Main Floor & Lounge',
              'Outdoor terrace with panoramic city views',
            ].map((item) => (
              <li key={item} className="exp-item">
                <span className="exp-dot">◆</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="exp-gallery">
          <div className="exp-col-main">
            <div className="exp-photo">
              <div className="photo-art art-exp-1" />
              <div className="photo-fade" />
            </div>
          </div>
          <div className="exp-col-side">
            <div className="exp-photo">
              <div className="photo-art art-exp-2" />
              <div className="photo-fade" />
            </div>
            <div className="exp-photo">
              <div className="photo-art art-exp-3" />
              <div className="photo-fade" />
            </div>
            <div className="exp-stat-card">
              <span className="exp-stat-num">1,200</span>
              <span className="exp-stat-unit">m²</span>
              <span className="exp-stat-desc">of Pure Experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Staff ---- */
const TEAM = [
  { name: 'Rizky Aditya', role: 'General Manager', init: 'R' },
  { name: 'Sari Dewi', role: 'Head Mixologist', init: 'S' },
  { name: 'Marco Chen', role: 'Head of Security', init: 'M' },
  { name: 'Layla Putri', role: 'Events Director', init: 'L' },
  { name: 'Dimas Hadi', role: 'Lead Bartender', init: 'D' },
  { name: 'Nadia Kiara', role: 'Guest Relations', init: 'N' },
]

function Staff() {
  const [ref, inView] = useInView()
  return (
    <section id="staff" className="staff-section" ref={ref}>
      <div className="noise-layer" />
      <div className={`staff-inner reveal${inView ? ' in' : ''}`}>
        <div className="section-header center">
          <p className="section-label">✦ The Team</p>
          <h2 className="section-heading">Our People</h2>
          <p className="section-sub">The faces behind every extraordinary night</p>
        </div>
        <div className="staff-grid">
          {TEAM.map((m, i) => (
            <div key={m.name} className="staff-card" style={{ '--i': i }}>
              <div className="staff-photo">
                <div className="staff-avatar">{m.init}</div>
                <div className="staff-hover-overlay" />
              </div>
              <h3 className="staff-name">{m.name}</h3>
              <span className="staff-role">{m.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Rules ---- */
const RULES = [
  { cat: 'Age Policy', items: ['Minimum age: 21 years', 'Valid government-issued ID required', 'No exceptions to this policy'] },
  { cat: 'Dress Code', items: ['Smart casual to formal attire', 'No sportswear, sandals, or torn clothing', 'Fashion-forward looks strongly encouraged'] },
  { cat: 'Entry Policy', items: ['Management reserves right of entry', 'Reservation holders receive priority', 'No re-entry after 01:00 WIB'] },
  { cat: 'Conduct', items: ['Respect all guests and staff', 'No photography on the main floor', 'All substance policies strictly enforced'] },
]

function Rules() {
  const [ref, inView] = useInView()
  return (
    <section id="rules" className="rules-section" ref={ref}>
      <div className="noise-layer" />
      <div className={`rules-inner reveal${inView ? ' in' : ''}`}>
        <div className="rules-lead">
          <p className="section-label">✦ Entry Standards</p>
          <h2 className="section-heading">Dress Code<br />&amp; Rules</h2>
          <p className="body-text">
            To preserve the atmosphere of exclusivity and respect that defines
            Club Lumos, we ask all guests to adhere to our standards.
          </p>
        </div>
        <div className="rules-grid">
          {RULES.map((r, i) => (
            <div key={r.cat} className="rules-card" style={{ '--i': i }}>
              <h3 className="rules-cat">{r.cat}</h3>
              <ul className="rules-list">
                {r.items.map((item) => (
                  <li key={item} className="rules-item">
                    <span className="rules-dash">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---- Reserve ---- */
function Reserve() {
  const [ref, inView] = useInView(0.08)
  const [form, setForm] = useState({ name: '', phone: '', date: '', guests: '', type: 'Regular Table', notes: '' })
  const [done, setDone] = useState(false)

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  return (
    <section id="reserve" className="reserve-section" ref={ref}>
      <div className="noise-layer" />
      <div className={`reserve-inner reveal${inView ? ' in' : ''}`}>
        <div className="reserve-heading">
          <p className="section-label">✦ Book Your Night</p>
          <h2 className="section-heading">
            Reserve<br /><em className="accent-italic">Your Table</em>
          </h2>
          <p className="section-sub reserve-sub">
            Secure your spot at one of Jakarta's most exclusive venues.
            Our team will confirm within 24 hours.
          </p>
        </div>

        {done ? (
          <div className="reserve-success">
            <span className="success-mark">✦</span>
            <h3 className="success-title">Reservation Received</h3>
            <p className="success-body">We'll confirm your booking via WhatsApp within 24 hours.</p>
          </div>
        ) : (
          <form className="reserve-form" onSubmit={(e) => { e.preventDefault(); setDone(true) }}>
            <div className="form-row">
              <label className="form-field">
                <span className="field-label">Full Name</span>
                <input type="text" placeholder="Your name" value={form.name} onChange={set('name')} required />
              </label>
              <label className="form-field">
                <span className="field-label">WhatsApp Number</span>
                <input type="tel" placeholder="+62 8xx xxxx xxxx" value={form.phone} onChange={set('phone')} required />
              </label>
            </div>
            <div className="form-row">
              <label className="form-field">
                <span className="field-label">Date</span>
                <input type="date" value={form.date} onChange={set('date')} required />
              </label>
              <label className="form-field">
                <span className="field-label">Number of Guests</span>
                <select value={form.guests} onChange={set('guests')} required>
                  <option value="">Select</option>
                  {['2', '3', '4', '5', '6', '7', '8', '9', '10+'].map(n => (
                    <option key={n} value={n}>{n} guests</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-field">
              <span className="field-label">Table Type</span>
              <div className="type-options">
                {['Regular Table', 'VIP Section', 'Semi-Private', 'Full Buyout'].map(t => (
                  <label key={t} className={`type-opt${form.type === t ? ' sel' : ''}`}>
                    <input type="radio" name="type" value={t} checked={form.type === t} onChange={set('type')} />
                    {t}
                  </label>
                ))}
              </div>
            </div>
            <label className="form-field">
              <span className="field-label">Special Requests</span>
              <textarea rows={3} placeholder="Birthday setup, bottle preferences, dietary requirements…" value={form.notes} onChange={set('notes')} />
            </label>
            <button type="submit" className="btn-primary btn-full">
              Confirm Reservation
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

/* ---- Footer ---- */
function Footer() {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  return (
    <footer className="footer">
      <div className="noise-layer" />
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-mark">✦</span>
              <span className="logo-wordmark">CLUB LUMOS</span>
            </div>
            <p className="footer-tagline">Where darkness becomes art.</p>
            <div className="footer-socials">
              {[['IG', 'Instagram'], ['TT', 'TikTok'], ['SC', 'SoundCloud'], ['WA', 'WhatsApp']].map(([abbr, label]) => (
                <a key={abbr} href="#" className="social-chip" aria-label={label}>{abbr}</a>
              ))}
            </div>
          </div>
          <nav className="footer-nav">
            <div className="footer-col">
              <h4 className="footer-col-title">Explore</h4>
              <ul>
                {[['about', 'About Us'], ['services', 'Services'], ['dj', 'Our DJs'], ['drinks', 'The Bar']].map(([id, label]) => (
                  <li key={id}><button onClick={() => go(id)}>{label}</button></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Visit</h4>
              <ul>
                {[['experience', 'Experience'], ['staff', 'Team'], ['rules', 'Dress Code'], ['reserve', 'Reservations']].map(([id, label]) => (
                  <li key={id}><button onClick={() => go(id)}>{label}</button></li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="footer-col-title">Hours</h4>
              <ul className="hours-list">
                {[['Mon – Tue', 'Closed'], ['Wed – Thu', '21:00 – 03:00'], ['Fri – Sat', '21:00 – 04:00'], ['Sunday', '20:00 – 02:00']].map(([day, hrs]) => (
                  <li key={day}><span>{day}</span><span>{hrs}</span></li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <span className="footer-address">Jl. Kemang Raya No. 12, Jakarta Selatan · +62 21 xxxx xxxx</span>
          <span className="footer-copy">© 2025 Club Lumos. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}

/* ---- App ---- */
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <DJSection />
      <Drinks />
      <Experience />
      <Staff />
      <Rules />
      <Reserve />
      <Footer />
    </div>
  )
}
