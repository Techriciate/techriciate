/** Hairline glyphs, one per discipline. Drawn here so no icon set is faked. */
const GLYPHS: Record<string, string[]> = {
  'Web Development': ['M6 10h36v28H6z', 'M6 18h36', 'M13 26h12M13 32h20'],
  'E-Commerce': ['M9 13h6l4 20h20l4-14H17', 'M20 41a2 2 0 100-4 2 2 0 000 4z', 'M34 41a2 2 0 100-4 2 2 0 000 4z'],
  'Landing Pages': ['M10 8h28v34H10z', 'M16 16h16M16 23h16M16 30h9', 'M24 42v4'],
  'Professional Portfolios': ['M7 12h16v16H7zM25 12h16v9H25zM25 25h16v16H25zM7 32h16v9H7z'],
  'AI & Automation': ['M24 8v9M24 31v9M8 24h9M31 24h9', 'M24 30a6 6 0 100-12 6 6 0 000 12z', 'M13 13l6 6M35 13l-6 6M13 35l6-6M35 35l-6-6'],
  'Business Solutions': ['M8 40V22M18 40V12M28 40V27M38 40V17', 'M6 44h36'],
}

export function ServiceGlyph({ title, className }: { title: string; className?: string }) {
  const paths = GLYPHS[title]
  if (!paths) return null
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
