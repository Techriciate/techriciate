import { Scramble } from '@/components/scramble'

function bare(word: string) {
  return word.replace(/[^\p{L}]/gu, '').toLowerCase()
}

/** Splits a headline into masked word spans and draws a hand-made underline under one keyword. */
export function MaskedWords({ text, underline }: { text: string; underline?: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span className="line" key={`${word}-${i}`} style={{ '--i': i } as React.CSSProperties}>
          <span className={underline && bare(word) === bare(underline) ? 'word has-ul' : 'word'}>
            {word}
            {underline && bare(word) === bare(underline) ? (
              <svg className="ul" viewBox="0 0 120 12" preserveAspectRatio="none" aria-hidden="true">
                <path d="M2 8C22 3 44 10 66 5S104 2 118 6" pathLength={1} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
              </svg>
            ) : null}
          </span>
        </span>
      ))}
    </>
  )
}

export function SectionHeading({
  kicker,
  title,
  intro,
  underline,
}: {
  kicker: string
  title: string
  intro?: string
  underline?: string
}) {
  return (
    <header className="section-heading" data-reveal>
      <Scramble className="kicker" text={kicker} />
      <h2 className="masked">
        <MaskedWords text={title} underline={underline} />
      </h2>
      {intro ? <p className="section-intro">{intro}</p> : null}
    </header>
  )
}
