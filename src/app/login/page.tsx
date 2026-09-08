import { login, signup } from './actions'

export default async function LoginPage(props: {
  searchParams: Promise<{ message: string }>;
}) {
  const params = await props.searchParams;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 bg-bauhaus-gray">
      <div className="border-4 border-bauhaus-black bg-white p-12 max-w-md w-full shadow-[8px_8px_0_rgba(17,17,17,1)] relative">
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-bauhaus-red rounded-full border-4 border-bauhaus-black"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-bauhaus-blue border-4 border-bauhaus-black"></div>

        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-8 text-center">Enter the Vault</h1>
        
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase tracking-wide text-sm" htmlFor="email">Email</label>
            <input 
              id="email"
              name="email"
              type="email" 
              placeholder="you@example.com"
              required 
              className="border-2 border-bauhaus-black p-3 font-medium focus:outline-none focus:border-bauhaus-blue focus:bg-bauhaus-gray/20 transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase tracking-wide text-sm" htmlFor="password">Password</label>
            <input 
              id="password"
              name="password"
              type="password" 
              placeholder="••••••••"
              required 
              className="border-2 border-bauhaus-black p-3 font-medium focus:outline-none focus:border-bauhaus-blue focus:bg-bauhaus-gray/20 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <button formAction={login} className="bg-bauhaus-black text-white font-bold uppercase tracking-wide px-8 py-4 border-2 border-bauhaus-black hover:bg-bauhaus-blue transition-colors">
              Log In
            </button>
            <button formAction={signup} className="bg-white text-bauhaus-black font-bold uppercase tracking-wide px-8 py-4 border-2 border-bauhaus-black hover:bg-bauhaus-yellow transition-colors">
              Sign Up
            </button>
          </div>

          {params?.message && (
            <p className="mt-4 p-4 bg-bauhaus-red/10 border-2 border-bauhaus-red text-bauhaus-red text-center font-bold text-sm">
              {params.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
