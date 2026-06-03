import { createClient } from '@supabase/supabase-js'
import siteData from '@/data/site.json'
import HomeClient from '@/components/HomeClient'

export const dynamic = 'force-dynamic'

async function getProjects() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('display_order')
  return data || []
}

export default async function Home() {
  const projects = await getProjects()
  return <HomeClient works={projects} site={siteData} />
}
