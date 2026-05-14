import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content/work')

export interface WorkMeta {
  title: string
  subtitle: string
  slug: string
  order: number
  tags: string[]
  isNew: boolean
  year: string
  role: string
  duration: string
  team: string
  visual: string
  heroColor: string
  summary: string
  outcome: string
}

export interface WorkPost extends WorkMeta {
  content: string
}

export function getAllWork(): WorkMeta[] {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.mdx'))
  
  const posts = files.map(filename => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), 'utf-8')
    const { data } = matter(raw)
    return data as WorkMeta
  })

  return posts.sort((a, b) => a.order - b.order)
}

export function getWorkBySlug(slug: string): WorkPost | null {
  const filepath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filepath)) return null

  const raw = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    ...(data as WorkMeta),
    content,
  }
}
