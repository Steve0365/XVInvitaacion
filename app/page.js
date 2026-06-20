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
  const [scrollDirection, setScrollDirection] = useState("down")
  const [showScrollButton, setShowScrollButton] = useState(true)
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
      const windowHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight

      if (scrollTop <= 50) {
        setScrollDirection("down")
      } else if (scrollTop + windowHeight >= fullHeight - 80) {
        setScrollDirection("up")
      }

      if (
        (scrollTop <= 50 && scrollDirection === "up") ||
        (scrollTop + windowHeight >= fullHeight - 80 && scrollDirection === "down")
      ) {
        setShowScrollButton(false)
      } else {
        setShowScrollButton(true)
      }

      const rsvp = document.getElementById("rsvp")
      if (rsvp) {
        const position = rsvp.getBoundingClientRect()
        if (position.top < windowHeight * 0.8) {
          setNearRSVP(true)
        } else {
          setNearRSVP(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollDirection])

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
              {showScrollButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.5, x: 30 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => {
                    window.scrollBy({
                      top: scrollDirection === "down" ? window.innerHeight : -window.innerHeight,
                      behavior: "smooth"
                    })
                  }}
                  className="fixed right-5 top-1/2 z-50 w-14 h-14 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-xl border border-[#f6dc7b]/50 shadow-[0_0_25px_rgba(246,220,123,.45)]"
                >
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="text-[#f6dc7b] text-xl"
                  >
                    {scrollDirection === "down" ? "↓" : "↑"}
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {nearRSVP && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed right-5 bottom-28 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-[#f6dc7b]/40 text-white text-xs shadow-lg"
                >
                  ✨ Confirma tu asistencia
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
