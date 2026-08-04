/**
 * Generated concept covers — pure CSS/SVG, never a fake screenshot.
 * Each cover carries the project's own identity and states its verbatim status.
 */
type Variant = 'thumb' | 'card' | 'hero'

function Inner({ slug }: { slug: string }) {
  if (slug === 'bloom-blossom')
    return (
      <div className="cv-bloom">
        <p className="cv-word">Bloom</p>
        <div className="cv-cards">
          <span />
          <span />
          <span />
        </div>
        <div className="cv-dots">
          {Array.from({ length: 6 }).map((_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
    )
  if (slug === 'perfect-buy-factory-outlet')
    return (
      <div className="cv-buy">
        <p className="cv-word">PERFECT BUY</p>
        <div className="cv-tags">
          <span>-40%</span>
          <span>-60%</span>
          <span>MRP</span>
        </div>
        <div className="cv-barcode">
          {Array.from({ length: 26 }).map((_, i) => (
            <i key={i} style={{ '--w': (i % 4) + 1 } as React.CSSProperties} />
          ))}
        </div>
      </div>
    )
  if (slug === 'alkesh-dinesh-mody-institute')
    return (
      <div className="cv-inst">
        <div className="cv-crest">
          <span>A</span>
        </div>
        <div className="cv-lines">
          <i />
          <i />
          <i />
        </div>
      </div>
    )
  return (
    <div className="cv-thread">
      <p className="cv-outline">TC</p>
      <div className="cv-drops">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  )
}

export function WorkCover({
  slug,
  name,
  status,
  variant = 'card',
}: {
  slug: string
  name: string
  status: string
  variant?: Variant
}) {
  const caption = `Concept preview: ${status}`
  return (
    <figure className={`cover cover-${variant}`} data-slug={slug} aria-label={`${name}: concept preview`}>
      <div className="cover-frame">
        {variant === 'thumb' ? null : (
          <div className="cover-bar">
            <span />
            <span />
            <span />
            <em>concept preview</em>
          </div>
        )}
        <div className="cover-body">
          <Inner slug={slug} />
        </div>
        <span className="tick tl" />
        <span className="tick br" />
      </div>
      {variant === 'thumb' ? null : <figcaption>{caption}</figcaption>}
    </figure>
  )
}
