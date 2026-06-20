'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import OceanBubbles from '../components/OceanBubbles'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import CountdownSection from '../components/Countdown'
import EventInfo from '../components/EventInfo'
import DressCode from '../components/DressCode'
import GiftSuggestion from '../components/GiftSuggestion'
import SpecialMessage from '../components/SpecialMessage'
import Trivia from '../components/Trivia'
import Gallery from '../components/Gallery'
import Music from '../components/Music'
import RSVP from '../components/RSVP'
import Footer from '../components/Footer'
import MusicPlayer from '../components/MusicPlayer'
import DynamicBackground from '../components/DynamicBackground'

const EnvelopeScreen = dynamic(
  () => import('../components/EnvelopeScreen'),
  { ssr: false }
)

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3 + i * 0.08,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
}

const sections = [
  { id: 'hero', Component: Hero },
  { id: 'countdown', Component: CountdownSection },
  { id: 'evento', Component: EventInfo },
  { id: 'vestimenta', Component: DressCode },
  { id: 'regalo', Component: GiftSuggestion },
  { id: 'mensaje', Component: SpecialMessage },
  { id: 'trivia', Component: Trivia },
  { id: 'galeria', Component: Gallery },
  { id: 'musica', Component: Music },
  { id: 'rsvp', Component: RSVP },
  { id: 'footer', Component: Footer },
]

export default function Home() {
  const [ready, setReady] = useState(false)
  const [showMain, setShowMain] = useState(false)
  const [showTopArrow, setShowTopArrow] = useState(false)
  const [showBottomArrow, setShowBottomArrow] = useState(true)
  const [nearRSVP, setNearRSVP] = useState(false)

  useEffect(() => { setReady(true) }, [])

  const handleEnvelopeOpen = useCallback(() => {
    setShowMain(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showMain ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [showMain])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const screen = window.innerHeight
      const height = document.documentElement.scrollHeight

      setShowTopArrow(scrollTop > 150)
      setShowBottomArrow(scrollTop + screen < height - 150)

      const rsvp = document.getElementById("rsvp")
      if (rsvp) {
        const pos = rsvp.getBoundingClientRect()
        setNearRSVP(pos.top < screen * 0.75)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!ready) return null

  return (
    <>
      {!showMain && <EnvelopeScreen onOpen={handleEnvelopeOpen} />}

      <div className={`bubbles-wrapper ${showMain ? 'show-page' : ''}`}>
        <OceanBubbles />
      </div>

      <AnimatePresence>
        {showMain && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="relative min-h-screen"
          >
            <DynamicBackground />
            <Navbar />
            {sections.map(({ Component }, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={sectionVariants}
                initial="hidden"
                animate="visible"
              >
                <Component />
              </motion.div>
            ))}
            <MusicPlayer />

            <AnimatePresence>
              {nearRSVP && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  onClick={() => {
                    document.getElementById("rsvp").scrollIntoView({ behavior: "smooth" })
                  }}
                  className="fixed right-5 bottom-28 z-50 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-[#f6dc7b]/50 text-white text-sm tracking-wide shadow-[0_0_25px_rgba(246,220,123,.45)] cursor-pointer"
                >
                  ✨ Confirma tu asistencia
                </motion.div>
              )}
            </AnimatePresence>

            <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
              <AnimatePresence>
                {showTopArrow && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5, x: 20 }}
                    onClick={() => {
                      window.scrollBy({ top: -window.innerHeight, behavior: "smooth" })
                    }}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-[#f6dc7b]/50 text-[#f6dc7b] shadow-[0_0_18px_rgba(246,220,123,.4)]"
                  >
                    ↑
                  </motion.button>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showBottomArrow && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5, x: 20 }}
                    onClick={() => {
                      window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
                    }}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-[#f6dc7b]/50 text-[#f6dc7b] shadow-[0_0_18px_rgba(246,220,123,.4)]"
                  >
                    ↓
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
