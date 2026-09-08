import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { upgradeToStartup, createProject, createStartup } from './actions'
import Link from 'next/link'

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: projects } = await supabase.from('user_projects').select('*').eq('user_id', user.id).order('created_at', { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-bauhaus-black pb-4">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-tighter">Your Dashboard</h1>
          <p className="font-medium text-bauhaus-black/70 mt-2">{user.email}</p>
        </div>
        {!profile?.is_startup && (
          <form action={upgradeToStartup} className="mt-4 md:mt-0">
            <button className="bg-bauhaus-yellow font-bold uppercase tracking-wide px-6 py-2 border-2 border-bauhaus-black hover:bg-bauhaus-black hover:text-white transition-colors">
              Become a Startup Profile
            </button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Project Section */}
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-tighter mb-6 bg-bauhaus-blue text-white inline-block px-4 py-1 border-2 border-bauhaus-black">
            Your Projects
          </h2>
          
          <div className="border-4 border-bauhaus-black bg-white p-6 shadow-[8px_8px_0_rgba(17,17,17,1)] mb-8">
            <h3 className="font-bold uppercase tracking-wide mb-4">Start a New Project</h3>
            <form action={createProject} className="flex flex-col gap-4">
              <input type="text" name="title" placeholder="Project Title" required className="border-2 border-bauhaus-black p-2 font-medium" />
              <textarea name="description" placeholder="Short description..." required className="border-2 border-bauhaus-black p-2 font-medium min-h-[100px]" />
              <button className="bg-bauhaus-black text-white font-bold uppercase px-4 py-2 border-2 border-bauhaus-black hover:bg-bauhaus-blue transition-colors">Create Project</button>
            </form>
          </div>

          <div className="flex flex-col gap-4">
            {projects?.map(project => (
              <div key={project.id} className="border-2 border-bauhaus-black p-4 bg-bauhaus-gray flex justify-between items-center">
                <div>
                  <h4 className="font-bold uppercase">{project.title}</h4>
                  <p className="text-sm text-bauhaus-black/70">{new Date(project.created_at).toLocaleDateString()}</p>
                </div>
                <Link href={`/track/${project.id}`} className="bg-white border-2 border-bauhaus-black px-4 py-1 font-bold uppercase text-xs hover:bg-bauhaus-yellow transition-colors">
                  View Tracker
                </Link>
              </div>
            ))}
            {projects?.length === 0 && <p className="font-medium text-bauhaus-black/60">You haven't started any projects yet.</p>}
          </div>
        </div>

        {/* Startup Section */}
        {profile?.is_startup && (
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tighter mb-6 bg-bauhaus-red text-white inline-block px-4 py-1 border-2 border-bauhaus-black">
              Startup Tools
            </h2>
            
            <div className="border-4 border-bauhaus-black bg-white p-6 shadow-[8px_8px_0_rgba(17,17,17,1)]">
              <h3 className="font-bold uppercase tracking-wide mb-4">Launch a Startup</h3>
              <form action={createStartup} className="flex flex-col gap-4">
                <input type="text" name="name" placeholder="Startup Name" required className="border-2 border-bauhaus-black p-2 font-medium" />
                <input type="text" name="domain" placeholder="Domain (e.g., AI, FinTech)" required className="border-2 border-bauhaus-black p-2 font-medium" />
                <input type="url" name="url" placeholder="Website URL" className="border-2 border-bauhaus-black p-2 font-medium" />
                <textarea name="description" placeholder="Detailed description..." required className="border-2 border-bauhaus-black p-2 font-medium min-h-[100px]" />
                <button className="bg-bauhaus-red text-white font-bold uppercase px-4 py-2 border-2 border-bauhaus-black hover:bg-bauhaus-black transition-colors">Submit to Feed</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
