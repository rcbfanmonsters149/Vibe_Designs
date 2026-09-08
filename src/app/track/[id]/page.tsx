import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { postUpdate } from './actions'

export default async function TrackProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: project } = await supabase.from('user_projects').select('*').eq('id', id).single()
  
  if (!project) {
    notFound()
  }

  const { data: updates } = await supabase.from('tracking_updates').select('*').eq('project_id', project.id).order('created_at', { ascending: false })

  const isOwner = user?.id === project.user_id

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="border-b-4 border-bauhaus-black pb-8 mb-12 text-center">
        <span className="text-xs font-bold uppercase tracking-widest bg-bauhaus-yellow px-4 py-1 border-2 border-bauhaus-black mb-4 inline-block">Project Tracker</span>
        <h1 className="text-5xl font-bold uppercase tracking-tighter mb-4">{project.title}</h1>
        <p className="font-medium text-lg text-bauhaus-black/80">{project.description}</p>
      </div>

      {isOwner && (
        <div className="border-4 border-bauhaus-black bg-bauhaus-gray p-6 mb-12 shadow-[8px_8px_0_rgba(17,17,17,1)]">
          <h2 className="font-bold uppercase tracking-wide mb-4 text-xl">Post a Progress Update</h2>
          <form action={postUpdate} className="flex flex-col gap-4">
            <input type="hidden" name="project_id" value={project.id} />
            <textarea name="content" placeholder="What did you build today? Share links, code snippets, or thoughts..." required className="border-2 border-bauhaus-black p-4 font-medium min-h-[120px]" />
            <button className="bg-bauhaus-blue text-white font-bold uppercase px-6 py-3 border-2 border-bauhaus-black hover:bg-bauhaus-black transition-colors self-end">Post Update</button>
          </form>
        </div>
      )}

      <div>
        <h3 className="font-bold uppercase tracking-widest border-b-2 border-bauhaus-black pb-2 mb-8">Timeline</h3>
        
        <div className="flex flex-col gap-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-bauhaus-black">
          {updates?.map(update => (
            <div key={update.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-bauhaus-black bg-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[4px_4px_0_rgba(17,17,17,1)] z-10">
                <div className="w-3 h-3 bg-bauhaus-red rounded-full"></div>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] border-4 border-bauhaus-black p-6 bg-white shadow-[6px_6px_0_rgba(17,17,17,1)] ml-4 md:ml-0 hover:-translate-y-1 transition-transform">
                <span className="text-xs font-bold uppercase text-bauhaus-black/50 block mb-2">{new Date(update.created_at).toLocaleDateString()}</span>
                <p className="font-medium whitespace-pre-wrap">{update.content}</p>
              </div>
            </div>
          ))}
          {updates?.length === 0 && (
            <div className="relative pl-14 md:text-center md:pl-0 z-10">
              <p className="font-bold text-bauhaus-black/60 uppercase bg-white inline-block px-4 py-2 border-2 border-bauhaus-black">No updates yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
