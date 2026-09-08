'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function upgradeToStartup() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('profiles').update({ is_startup: true }).eq('id', user.id)
  revalidatePath('/profile')
}

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  
  await supabase.from('user_projects').insert({
    user_id: user.id,
    title,
    description
  })
  
  revalidatePath('/profile')
}

export async function createStartup(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Check if they are actually a startup
  const { data: profile } = await supabase.from('profiles').select('is_startup').eq('id', user.id).single()
  if (!profile?.is_startup) return

  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const domain = formData.get('domain') as string
  const url = formData.get('url') as string
  
  await supabase.from('startups').insert({
    name,
    description,
    domain,
    url
  })
  
  revalidatePath('/')
}
