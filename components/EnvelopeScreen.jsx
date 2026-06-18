'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EnvelopeScreen({ onOpen }) {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState('idle')

  useEffect(() => { setMounted(true) }, [])

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return
    setPhase('opening')
    setTimeout(() => setPhase('done'), 5000)
    setTimeout(() => onOpen(), 5600)
  }, [phase, onOpen])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(3px)' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none bg-gradient-to-b from-[#6FA3BD] via-[#4C87A8] to-[#2F668C]"
        >
          {/* Burbujas del sobre */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-white/20 bg-white/10"
                style={{
                  width: `${25 + (i % 5) * 12}px`,
                  height: `${25 + (i % 5) * 12}px`,
                  left: `${(i * 13) % 100}%`,
                }}
                animate={{ y: ['100vh', '-20vh'], opacity: [0, 0.6, 0] }}
                transition={{ duration: 18 + (i % 5) * 3, repeat: Infinity, delay: i * 0.8, ease: 'linear' }}
              />
            ))}
          </div>

          {/* Ondas de agua */}
          <div className="absolute inset-0 pointer-events-none">
            {[1, 2, 3].map((wave) => (
              <motion.div
                key={wave}
                className="absolute left-1/2 w-[160%] h-40 rounded-[50%] bg-[#FFE29A]/10 blur-3xl"
                style={{ top: `${wave * 25}%` }}
                animate={{ x: ['-8%', '8%', '-8%'] }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: wave }}
              />
            ))}
          </div>

          {/* Brillo ambiental */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-[#BFE8FF]/20 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Partículas doradas */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#FFE29A] shadow-[0_0_12px_#FFE29A]"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                animate={{ y: [0, -40, 0], opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
                transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>

          <motion.div
            onClick={handleOpen}
            animate={{ scale: phase !== 'idle' ? 0.95 : 1 }}
            className="relative w-[clamp(300px,82vw,430px)] h-[clamp(195px,52vw,280px)] cursor-pointer rounded-2xl bg-[#d6e5e8] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,.6)] animate-goldGlow z-20"
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full origin-top z-[5]"
                style={{
                  height: '48%',
                  background: '#b8ced8',
                  clipPath: 'polygon(0 0, 50% 85%, 100% 0)',
                }}
                animate={phase !== 'idle' ? { rotateX: -170 } : { rotateX: 0 }}
                transition={{ duration: 1.7 }}
              />
            </div>

            <AnimatePresence>
              {phase !== 'idle' && (
                <motion.div
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -80, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[clamp(250px,69vw,360px)] h-[clamp(175px,48vw,240px)] bg-[#fff5df] rounded-lg shadow-xl p-[clamp(22px,6vw,32px)] text-center z-30 flex flex-col items-center justify-center"
                >
                  <h3 className="font-serif font-bold text-[clamp(20px,5.5vw,28px)] text-[#4b3527] mb-[clamp(6px,2vw,10px)]">
                    ¡Bienvenidos!
                  </h3>
                  <p className="text-[clamp(10px,2.8vw,13px)] text-[#765d4b] leading-relaxed max-w-[96%]">
                    Los espero en mi Pool Side para celebrar juntos este día tan especial. Su presencia hará de este momento un recuerdo inolvidable.
                  </p>
                  <hr className="w-[30%] border-none h-[1px] bg-[rgba(180,160,130,0.3)] my-[clamp(8px,2vw,14px)]" />
                  <span className="font-serif font-bold text-[clamp(16px,4.5vw,22px)] text-[#4b3527]">Hallie Aes</span>
                  <span className="text-[clamp(12px,3vw,15px)] text-[#765d4b] mt-[2px]">XV Años</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {phase === 'idle' && (
            <>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpen}
                className="mt-8 z-40 px-8 py-3 rounded-full bg-[#D4AF37] text-white font-medium shadow-lg text-sm uppercase tracking-[0.2em]"
              >
                Abrir Invitación
              </motion.button>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-8 text-[10px] tracking-[0.4em] uppercase text-white/50"
              >
                Presiona para abrir
              </motion.p>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
