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

  useEffect(() => { setReady(true) }, [])

  const handleEnvelopeOpen = useCallback(() => {
    setShowMain(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = showMain ? '' : 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [showMain])

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
            {/* Flecha de navegación */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 1,
                delay: 2
              }}
              onClick={() => {
                window.scrollBy({
                  top: window.innerHeight,
                  behavior: "smooth"
                })
              }}
              className="fixed right-5 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-xl border border-[#f6dc7b]/50 text-[#f6dc7b] shadow-[0_0_20px_rgba(246,220,123,0.45)]"
            >
              <motion.span
                animate={{
                  y:[0,8,0]
                }}
                transition={{
                  duration:1.8,
                  repeat:Infinity,
                  ease:"easeInOut"
                }}
                className="text-2xl"
              >
                ↓
              </motion.span>
            </motion.button>
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
          </motion.main>
        )}
      </AnimatePresence>
    </>
  )
}
