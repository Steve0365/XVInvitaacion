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
    setTimeout(() => setPhase('done'), 3800)
    setTimeout(() => onOpen(), 4500)
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
            className="relative w-[340px] h-[230px] cursor-pointer"
            onClick={handleOpen}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-0 rounded-xl overflow-hidden bg-[#163b5f] border border-[#E7D59B]"
              animate={{
                boxShadow: [
                  "0 0 15px rgba(231,213,155,.3)",
                  "0 0 45px rgba(231,213,155,.9)",
                  "0 0 15px rgba(231,213,155,.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-full border-b border-[#E7D59B]/70 rotate-[34deg] origin-bottom-left" />
                <div className="absolute bottom-0 right-0 w-full h-full border-b border-[#E7D59B]/70 rotate-[-34deg] origin-bottom-right" />
                <div className="absolute top-1/2 left-0 w-full border-t border-[#E7D59B]/40" />
              </div>

              <motion.div
                className="absolute top-0 left-0 w-full h-[55%] bg-[#214d73] origin-top border-b border-[#E7D59B]/60"
                animate={phase !== 'idle' ? { rotateX: -170, opacity: .2 } : { rotateX: 0 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />

              {phase === 'idle' && (
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[#F4E3A1] to-[#B88A35] flex items-center justify-center text-[#123B63] text-4xl font-serif border-4 border-[#FFF2B8]"
                  animate={{ scale: [1, 1.08, 1], rotate: [0, 3, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  H
                </motion.div>
              )}
            </motion.div>

            {phase !== 'idle' && (
              <motion.div
                initial={{ y: '105%' }}
                animate={{ y: ['105%', '105%', '2%'] }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  position: 'absolute', top: '2%', left: '4%', right: '4%', bottom: '2%', zIndex: 1,
                }}
              >
                <div style={{
                  width: '100%', height: '100%', borderRadius: '3px',
                  background: 'linear-gradient(160deg, #fcf9f2 0%, #f5f0e6 30%, #f0e8d8 60%, #f5efe5 100%)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: 'clamp(14px, 4vw, 28px)',
                }}>
                  <div style={{
                    position: 'absolute', top: 10, left: 10, right: 10, bottom: 10,
                    border: '1px solid rgba(180, 160, 130, 0.1)', borderRadius: '2px', pointerEvents: 'none',
                  }} />
                  <h3 className="font-display font-bold text-center"
                    style={{ fontSize: 'clamp(16px, 5vw, 24px)', color: '#2c1810', marginBottom: 'clamp(3px, 1.5vw, 6px)' }}>
                    ¡Bienvenidos!
                  </h3>
                  <p className="text-center leading-relaxed"
                    style={{ fontSize: 'clamp(10px, 3vw, 13px)', color: '#7a5a44', maxWidth: '92%', fontWeight: 300, lineHeight: 1.6 }}>
                     Los espero en mi Pool Side para celebrar juntos este día tan especial. Su presencia hará de este momento un recuerdo inolvidable.
                  </p>
                  <div style={{ width: '30%', height: 1, background: 'rgba(180, 160, 130, 0.3)', margin: 'clamp(8px, 3vw, 16px) 0' }} />
                  <p className="font-display font-bold" style={{ fontSize: 'clamp(14px, 4.5vw, 20px)', color: '#2c1810' }}>
                    Hallie Aes
                  </p>
                  <p className="font-script" style={{ fontSize: 'clamp(12px, 3.5vw, 16px)', color: '#7a5a44', marginTop: 1 }}>
                    XV Años
                  </p>
                </div>
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
