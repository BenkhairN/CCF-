import { useEffect, useRef, useState } from 'react'
import './App.css'

const RESULTS = [
  'Refurbished and replaced park equipment at C.L. Griffin, C.A. Smith, and Adena Meadows parks.',
  'Removed derelict vehicles in the Hudson Estate and Back-a-Town areas.',
  'Launched a community-wide cleanup campaign.',
  'Installed new park equipment at Neko Grant Park.',
  'Constructed a gazebo at C.A. Smith Recreational Park.',
  'Conducted hurricane preparedness training sessions.',
  'Distributed solar light bulbs to widows and seniors.',
  'Provided backyard farming kits to encourage sustainable living.',
  'Supplied sports equipment to Hugh Campbell and Jack Hayward Junior High Schools.',
  'Established the first Emergency Operations Centre for community resilience.',
]

const PRIORITIES = [
  {
    title: 'Interact with Government Agencies',
    text: 'Ensuring accessibility and service for every resident.',
  },
  {
    title: 'Reopen the Susan J. Wallace Community Center',
    text: 'After-school activities: homework assistance, computer classes, and extracurricular programs.',
  },
  {
    title: 'Host Entrepreneurial Seminars',
    text: 'Equip residents with skills and resources to start and grow businesses.',
  },
  {
    title: 'Hurricane Preparedness Training',
    text: 'Educate residents on safety and readiness for hurricane seasons.',
  },
  {
    title: 'Enhance Youth Development Programs',
    text: 'Support and empower young people through mentorship and activities.',
  },
  {
    title: 'Promote Environmental Sustainability',
    text: 'Organize clean-up campaigns and tree-planting initiatives.',
  },
  {
    title: 'Organize Health & Wellness Fairs',
    text: 'Provide resources and activities for a healthier community.',
  },
]

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function Counter({ target, suffix = '', label }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1400
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(Math.round(target * eased))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <div className="stat" ref={ref}>
      <span className="stat-value">
        {value}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

function App() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [greetIn, setGreetIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useScrollReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = document.getElementById('greetings')
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setGreetIn(entry.isIntersecting), {
      threshold: 0.25,
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const saved = JSON.parse(localStorage.getItem('pineridge-concerns') || '[]')
    saved.push({ ...form, date: new Date().toISOString() })
    localStorage.setItem('pineridge-concerns', JSON.stringify(saved))
    setSubmitted(true)
    setForm({ name: '', contact: '', message: '' })
  }

  return (
    <>
      <header className={`nav ${scrolled ? 'nav-scrolled' : ''} ${greetIn ? 'nav-gold' : ''}`}>
        <a className="nav-brand" href="#top">
          Clifton <span>Cleare-Francis</span>
        </a>
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <nav className={`nav-links ${menuOpen ? 'nav-links-open' : ''}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#record" onClick={() => setMenuOpen(false)}>Record</a>
          <a href="#priorities" onClick={() => setMenuOpen(false)}>Priorities</a>
          <a href="#voice" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Voice a Concern
          </a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-text">
          <p className="hero-eyebrow">Councilor for the Pineridge Constituency</p>
          <h1>
            <span className="line">
              <span className="line-inner">Proven Leadership.</span>
            </span>
            <span className="line">
              <span className="line-inner accent">Real Results.</span>
            </span>
          </h1>
          <p className="hero-sub">
            Clifton A. D. Cleare-Francis — your voice in local government.
          </p>
          <div className="hero-actions">
            <a href="#voice" className="btn btn-primary">
              Share a Concern
            </a>
            <a href="#record" className="btn btn-outline">
              See the Record
            </a>
          </div>
          <div className="hero-stats">
            <Counter target={10} suffix="+" label="Projects Delivered" />
            <Counter target={1} suffix="st" label="Community EOC" />
            <Counter target={7} label="Key Priorities" />
          </div>
        </div>
        <div className="hero-photo">
          <div className="hero-caption">Community First. Always.</div>
          <img src="/images/hero-banner.png" alt="Clifton A. D. Cleare-Francis — One Pineridge. One Future." />
        </div>
      </section>

      <div className="principles">
        {[
          { step: '01', word: 'Listen', text: 'Every concern and idea from residents is heard.' },
          { step: '02', word: 'Act', text: 'Real work on the ground — parks, streets, schools.' },
          { step: '03', word: 'Deliver', text: 'Visible results the community can count on.' },
        ].map((p, i) => (
          <div className="principle reveal" key={p.word} style={{ transitionDelay: `${i * 100}ms` }}>
            <span className="principle-step">{p.step}</span>
            <h3>{p.word}</h3>
            <p>{p.text}</p>
          </div>
        ))}
      </div>

      <section className="section reveal" id="about">
        <h2>About Your Councilor</h2>
        <div className="about-grid">
          <img className="about-photo" src="/images/portrait-3.jpg" alt="Clifton Cleare-Francis" />
          <div>
            <p>
              Clifton A. D. Cleare-Francis serves the residents of Pineridge with a simple
              commitment: listen to the community, act on what matters, and deliver results you
              can see. From cleaner streets and better parks to hurricane readiness and support
              for seniors, his work is driven by purpose and measured by progress.
            </p>
            <p className="about-tagline">Driven by Purpose, Delivering Progress.</p>
          </div>
        </div>
      </section>

      <section className="section section-alt reveal" id="record">
        <h2>A Record of Results</h2>
        <p className="section-sub">Progress across Pineridge — not promises, results.</p>
        <ul className="results-grid">
          {RESULTS.map((item, i) => (
            <li key={item} className="result-card reveal" style={{ transitionDelay: `${(i % 5) * 60}ms` }}>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="section reveal" id="priorities">
        <h2>Priorities for Pineridge</h2>
        <p className="section-sub">The work ahead, together.</p>
        <div className="priorities-grid">
          {PRIORITIES.map((p, i) => (
            <article key={p.title} className="priority-card reveal" style={{ transitionDelay: `${(i % 4) * 70}ms` }}>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-voice reveal" id="voice">
        <h2>Your Voice Matters</h2>
        <p className="section-sub">
          Residents of Pineridge — share your concerns, comments, and ideas directly with your
          councilor.
        </p>
        {submitted ? (
          <div className="form-success">
            <h3>Thank you!</h3>
            <p>Your message has been received. Every concern is read and taken seriously.</p>
            <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
              Submit Another
            </button>
          </div>
        ) : (
          <form className="concern-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="field">
                <label htmlFor="contact">
                  Phone or Email <span className="optional">(optional)</span>
                </label>
                <input
                  id="contact"
                  type="text"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="How can we reach you?"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="message">Your Concern or Comment</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell us what's on your mind..."
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </section>

      <section className={`greetings ${greetIn ? 'greet-in' : ''}`} id="greetings">
        <span className="sparkle sparkle-1">✦</span>
        <span className="sparkle sparkle-2">✦</span>
        <span className="sparkle sparkle-3">✦</span>
        <span className="sparkle sparkle-4">✦</span>
        <span className="sparkle sparkle-5">✦</span>
        <div className="greetings-inner">
          <p className="greetings-eyebrow">From your councilor</p>
          <h2>
            <span className="line">
              <span className="line-inner">Season&rsquo;s Greetings</span>
            </span>
          </h2>
          <p className="greetings-sub">
            Wishing every family in Pineridge peace, joy, and hope this Christmas.
          </p>
          <div className="greetings-grid">
            <figure className="greeting-card greeting-card-main">
              <img src="/images/christmas.jpg" alt="Merry Christmas — Season's Greetings from Clifton Cleare-Francis, Councilor for Pineridge" />
            </figure>
          </div>
        </div>
      </section>

      <footer className={`footer ${greetIn ? 'footer-gold' : ''}`}>
        <p className="footer-name">Clifton A. D. Cleare-Francis</p>
        <p>Councilor for the Pineridge Constituency</p>
        <p className="footer-slogan">One Pineridge. One Future.</p>
      </footer>
    </>
  )
}

export default App
