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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{
            background: 'linear-gradient(170deg, #123B63 0%, #1B4E7A 25%, #2D6F9E 45%, #1B4E7A 65%, #123B63 85%, #123B63 100%)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-0 left-1/4 w-72 h-[900px] blur-3xl rotate-12"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            />
            <div
              className="absolute top-0 right-1/4 w-72 h-[900px] blur-3xl -rotate-12"
              style={{ background: 'rgba(248,216,106,0.08)' }}
            />
            <div
              className="absolute top-0 left-1/3 w-96 h-[1000px] blur-3xl"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            />
            <div
              className="absolute left-1/2 -translate-x-1/2 top-[10%] w-[700px] h-[700px] rounded-full blur-[120px]"
              style={{ background: 'rgba(31,107,163,0.15)' }}
            />
            <motion.div
              animate={{ opacity: [0.04, 0.09, 0.04] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(41,141,148,0.25), transparent 70%)', filter: 'blur(60px)' }}
            />
            <motion.div
              animate={{ opacity: [0.03, 0.07, 0.03] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(41,141,148,0.2), transparent 70%)', filter: 'blur(80px)' }}
            />
            <motion.div
              animate={{ opacity: [0.02, 0.06, 0.02] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 left-1/2 w-[200px] h-[200px] rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(242,216,141,0.1), transparent 60%)', filter: 'blur(50px)' }}
            />
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${6 + Math.random() * 10}px`,
                  height: `${6 + Math.random() * 10}px`,
                  left: `${Math.random() * 100}%`,
                  background: 'radial-gradient(circle, rgba(248,216,106,.9), rgba(248,216,106,0))',
                  filter: 'blur(2px)',
                }}
                initial={{ y: '110vh', opacity: 0 }}
                animate={{ y: '-20vh', opacity: [0, 0.6, 0] }}
                transition={{ duration: 12 + Math.random() * 8, repeat: Infinity, delay: Math.random() * 10 }}
              />
            ))}
            <motion.div
              className="absolute left-[18%] top-[25%] w-20 h-20 rounded-full"
              style={{ border: '1px solid rgba(248,216,106,.25)', backdropFilter: 'blur(4px)' }}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 7, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-[18%] top-[20%] w-14 h-14 rounded-full"
              style={{ border: '1px solid rgba(248,216,106,.25)' }}
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
              className="absolute right-[22%] bottom-[20%] w-10 h-10 rounded-full"
              style={{ border: '1px solid rgba(248,216,106,.3)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>

          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{
              width: '650px', height: '650px',
              transform: 'translate(-50%, -50%)',
              borderRadius: '9999px',
              background: 'radial-gradient(circle, rgba(31,107,163,.22), transparent 70%)',
              filter: 'blur(90px)',
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="relative cursor-pointer"
            style={{ width: 'clamp(300px, 82vw, 420px)', height: 'clamp(195px, 52vw, 270px)' }}
            onClick={handleOpen}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="absolute inset-0 rounded-[18px]"
              style={{
                border: '2px solid #e8c875',
                animation: 'goldGlow 2s infinite',
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-[18px] overflow-hidden bg-[#163b5c]"
              animate={phase !== 'idle' ? { scale: 1.08 } : { scale: 1 }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full origin-top z-[4]"
                style={{
                  height: '48%',
                  background: '#204d72',
                  clipPath: 'polygon(0 0, 50% 85%, 100% 0)',
                }}
                animate={phase !== 'idle' ? { rotateX: -180, opacity: 0 } : { rotateX: 0 }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
              />

              {phase === 'idle' && (
                <motion.div
                  className="absolute z-[6] flex items-center justify-center"
                  style={{
                    left: '50%', top: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 'clamp(64px, 18vw, 90px)',
                    height: 'clamp(64px, 18vw, 90px)',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fff0a8, #c99b3c)',
                    boxShadow: '0 0 20px #e8c875',
                    fontFamily: 'serif',
                    fontSize: 'clamp(28px, 8vw, 40px)',
                    color: '#173653',
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  H
                </motion.div>
              )}
            </motion.div>

            {phase !== 'idle' && (
              <motion.div
                className="absolute overflow-hidden z-[2] rounded-[5px] text-center shadow-xl"
                style={{
                  width: 'clamp(255px, 70vw, 357px)',
                  height: 'clamp(200px, 50vw, 260px)',
                  left: 'clamp(22px, 6vw, 32px)',
                  top: 'clamp(22px, 6vw, 30px)',
                  background: '#fff7e8',
                  padding: 'clamp(16px, 4vw, 30px)',
                }}
                initial={{ y: 0, opacity: 0 }}
                animate={phase !== 'idle' ? { y: -180, opacity: 1 } : { y: 0, opacity: 0 }}
                transition={{ duration: 2, delay: 0.8 }}
              >
                <h3 className="font-display font-bold"
                  style={{ fontSize: 'clamp(16px, 5vw, 24px)', color: '#2c1810', marginBottom: 'clamp(6px, 2vw, 10px)' }}>
                  ¡Bienvenidos!
                </h3>
                <p className="leading-relaxed mx-auto"
                  style={{ fontSize: 'clamp(10px, 3vw, 13px)', color: '#7a5a44', maxWidth: '92%', fontWeight: 300, lineHeight: 1.6 }}>
                  Los espero en mi Pool Side para celebrar juntos este día tan especial. Su presencia hará de este momento un recuerdo inolvidable.
                </p>
                <div style={{ width: '30%', height: 1, background: 'rgba(180, 160, 130, 0.3)', margin: 'clamp(10px, 3vw, 18px) auto' }} />
                <p className="font-display font-bold" style={{ fontSize: 'clamp(14px, 4.5vw, 20px)', color: '#2c1810' }}>
                  Hallie Aes
                </p>
                <p className="font-script" style={{ fontSize: 'clamp(12px, 3.5vw, 16px)', color: '#7a5a44', marginTop: 2 }}>
                  XV Años
                </p>
              </motion.div>
            )}
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
                className="mt-8 px-10 py-3.5 rounded-full font-semibold text-sm uppercase tracking-[0.3em] transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(41,141,148,0.12), rgba(228,199,107,0.06))',
                  border: '1px solid rgba(41,141,148,0.2)',
                  color: 'rgba(200,235,237,0.9)',
                }}
              >
                Abrir Invitación
              </motion.button>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-8 text-[10px] tracking-[0.4em] uppercase"
                style={{ color: 'rgba(255,255,255,0.5)' }}
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
