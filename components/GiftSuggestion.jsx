'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function GiftSuggestion() {
  const [open, setOpen] = useState(false)

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center px-6 py-20">

      <motion.div
        initial={{ opacity: 0, y: 80, scale: .9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative max-w-md w-full rounded-3xl bg-white/10 backdrop-blur-xl border border-[#f6dc7b]/40 shadow-[0_0_40px_rgba(246,220,123,.25)] p-8 text-center overflow-hidden"
      >

        <motion.div
          className="absolute inset-0 rounded-3xl border border-[#f6dc7b] pointer-events-none"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <div className="relative z-10">

          <div className="text-5xl mb-5">🎁</div>

          <h2 className="text-3xl font-serif text-white mb-5">
            Sugerencia de regalo
          </h2>

          <p className="text-white/80 leading-relaxed">
            Tu presencia es el regalo más especial para mí.
          </p>

          <p className="mt-4 text-white/80 leading-relaxed">
            Si deseas tener un detalle conmigo,
            una lluvia de sobres será una bonita
            forma de acompañarme en esta nueva etapa.
          </p>

          <motion.button
            onClick={() => setOpen(!open)}
            animate={{
              scale: [1, 1.08, 1],
              boxShadow: [
                "0 0 10px rgba(246,220,123,.3)",
                "0 0 25px rgba(246,220,123,.8)",
                "0 0 10px rgba(246,220,123,.3)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            whileHover={{ scale: 1.15 }}
            className="mt-7 w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl border border-[#f6dc7b]/70 text-[#f6dc7b] flex items-center justify-center mx-auto text-sm"
          >
            {open ? "×" : "?"}
          </motion.button>

          <p className="text-xs text-white/50 mt-2">¿Qué significa?</p>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: .5 }}
                className="mt-6 border-t border-white/20 pt-5 text-white/75 text-sm leading-relaxed overflow-hidden"
              >
                ✨ Una lluvia de sobres es una tradición
                donde los invitados entregan un sobre
                con un detalle económico para la persona
                festejada, como una forma de acompañarla
                en esta nueva etapa.
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </motion.div>

    </section>
  )
}
