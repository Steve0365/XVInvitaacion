'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bubbles = [
  { size: 80, left: '10%', delay: 0 },
  { size: 45, left: '25%', delay: 1 },
  { size: 100, left: '45%', delay: 2 },
  { size: 55, left: '70%', delay: 1.5 },
  { size: 70, left: '85%', delay: 3 },
  { size: 35, left: '60%', delay: 2.5 },
]

const particles = Array.from({ length: 20 })

export default function EnvelopeScreen({ onOpen }) {
  const [mounted, setMounted] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const handleOpen = useCallback(() => {
    if (phase !== 'idle') return
    setIsOpen(true)
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
                className="absolute rounded-full border border-[#E8C75A]/40 shadow-[0_0_12px_rgba(232,199,90,0.45)] bg-transparent backdrop-blur-sm"
                style={{ width: b.size, height: b.size, left: b.left, bottom: '-10%' }}
                animate={{ y: [0, -700], opacity: [0.2, 0.65, 0] }}
                transition={{ duration: 10, delay: b.delay, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>

          {/* Partículas doradas */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-[#f6dc7b] shadow-[0_0_18px_#f6dc7b]"
                style={{
                  width: i % 2 === 0 ? 5 : 3,
                  height: i % 2 === 0 ? 5 : 3,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 0.5], y: [0, -100] }}
                transition={{ duration: 4 + i, repeat: Infinity, delay: i / 2 }}
              />
            ))}
          </div>

          {/* Onda de agua */}
          <motion.div
            className="absolute bottom-0 left-[-20%] w-[140%] h-48 rounded-[50%] bg-white/10 blur-3xl pointer-events-none"
            animate={{ x: ['-5%', '5%', '-5%'] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Sobre */}
          <div className="relative w-[420px] h-[260px]">
            <motion.div
              className="absolute inset-0 rounded-3xl border-2 border-[#f6dc7b] pointer-events-none"
              animate={{ opacity: [0.4, 1, 0.4], boxShadow: ['0 0 10px #f6dc7b', '0 0 35px #f6dc7b', '0 0 10px #f6dc7b'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <motion.div
              className="relative w-full h-full rounded-3xl bg-[#b9d9e8] border border-white/30 shadow-[0_0_35px_rgba(255,215,80,0.35)] cursor-pointer z-10"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
              onClick={() => handleOpen()}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-[130px] origin-top z-40"
                style={{ background: '#a9ccdc', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                animate={isOpen ? { rotateX: -180, y: -20 } : { rotateX: 0, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity:0, x:0, y:0, scale:0.85 }}
              animate={
isOpen
?
{
 opacity:1,
 x:0,
 y:-280,
 scale:1
}
:
{
 opacity:0,
 x:0,
 y:0,
 scale:0.85
}
}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className={`
absolute
left-1/2
top-[80%]
-translate-x-1/2
-translate-y-1/2
${isOpen ? 'z-30 pointer-events-auto' : 'z-0 pointer-events-none'}
`}
            >
              <div className="bg-[#fff8eb] rounded-xl shadow-xl w-[340px] max-w-[90%] p-[clamp(24px,6vw,40px)] min-h-[clamp(200px,50vw,430px)] flex flex-col items-center justify-center text-center">
                <h3 className="font-serif font-bold text-[clamp(20px,5.5vw,30px)] text-[#4b3527] mb-[clamp(8px,2vw,12px)]">
                  ¡Bienvenidos!
                </h3>
                <p className="text-[clamp(11px,2.8vw,14px)] text-[#765d4b] leading-relaxed max-w-[94%]">
                  Los espero en mi Pool Side para celebrar juntos este día tan especial. Su presencia hará de este momento un recuerdo inolvidable.
                </p>
                <hr className="w-[30%] border-none h-[1px] bg-[rgba(180,160,130,0.3)] my-[clamp(10px,2vw,16px)]" />
                <span className="font-serif font-bold text-[clamp(18px,4.5vw,24px)] text-[#4b3527]">Hallie Aes</span>
                <span className="text-[clamp(13px,3vw,16px)] text-[#765d4b] mt-[2px]">XV Años</span>
              </div>
            </motion.div>
          </div>

          {phase === 'idle' && (
            <>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.18)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOpen()}
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
