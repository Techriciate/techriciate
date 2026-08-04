/**
 * Techriciate mark: two solid code brackets with a growth arrow rising between them.
 * Drawn as filled geometry on a 220x200 grid so it stays crisp from 16px to full-bleed.
 */
const BRACKET_LEFT = 'M72 46 L18 100 L72 154 L88 138 L50 100 L88 62 Z'
const BRACKET_RIGHT = 'M168 46 L222 100 L168 154 L152 138 L190 100 L152 62 Z'
const ARROW = 'M109 172 L109 78 L100 78 L120 30 L140 78 L131 78 L131 172 Z'

export const MARK_SHAPES = [BRACKET_LEFT, BRACKET_RIGHT, ARROW] as const

export function MarkSvg({
  className,
  draw = false,
  gradient = false,
  label,
}: {
  className?: string
  draw?: boolean
  gradient?: boolean
  label?: string
}) {
  const id = gradient ? 'mark-grad' : undefined

  return (
    <svg
      className={className}
      viewBox="0 0 240 200"
      fill={id ? `url(#${id})` : 'currentColor'}
      role={label ? 'img' : 'presentation'}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {id ? (
        <defs>
          <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#0B2239" />
            <stop offset="55%" stopColor="#2E7CA3" />
            <stop offset="100%" stopColor="#7FD4E8" />
          </linearGradient>
        </defs>
      ) : null}

      <g className={draw ? 'mark-rise' : undefined}>
        <path d={BRACKET_LEFT} />
        <path d={BRACKET_RIGHT} />
      </g>
      <path d={ARROW} className={draw ? 'mark-arrow-in' : undefined} />
    </svg>
  )
}
