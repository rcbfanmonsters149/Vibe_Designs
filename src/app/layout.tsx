import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Startup & Project Ideas",
  description: "Discover emerging startups and project ideas.",
};

import { createClient } from '@/utils/supabase/server'
import { signout } from '@/app/login/actions'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;
  const cookieStore = await cookies();
  const hasAuthCookie = cookieStore.getAll().some(c => c.name.includes('auth') || c.name.startsWith('sb-'));
  
  if (hasAuthCookie) {
    try {
      const supabase = await createClient();
      const result = await Promise.race([
        supabase.auth.getUser(),
        new Promise<{ data: { user: null } }>((resolve) => setTimeout(() => resolve({ data: { user: null } }), 400))
      ]);
      user = result?.data?.user || null;
    } catch (e) {
      user = null;
    }
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground selection:bg-bauhaus-yellow selection:text-bauhaus-black">
        <header className="border-b-4 border-bauhaus-black bg-white">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-bauhaus-red rounded-full border-2 border-bauhaus-black"></div>
              <div className="w-8 h-8 bg-bauhaus-blue border-2 border-bauhaus-black"></div>
              <div className="w-0 h-0 border-l-[12px] border-l-transparent border-b-[20px] border-b-bauhaus-yellow border-r-[12px] border-r-transparent mr-2 drop-shadow-[0_2px_0_rgba(17,17,17,1)]"></div>
              <span className="font-bold text-2xl tracking-tighter uppercase">IdeaVault</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 font-semibold uppercase tracking-wide text-sm">
              <Link href="/" className="hover:text-bauhaus-red transition-colors">Startups</Link>
              <Link href="/" className="hover:text-bauhaus-blue transition-colors">Ideas Vault</Link>
              <Link href="/hackathons" className="bg-bauhaus-yellow px-3 py-1 border-2 border-bauhaus-black hover:bg-bauhaus-black hover:text-white transition-colors shadow-[2px_2px_0_rgba(17,17,17,1)]">
                ⚡ Hackathons
              </Link>
              <Link href="/" className="hover:text-bauhaus-yellow transition-colors">Projects</Link>
            </nav>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/profile" className="border-2 border-bauhaus-black bg-bauhaus-blue text-white px-6 py-2 font-bold uppercase text-sm hover:bg-bauhaus-black transition-colors">
                    Dashboard
                  </Link>
                  <form action={signout}>
                    <button type="submit" className="border-2 border-bauhaus-black px-6 py-2 font-bold uppercase text-sm hover:bg-bauhaus-red hover:text-white transition-colors">
                      Log Out
                    </button>
                  </form>
                </div>
              ) : (
                <Link href="/login" className="border-2 border-bauhaus-black px-6 py-2 font-bold uppercase text-sm hover:bg-bauhaus-black hover:text-white transition-colors">
                  Log In
                </Link>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col">
          {children}
        </main>

        <footer className="border-t-4 border-bauhaus-black bg-bauhaus-gray py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <span className="font-bold text-xl tracking-tighter uppercase block mb-4">IdeaVault</span>
              <p className="text-bauhaus-black/70 max-w-sm font-medium">
                The premier platform for discovering emerging startups, brainstorming new ideas, and building side projects.
              </p>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4 border-b-2 border-bauhaus-black inline-block">Explore</h4>
              <ul className="space-y-2 font-medium">
                <li><Link href="/hackathons" className="text-bauhaus-red font-bold hover:underline">⚡ Hackathons Hub</Link></li>
                <li><a href="#" className="hover:text-bauhaus-red">Trending Startups</a></li>
                <li><a href="#" className="hover:text-bauhaus-blue">Project Hub</a></li>
                <li><a href="#" className="hover:text-bauhaus-yellow">Community Feed</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase mb-4 border-b-2 border-bauhaus-black inline-block">Connect</h4>
              <ul className="space-y-2 font-medium">
                <li><a href="#" className="hover:text-bauhaus-red">Twitter</a></li>
                <li><a href="#" className="hover:text-bauhaus-blue">Discord</a></li>
                <li><a href="#" className="hover:text-bauhaus-yellow">Contact</a></li>
              </ul>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
