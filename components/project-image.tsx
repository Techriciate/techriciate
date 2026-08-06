'use client'

import { useState } from 'react'
import Image from 'next/image'
import { WorkCover } from './work-cover'

interface ProjectImageProps {
  src?: string | null
  alt: string
  slug: string
  title: string
  status: string
  variant?: 'thumb' | 'card' | 'hero'
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  objectFit?: 'cover' | 'contain'
}

export function ProjectImage({
  src,
  alt,
  slug,
  title,
  status,
  variant = 'card',
  fill = false,
  className = '',
  sizes,
  priority,
  objectFit = 'cover',
  useBrowserFrame = false,
}: ProjectImageProps & { useBrowserFrame?: boolean }) {
  const [error, setError] = useState(false)

  if (!src || error) {
    return (
      <div className={`relative ${fill ? 'w-full h-full' : 'w-full aspect-[4/3]'} ${className}`}>
        <WorkCover slug={slug} name={title} status={status} variant={variant} />
      </div>
    )
  }

  const isBrowser = useBrowserFrame && src && !error

  const ImageComponent = (
    <Image
      src={src}
      alt={alt}
      fill={isBrowser ? false : fill}
      width={isBrowser ? 1920 : (fill ? undefined : 1920)}
      height={isBrowser ? 1280 : (fill ? undefined : 1280)}
      className={`transition-opacity duration-500 bg-zinc-900 ${
        isBrowser 
          ? 'absolute top-0 left-0 w-full h-auto object-top hover:scale-[1.02] transition-transform origin-top duration-700 ease-out' 
          : (fill ? (objectFit === 'cover' ? 'object-cover object-top' : 'object-contain') : 'w-full h-auto')
      } ${className}`}
      sizes={sizes}
      priority={priority}
      onError={() => setError(true)}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MDAgMzAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExMSIgLz48L3N2Zz4="
    />
  )

  if (useBrowserFrame) {
    return (
      <div className={`relative ${fill ? 'w-full h-full' : 'w-full aspect-[4/3]'} ${className}`}>
        <WorkCover slug={slug} name={title} status={status} variant={variant}>
          {ImageComponent}
        </WorkCover>
      </div>
    )
  }

  return ImageComponent
}
