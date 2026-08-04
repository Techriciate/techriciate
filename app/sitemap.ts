import type { MetadataRoute } from 'next'
import { workStudies } from '@/content/work'
export default function sitemap():MetadataRoute.Sitemap{const base='https://www.techriciate.com';return [{url:base},{url:`${base}/privacy`},{url:`${base}/terms`},...workStudies.map(({slug})=>({url:`${base}/work/${slug}`}))]}
