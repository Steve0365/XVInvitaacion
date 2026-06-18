'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bubbles = [
  { x: '10%', y: '80%', size: 70, delay: 0 },
  { x: '25%', y: '60%', size: 40, delay: 1 },
  { x: '45%', y: '75%', size: 90, delay: 2 },
  { x: '70%', y: '40%', size: 55, delay: 0.5 },
  { x: '85%', y: '70%', size: 80, delay: 1.5 },
  { x: '60%', y: '20%', size: 35, delay: 2.5 },
  { x: '15%', y: '30%', size: 45, delay: 3 },
]

const goldenParticles = Array.from({ length: 18 })

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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none bg-gradient-to-b from-[#7bb7d9] via-[#4f91b7] to-[#245477]"
        >
          {/* Burbujas */}
          <div className="absolute inset-0 pointer-events-none">
            {bubbles.map((b, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
                style={{ width: b.size, height: b.size, left: b.x, top: b.y }}
                animate={{ y: [0, -120, 0], opacity: [0.15, 0.5, 0.15], scale: [1, 1.15, 1] }}
                transition={{ duration: 8, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>

          {/* Onda tipo agua */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-40 bg-white/10 rounded-[50%] blur-3xl pointer-events-none"
            animate={{ x: ['-10%', '10%', '-10%'] }}
            transition={{ duration: 12, repeat: Infinity }}
          />

          {/* Partículas doradas */}
          <div className="absolute inset-0 pointer-events-none">
            {goldenParticles.map((_, i) => (
              <motion.span
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#f5d77a] shadow-[0_0_15px_#f5d77a]"
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.8, 0.5], y: [0, -80] }}
                transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: i }}
              />
            ))}
          </div>

          {/* Sobre */}
          <motion.div
            className="relative z-20"
            onClick={handleOpen}
          >
            {/* Borde dorado luminoso */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-[#f6dc7b] pointer-events-none"
              animate={{ opacity: [0.4, 1, 0.4], boxShadow: ['0 0 10px #f6dc7b', '0 0 35px #f6dc7b', '0 0 10px #f6dc7b'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.div
              className="relative w-[clamp(300px,75vw,390px)] h-[clamp(195px,48vw,250px)] rounded-3xl bg-[#d5edf5]/70 backdrop-blur-xl border border-white/40 shadow-[0_25px_70px_rgba(0,0,0,0.25)] overflow-hidden cursor-pointer"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
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

              <AnimatePresence>
                {phase !== 'idle' && (
                  <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -80, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[clamp(250px,69vw,330px)] h-[clamp(175px,48vw,220px)] bg-[#fff5df] rounded-lg shadow-xl p-[clamp(22px,6vw,32px)] text-center z-30 flex flex-col items-center justify-center"
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
          </motion.div>

          {phase === 'idle' && (
            <>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.18)' }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="mt-10 z-40 px-10 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-white tracking-[4px] shadow-lg text-sm uppercase"
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
