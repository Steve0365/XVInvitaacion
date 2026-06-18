'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function DynamicBackground() {
  const { scrollYProgress } = useScroll()

  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#8CCFE8', '#5FA9C9', '#347BA4', '#123E67', '#062747']
  )

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{ background }}
    />
  )
}
