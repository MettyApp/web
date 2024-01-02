'use client'

export default function contentfulImageLoader({ src, width, quality }) {
  if (src.startsWith('https://images.ctfassets.net')) {
    return `${src}?w=${width}&q=${quality || 75}&fm=avif&fit=pad`
  }
  return src;
}