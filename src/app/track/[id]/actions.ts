'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function postUpdate(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const projectId = formData.get('project_id') as string
  const content = formData.get('content') as string
  
  await supabase.from('tracking_updates').insert({
    project_id: projectId,
    user_id: user.id,
    content
  })
  
  revalidatePath(`/track/${projectId}`)
}
