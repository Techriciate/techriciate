'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/content/projects'

export function ProjectRelated({ related }: { related: Project[] }) {
  return (
    <div className="related">
      {related.map((item) => (
        <Link href={`/work/${item.slug}`} key={item.slug} className="group">
          {item.title}
          <motion.span
            className="inline-block ml-4"
            whileHover={{ x: 4, y: -4 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <ArrowUpRight />
          </motion.span>
        </Link>
      ))}
    </div>
  )
}
