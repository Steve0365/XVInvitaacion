'use client'

import { motion } from "framer-motion"

export default function GiftSuggestion() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">

      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[#f6dc7b]/40 shadow-[0_0_15px_rgba(246,220,123,.45)]"
          style={{
            width: 30 + i * 8,
            height: 30 + i * 8,
            left: `${10 + i * 12}%`,
            bottom: "-80px"
          }}
          animate={{
            y: [0, -700],
            opacity: [0, .7, 0]
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear"
          }}
        />
      ))}

      {Array.from({ length: 15 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#f6dc7b] shadow-[0_0_15px_#f6dc7b]"
          style={{
            width: i % 2 === 0 ? 4 : 3,
            height: i % 2 === 0 ? 4 : 3,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [.5, 1.5, .5],
            y: [0, -80]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i
          }}
        />
      ))}

      <motion.div
        initial={{
          opacity: 0,
          y: 80,
          scale: .9
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 1,
          ease: [0.23, 1, 0.32, 1]
        }}
        className="relative z-10 max-w-md w-full rounded-3xl bg-white/10 backdrop-blur-xl border border-[#f6dc7b]/40 shadow-[0_0_40px_rgba(246,220,123,.25)] p-8 text-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 rounded-3xl border border-[#f6dc7b]"
          animate={{
            opacity: [.3, 1, .3],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
        />

        <div className="relative z-10">
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity
            }}
            className="text-5xl mb-5"
          >
            🎁
          </motion.div>

          <h2 className="text-3xl font-serif text-white mb-5">
            Sugerencia de regalo
          </h2>

          <p className="text-white/80 leading-relaxed">
            Tu presencia es el regalo más especial para mí.
          </p>

          <p className="mt-4 text-white/80 leading-relaxed">
            Si deseas tener un detalle conmigo,
            una lluvia de sobres será una bonita forma
            de acompañarme en esta nueva etapa.
          </p>

          <div className="mt-6 text-[#f6dc7b] text-sm tracking-widest">
            ✨ Gracias por ser parte de este momento ✨
          </div>
        </div>
      </motion.div>

    </section>
  )
}
