import { useEffect, useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Upload, Play, Shield, ScrollText, TimerReset, Sparkles, MoveRight, Home, BookText, Film, Trophy, Database, Send } from 'lucide-react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const DATASET_URL = 'https://drive.google.com/drive/folders/1H8Kc-ExampleReplaceWithYourFolder' // replace with your drive link

// Competition start: 2026-02-18 00:00 Asia/Karachi (UTC+05:00) -> 2026-02-17 19:00:00Z
const COMPETITION_START_ISO = '2026-02-17T19:00:00Z'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] } })
}

const tiltIn = {
  hidden: { opacity: 0, rotateX: 12, y: 40 },
  visible: { opacity: 1, rotateX: 0, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

function useCountdown(targetIso) {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso])
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const diff = Math.max(0, target - now)
  const s = Math.floor(diff / 1000)
  const days = Math.floor(s / (3600 * 24))
  const hours = Math.floor((s % (3600 * 24)) / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  return { days, hours, minutes, seconds, done: diff === 0 }
}

function FloatingShapes() {
  // Circle, Triangle, Square floating like Squid Game tokens with soft volumetric light wash
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* volumetric gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_400px_at_50%_-10%,rgba(236,72,153,0.10),transparent),radial-gradient(900px_300px_at_10%_20%,rgba(20,184,166,0.10),transparent),radial-gradient(1100px_400px_at_90%_10%,rgba(244,63,94,0.08),transparent)]" />

      <motion.div
        className="absolute -left-10 top-24 h-28 w-28 rounded-full bg-pink-500/20 ring-2 ring-pink-500/50 shadow-[0_0_80px_rgba(236,72,153,0.35)]"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-8 top-36 h-24 w-24 bg-teal-400/20 ring-2 ring-teal-400/60 shadow-[0_0_80px_rgba(20,184,166,0.35)]"
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        animate={{ y: [0, 25, 0], rotate: [0, 10, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 bottom-10 h-20 w-20 -translate-x-1/2 bg-fuchsia-500/10 ring-2 ring-fuchsia-400/60 shadow-[0_0_80px_rgba(244,63,94,0.35)]"
        animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* soft shafts of light */}
      <div className="absolute left-10 top-0 h-full w-24 rotate-6 bg-gradient-to-b from-pink-500/10 via-transparent to-transparent blur-2xl" />
      <div className="absolute right-12 top-0 h-full w-24 -rotate-6 bg-gradient-to-b from-teal-400/10 via-transparent to-transparent blur-2xl" />
    </div>
  )
}

function Navbar() {
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rules', label: 'Rules', icon: BookText },
    { id: 'demo', label: 'Demo', icon: Film },
    { id: 'compete', label: 'How to Compete', icon: Trophy },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'submit', label: 'Submit Bot', icon: Send }
  ]

  const handleClick = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fixed inset-x-0 top-3 z-50 flex justify-center px-3">
      <nav className="relative flex w-full max-w-5xl items-center justify-between gap-2 rounded-2xl border border-pink-500/40 bg-zinc-900/30 px-3 py-2 shadow-[0_10px_60px_rgba(236,72,153,0.25)] backdrop-blur-xl">
        {/* glowing edges */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-pink-400/50 [box-shadow:inset_0_0_40px_rgba(236,72,153,0.35)]" />
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {items.map(({ id, label, icon: Icon }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className="group inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-zinc-200/90 transition-colors hover:text-white"
            >
              <span className="rounded-md border border-pink-500/40 bg-pink-500/10 p-1.5 text-pink-300 shadow-[0_0_18px_rgba(236,72,153,0.45)] group-hover:bg-pink-500/20">
                <Icon className="h-4 w-4" />
              </span>
              <span className="drop-shadow-[0_0_10px_rgba(236,72,153,0.4)]">{label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}

function NeonTitle() {
  return (
    <motion.h1
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-center select-none relative"
    >
      <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-pink-500 to-teal-300 drop-shadow-[0_0_25px_rgba(236,72,153,0.45)]">
        Vibe Coding
      </span>
      <span className="ml-3 align-super text-base sm:text-lg font-semibold text-teal-300/90">
        ∙ Squid Game Edition
      </span>
      <div className="mt-4 flex items-center justify-center gap-3">
        <span className="h-5 w-5 rounded-full ring-2 ring-pink-500 bg-pink-500/20" />
        <span className="h-5 w-5 ring-2 ring-teal-400 bg-teal-400/20" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', boxShadow: '0 0 18px rgba(20,184,166,0.45)' }} />
        <span className="h-5 w-5 bg-fuchsia-500/20 ring-2 ring-fuchsia-400" />
      </div>
      {/* Doll standing near the title */}
      <DollBot />
    </motion.h1>
  )
}

function DollBot() {
  // Stylized Red-Light/Green-Light doll with glowing eyes
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="pointer-events-none absolute -right-4 sm:-right-12 md:-right-24 -top-6 sm:-top-8 md:-top-10 scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100"
      aria-hidden
    >
      <div className="relative">
        {/* Head */}
        <div className="relative mx-auto h-24 w-24 rounded-full bg-amber-200/90 ring-4 ring-amber-300/80 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
          {/* Hair */}
          <div className="absolute -top-1 left-1/2 h-10 w-20 -translate-x-1/2 rounded-b-[18px] bg-zinc-800" />
          {/* Eyes */}
          <div className="absolute left-6 top-10 h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_18px_6px_rgba(244,63,94,0.6)]" />
          <div className="absolute right-6 top-10 h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_18px_6px_rgba(244,63,94,0.6)]" />
          {/* Ominous glow */}
          <div className="absolute -inset-1 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,63,94,0.28),transparent_55%)] blur-[1px]" />
        </div>
        {/* Neck */}
        <div className="mx-auto h-4 w-6 rounded-b-md bg-amber-300/80" />
        {/* Body */}
        <div className="relative mx-auto h-24 w-20 rounded-2xl bg-orange-400/90 ring-4 ring-orange-300/70">
          <div className="absolute inset-0 rounded-2xl bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.1)_60%,rgba(0,0,0,0.25)_100%)]" />
        </div>
        {/* Arms & Legs */}
        <div className="mx-auto mt-1 flex w-24 items-center justify-between">
          <div className="h-10 w-3 rounded-full bg-orange-300" />
          <div className="h-10 w-3 rounded-full bg-orange-300" />
        </div>
        <div className="mx-auto mt-1 flex w-20 items-center justify-between">
          <div className="h-10 w-4 rounded-md bg-amber-700" />
          <div className="h-10 w-4 rounded-md bg-amber-700" />
        </div>
      </div>
    </motion.div>
  )
}

function CountdownTimer() {
  const { days, hours, minutes, seconds } = useCountdown(COMPETITION_START_ISO)
  return (
    <section className="relative z-10 mx-auto -mt-2 mb-10 max-w-3xl px-4">
      <motion.div
        variants={tiltIn}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden rounded-2xl border border-rose-500/40 bg-zinc-950/70 p-5 shadow-[0_0_50px_rgba(244,63,94,0.28)] backdrop-blur-md"
        style={{ perspective: '1200px' }}
      >
        {/* Blinking red warning beacons */}
        <div className="pointer-events-none absolute -left-2 top-2 h-3 w-3 animate-ping rounded-full bg-rose-500" />
        <div className="pointer-events-none absolute -right-2 top-2 h-3 w-3 animate-ping rounded-full bg-rose-500" />
        <div className="pointer-events-none absolute -left-2 bottom-2 h-3 w-3 animate-ping rounded-full bg-rose-500" />
        <div className="pointer-events-none absolute -right-2 bottom-2 h-3 w-3 animate-ping rounded-full bg-rose-500" />

        <div className="relative z-10 grid grid-cols-4 gap-3 text-center">
          {[{label:'Days', value: days}, {label:'Hours', value: hours}, {label:'Minutes', value: minutes}, {label:'Seconds', value: seconds}].map((it, i) => (
            <motion.div
              key={it.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="rounded-xl border border-rose-400/30 bg-gradient-to-b from-zinc-900/60 to-black/70 p-4 shadow-[inset_0_0_25px_rgba(244,63,94,0.15)]"
            >
              <div className="text-3xl font-extrabold tracking-widest text-rose-300 drop-shadow-[0_0_20px_rgba(244,63,94,0.45)]">
                {String(it.value).padStart(2, '0')}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-rose-200/70">{it.label}</div>
            </motion.div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-rose-200/70">Countdown to Competition Start</p>
      </motion.div>
    </section>
  )
}

function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] w-full overflow-hidden bg-[#09090b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.1),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.08),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(244,63,94,0.08),transparent_40%)]" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />

      <FloatingShapes />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-4 sm:px-6 lg:px-8">
        <NeonTitle />
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mx-auto mt-5 max-w-2xl text-center text-teal-100/80"
        >
          Enter the arena. Code smart, survive rounds, and claim the crown. Futuristic challenges, cinematic vibes, and neon-drenched glory.
        </motion.p>

        <CountdownTimer />

        <motion.div
          variants={tiltIn}
          initial="hidden"
          animate="visible"
          className="mt-6 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-black/40 shadow-[0_0_40px_rgba(236,72,153,0.25)] backdrop-blur-md"
          style={{ perspective: '1200px' }}
        >
          <div className="relative h-full w-full">
            <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  )
}

function RuleItem({ icon: Icon, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-xl border border-pink-500/30 bg-gradient-to-b from-zinc-900/70 to-black/60 p-0 shadow-[0_0_30px_rgba(236,72,153,0.08)]"
    >
      {/* sliding door reveal */}
      <div className="relative p-5">
        <div className="relative z-10 flex items-start gap-4">
          <div className="mt-1 rounded-lg bg-pink-500/15 p-2 ring-1 ring-pink-500/50 text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-1 text-sm text-zinc-300/80">{desc}</p>
          </div>
        </div>

        {/* left panel */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-zinc-950/80"
          initial={{ x: 0 }}
          whileInView={{ x: '-100%' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* right panel */}
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-zinc-950/80"
          initial={{ x: 0 }}
          whileInView={{ x: '100%' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

function Rules() {
  const items = [
    { icon: Shield, title: 'Survive Each Round', desc: 'Progress through coding trials. Fewer bugs, more points. Elimination is real.' },
    { icon: TimerReset, title: 'Beat the Clock', desc: 'Each stage has strict time. Optimize, improvise, overcome.' },
    { icon: ScrollText, title: 'Follow the Protocol', desc: 'Respect input/output formats and constraints. Precision matters in the arena.' },
    { icon: Sparkles, title: 'Style for Bonus', desc: 'Polished UI/UX, animations, and clean architecture earn extra rewards.' },
  ]

  return (
    <section id="rules" className="relative w-full bg-black py-16">
      <div className="absolute inset-0 bg-[radial-gradient(400px_200px_at_20%_0%,rgba(236,72,153,0.1),transparent),radial-gradient(500px_250px_at_80%_20%,rgba(45,212,191,0.08),transparent)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-white">
            Arena Rules
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-300/80">
            Read carefully. Break them, and the doors close.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <RuleItem key={i} icon={it.icon} title={it.title} desc={it.desc} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoShowcase() {
  return (
    <section id="demo" className="relative bg-gradient-to-b from-black to-zinc-950 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(700px_300px_at_50%_0%,rgba(20,184,166,0.12),transparent)]" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <h3 className="text-3xl font-bold text-white">Demo Screen</h3>
          <p className="mt-2 text-zinc-300/80">A giant screen descends into the arena. Press play when you are ready.</p>
        </motion.div>

        <motion.div
          variants={tiltIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 perspective"
          style={{ perspective: '1600px' }}
        >
          <div className="relative mx-auto aspect-video w-full max-w-5xl -rotate-x-2 overflow-hidden rounded-3xl border border-teal-400/30 bg-zinc-950/70 shadow-[0_30px_100px_-30px_rgba(20,184,166,0.35),inset_0_0_60px_rgba(20,184,166,0.15)] backdrop-blur">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_200px_at_50%_-10%,rgba(20,184,166,0.25),transparent)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center text-center">
                <Play className="h-14 w-14 text-teal-300 drop-shadow-[0_0_25px_rgba(20,184,166,0.6)]" />
                <p className="mt-4 text-sm text-zinc-300/80">Drop your demo video in this frame or replace with an embed URL.</p>
              </div>
            </div>
            <video className="h-full w-full object-cover opacity-30" playsInline controls={false} muted loop />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Door({ label, index }) {
  // Door that opens on hover and when in view
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className="group relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-pink-500/30 bg-gradient-to-b from-zinc-900/80 to-black/70 p-4 shadow-[0_20px_60px_-30px_rgba(236,72,153,0.35)]"
    >
      <div className="relative h-40 w-full rounded-xl bg-[url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center">
        {/* Left door */}
        <motion.div
          className="absolute inset-y-0 left-0 w-1/2 origin-left bg-zinc-950/90 backdrop-blur-[1px]"
          whileHover={{ rotateY: -55 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(300px_120px_at_90%_50%,rgba(236,72,153,0.15),transparent)]" />
          <div className="absolute right-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded bg-zinc-700" />
        </motion.div>
        {/* Right door */}
        <motion.div
          className="absolute inset-y-0 right-0 w-1/2 origin-right bg-zinc-950/90 backdrop-blur-[1px]"
          whileHover={{ rotateY: 55 }}
          transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(300px_120px_at_10%_50%,rgba(20,184,166,0.15),transparent)]" />
          <div className="absolute left-3 top-1/2 h-8 w-1 -translate-y-1/2 rounded bg-zinc-700" />
        </motion.div>
        {/* Label */}
        <div className="absolute inset-0 grid place-items-center">
          <p className="z-10 rounded-md bg-black/40 px-4 py-1 text-center text-sm font-semibold text-white ring-1 ring-white/10 backdrop-blur">
            {label}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function CompetitionFlow() {
  const steps = [
    'Read rules',
    'Watch demo',
    'Download dataset & template',
    'Train bot on the 3 maps',
    'Upload bot code',
  ]
  return (
    <section id="compete" className="relative bg-[radial-gradient(800px_300px_at_50%_-10%,rgba(236,72,153,0.10),transparent),linear-gradient(to_bottom,#050505,#030303)] py-16">
      <div className="absolute inset-0 bg-[radial-gradient(400px_200px_at_15%_0%,rgba(236,72,153,0.1),transparent),radial-gradient(500px_250px_at_85%_15%,rgba(20,184,166,0.08),transparent)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
          <h3 className="text-3xl font-bold text-white">Competition Flow</h3>
          <p className="mt-2 text-zinc-300/80">Pass through each door to reach the final upload.</p>
        </motion.div>

        <div className="relative mx-auto mt-10 flex max-w-2xl flex-col gap-8">
          {/* Vertical line */}
          <div className="pointer-events-none absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500/60 via-fuchsia-500/40 to-teal-400/60" />
          {steps.map((label, i) => (
            <div key={i} className="relative pl-8">
              {/* Node */}
              <div className="absolute left-0 top-3 grid h-8 w-8 place-items-center">
                <span className="h-3 w-3 rounded-full bg-pink-500 shadow-[0_0_18px_rgba(236,72,153,0.8)] ring-2 ring-pink-400/70" />
              </div>
              <Door label={label} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Actions() {
  const [team, setTeam] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const fileInputRef = useRef(null)

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setResult(null)

    try {
      const form = new FormData()
      form.append('file', file)
      if (team) form.append('team', team)
      if (email) form.append('email', email)

      const res = await fetch(`${BACKEND_URL}/api/upload`, {
        method: 'POST',
        body: form,
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.detail || 'Upload failed')
      setResult({ ok: true, message: `Uploaded ${data.filename} (${Math.round((data.size/1024)*10)/10} KB)` })
      setFile(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      setResult({ ok: false, message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="dataset" className="relative bg-zinc-950 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(500px_200px_at_15%_0%,rgba(236,72,153,0.1),transparent),radial-gradient(600px_260px_at_85%_10%,rgba(20,184,166,0.09),transparent)]" />
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.a
            href={DATASET_URL}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative flex items-center justify-between rounded-2xl border border-pink-500/40 bg-gradient-to-b from-zinc-900 to-black p-6 shadow-[0_0_40px_rgba(236,72,153,0.25)] transition-transform hover:-translate-y-0.5"
            animate={{
              boxShadow: [
                '0 0 40px rgba(236,72,153,0.25)',
                '0 0 60px rgba(236,72,153,0.45)'
              ],
              scale: [1, 1.01, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div>
              <h4 className="text-2xl font-extrabold tracking-wide text-pink-300 drop-shadow-[0_0_18px_rgba(236,72,153,0.5)]">Get Dataset & Template</h4>
              <p className="mt-2 max-w-md text-sm text-pink-100/70">Download the arena assets and the starter template to begin your run.</p>
            </div>
            <div className="rounded-xl border border-pink-400/50 bg-pink-500/10 p-3 text-pink-300 shadow-[0_0_25px_rgba(236,72,153,0.45)] group-hover:shadow-[0_0_35px_rgba(236,72,153,0.65)]">
              <MoveRight className="h-6 w-6" />
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-pink-500/40 [box-shadow:inset_0_0_40px_rgba(236,72,153,0.35)]" />
          </motion.a>

          <motion.form
            id="submit"
            onSubmit={handleUpload}
            variants={tiltIn}
            initial={{ opacity: 0, rotateX: -15, y: 30 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl border border-teal-400/40 bg-gradient-to-b from-zinc-900 to-black p-6 shadow-[0_0_40px_rgba(20,184,166,0.25)]"
          >
            <div className="absolute inset-0 rounded-2xl ring-1 ring-teal-400/40 [box-shadow:inset_0_0_40px_rgba(20,184,166,0.3)]" />
            <div className="relative z-10">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg border border-teal-400/50 bg-teal-400/10 p-2 text-teal-300 shadow-[0_0_18px_rgba(20,184,166,0.45)]">
                  <Upload className="h-5 w-5" />
                </div>
                <h4 className="text-xl font-bold text-teal-200">Upload Your Bot Code</h4>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Team name (optional)"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full rounded-md border border-zinc-700/70 bg-zinc-900/70 px-3 py-2 text-zinc-100 outline-none ring-1 ring-transparent focus:ring-teal-400/60"
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-zinc-700/70 bg-zinc-900/70 px-3 py-2 text-zinc-100 outline-none ring-1 ring-transparent focus:ring-teal-400/60"
                />
                <div className="sm:col-span-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="block w-full cursor-pointer rounded-md border border-zinc-700/70 bg-zinc-900/70 px-3 py-2 text-zinc-300 file:mr-4 file:rounded-md file:border-0 file:bg-teal-500/20 file:px-4 file:py-2 file:text-teal-200 hover:file:bg-teal-500/30"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-teal-400 px-4 py-2 font-semibold text-black shadow-[0_0_30px_rgba(20,184,166,0.45)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading ? 'Uploading…' : 'Send to Arena Storage'}
              </button>

              {result && (
                <p className={`mt-3 text-sm ${result.ok ? 'text-teal-300' : 'text-pink-300'}`}>{result.message}</p>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

function InitialAvatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className="relative h-20 w-20 overflow-hidden rounded-xl ring-2 ring-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.35)]">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-fuchsia-500/20 to-teal-400/30" />
      <div className="absolute inset-0 grid place-items-center text-2xl font-extrabold text-white/90">
        {initials}
      </div>
    </div>
  )
}

function TeamMemberCard({ name, role, img, index = 0 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const rotateY = useTransform(scrollYProgress, [0, 1], [-6, 0])

  return (
    <motion.div
      ref={ref}
      style={{ rotateY }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.05 * index }}
      className="group relative flex items-center gap-4 rounded-2xl border border-zinc-700/60 bg-gradient-to-b from-zinc-900/70 to-black/70 p-5 hover:border-pink-500/50 hover:shadow-[0_0_40px_rgba(236,72,153,0.25)]"
    >
      {img ? (
        <img src={img} alt={name} className="h-20 w-20 rounded-xl object-cover ring-2 ring-pink-500/50" />
      ) : (
        <InitialAvatar name={name} />
      )}
      <div className="relative z-10">
        <p className="text-base font-semibold text-white">{name}</p>
        <p className="text-sm text-zinc-300/75">{role}</p>
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(600px_200px_at_50%_-10%,rgba(236,72,153,0.15),transparent)]" />
    </motion.div>
  )
}

function ParallaxTokens() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [-20, 20])
  const y3 = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute left-6 top-10 h-16 w-16 rounded-full bg-pink-500/15 ring-2 ring-pink-500/40" />
      <motion.div style={{ y: y2, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} className="absolute right-10 top-24 h-16 w-16 bg-teal-400/15 ring-2 ring-teal-400/40" />
      <motion.div style={{ y: y3 }} className="absolute left-1/2 bottom-10 h-16 w-16 -translate-x-1/2 bg-fuchsia-500/15 ring-2 ring-fuchsia-400/40" />
    </div>
  )
}

function TeamSection() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(800px_400px_at_50%_-10%,rgba(236,72,153,0.10),transparent),linear-gradient(to_bottom,rgba(0,0,0,0.9),#050505)] py-16">
      <ParallaxTokens />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
          <h3 className="text-3xl font-bold text-white">AI Competitions Team</h3>
          <p className="mx-auto mt-2 max-w-2xl text-zinc-300/80">Meet the game masters guiding your run through the arena.</p>
        </motion.div>

        <div className="mt-8 grid gap-6">
          {/* Head */}
          <TeamMemberCard name="Abdul Rahman Azam" role="Head" index={0} />

          {/* Co-Heads */}
          <div className="grid gap-6 sm:grid-cols-2">
            <TeamMemberCard name="Mufeez Hanif" role="Co-Head" index={1} />
            <TeamMemberCard name="Asfand Ahmed" role="Co-Head" index={2} />
          </div>
        </div>

        {/* Divider flair */}
        <div className="my-10 flex items-center justify-center gap-3 opacity-80">
          <span className="h-1 w-24 rounded-full bg-pink-500/60 shadow-[0_0_20px_rgba(236,72,153,0.6)]" />
          <span className="h-3 w-3 rounded-full ring-2 ring-pink-500 bg-pink-500/20" />
          <span className="h-3 w-3 ring-2 ring-teal-400 bg-teal-400/20" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
          <span className="h-1 w-24 rounded-full bg-teal-400/60 shadow-[0_0_20px_rgba(20,184,166,0.6)]" />
        </div>

        {/* Module Team */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
          <h3 className="text-3xl font-bold text-white">Module Team</h3>
          <p className="mx-auto mt-2 max-w-2xl text-zinc-300/80">The specialists behind the modules you will face.</p>
        </motion.div>

        <div className="mt-8 grid gap-6">
          <TeamMemberCard name="Ali Hadi" role="Module Head" index={3} />
          <div className="grid gap-6 sm:grid-cols-2">
            <TeamMemberCard name="Usman Ahmed" role="Co-Head" index={4} />
            <TeamMemberCard name="Hani Ali" role="Co-Head" index={5} />
          </div>
        </div>
      </div>

      {/* Sticky squid-game stripe for scroll wow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-zinc-200">
      <Navbar />
      <Hero />
      <Rules />
      <VideoShowcase />
      <CompetitionFlow />
      <Actions />
      <TeamSection />
      <footer className="border-t border-zinc-800 bg-black/80 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Vibe Coding — Squid Game Edition</p>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="h-3 w-3 rounded-full ring-2 ring-pink-500 bg-pink-500/20" />
              <span className="h-3 w-3 ring-2 ring-teal-400 bg-teal-400/20" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
              <span className="h-3 w-3 bg-fuchsia-500/20 ring-2 ring-fuchsia-400" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
