import type { MetadataRoute } from 'next'
import { projects } from '@/content/projects'
export default function sitemap():MetadataRoute.Sitemap{const base='https://www.techriciate.com';return [{url:base},{url:`${base}/privacy`},{url:`${base}/terms`},...projects.map(({slug})=>({url:`${base}/work/${slug}`}))]}
