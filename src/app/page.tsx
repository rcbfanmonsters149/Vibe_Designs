import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

const STARTUPS = [
  {
    id: 1,
    name: "AuraAI",
    description: "Generative audio environments for deep focus.",
    domain: "AI",
    color: "bg-bauhaus-red",
    url: "https://auraai.example",
  },
  {
    id: 2,
    name: "BlockChain Logistics",
    description: "Decentralized supply chain tracking.",
    domain: "Web3",
    color: "bg-bauhaus-blue",
    url: "https://blockchainlog.example",
  },
  {
    id: 3,
    name: "LearnNode",
    description: "Interactive visual learning for math.",
    domain: "EdTech",
    color: "bg-bauhaus-yellow",
    url: "https://learnnode.example",
  },
  {
    id: 4,
    name: "SustainaBuild",
    description: "Marketplace for zero-carbon building materials.",
    domain: "Climate",
    color: "bg-bauhaus-black",
    url: "https://sustaina.example",
  },
  {
    id: 5,
    name: "FinPulse",
    description: "Real-time micro-lending for freelancers.",
    domain: "FinTech",
    color: "bg-bauhaus-red",
    url: "https://finpulse.example",
  },
  {
    id: 6,
    name: "MediMatch",
    description: "AI-driven patient-to-specialist routing.",
    domain: "HealthTech",
    color: "bg-bauhaus-blue",
    url: "https://medimatch.example",
  },
  {
    id: 7,
    name: "CodeCraft",
    description: "No-code game engine for VR environments.",
    domain: "Gaming",
    color: "bg-bauhaus-yellow",
    url: "https://codecraft.example",
  },
  {
    id: 8,
    name: "AgriSense",
    description: "IoT sensors for predictive crop yields.",
    domain: "AgriTech",
    color: "bg-bauhaus-black",
    url: "https://agrisense.example",
  },
  {
    id: 9,
    name: "CyberShield",
    description: "Automated penetration testing for startups.",
    domain: "Cybersecurity",
    color: "bg-bauhaus-red",
    url: "https://cybershield.example",
  },
  {
    id: 10,
    name: "EcoPack",
    description: "Biodegradable packaging from mushroom mycelium.",
    domain: "Sustainability",
    color: "bg-bauhaus-blue",
    url: "https://ecopack.example",
  },
  {
    id: 11,
    name: "QuantumLeap AI",
    description: "Quantum computing algorithms for drug discovery.",
    domain: "DeepTech",
    color: "bg-bauhaus-yellow",
    url: "https://quantumleap.example",
  },
  {
    id: 12,
    name: "UrbanTransit",
    description: "Micro-mobility sharing platform for college campuses.",
    domain: "Transport",
    color: "bg-bauhaus-black",
    url: "https://urbantransit.example",
  },
];

const PROJECT_IDEAS = [
  { id: 1, title: "Markdown to PDF API", difficulty: "Minor", time: "Weekend" },
  { id: 2, title: "Personal Finance Dashboard", difficulty: "Moderate", time: "2 Weeks" },
  { id: 3, title: "Headless CMS using Supabase", difficulty: "Major", time: "1 Month" },
  { id: 4, title: "Real-time Chat App", difficulty: "Moderate", time: "2 Weeks" },
  { id: 5, title: "Job Board for Juniors", difficulty: "Moderate", time: "3 Weeks" },
  { id: 6, title: "Pomodoro Focus Timer", difficulty: "Minor", time: "Weekend" },
  { id: 7, title: "Open Source Analytics", difficulty: "Major", time: "2 Months" },
  { id: 8, title: "Recipe Finder by Ingredients", difficulty: "Minor", time: "Weekend" },
  { id: 9, title: "Habit Tracker MVP", difficulty: "Minor", time: "1 Week" },
  { id: 10, title: "Social Media Scheduler", difficulty: "Major", time: "1.5 Months" },
  { id: 11, title: "Expense Splitter App", difficulty: "Moderate", time: "3 Weeks" },
  { id: 12, title: "Browser Extension for Bookmarks", difficulty: "Minor", time: "1 Week" },
];

const TRENDING_POSTS = [
  { id: 1, author: "Sarah Connor", title: "How we scaled to 10k users with Next.js", snippet: "The journey was tough, but caching saved our database. Here is the architecture we used...", time: "2h ago", tags: ["Tech", "Scaling"] },
  { id: 2, author: "Devon Miles", title: "Why your SaaS needs a darker dark mode", snippet: "High contrast is key. Most dark modes fail because they use pure black. Let's talk about #111111...", time: "4h ago", tags: ["Design", "UI/UX"] },
  { id: 3, author: "Alice Wonderland", title: "My idea for a decentralized food delivery app", snippet: "Drivers own the network. Restaurants pay zero commission. Is this viable or just a pipe dream?", time: "5h ago", tags: ["Idea", "Web3"] },
  { id: 4, author: "Marcus Aurelius", title: "Stoicism in modern tech leadership", snippet: "How ancient philosophy can help you manage a team of 50 engineers during a production outage...", time: "7h ago", tags: ["Leadership", "Culture"] },
  { id: 5, author: "Beta Tester", title: "I reviewed 100 landing pages. Here's what the top 5 had in common.", snippet: "Clear CTAs, fast load times, and above-the-fold value propositions. But the secret sauce is actually...", time: "12h ago", tags: ["Marketing", "Growth"] },
  { id: 6, author: "Code Ninja", title: "Migrating from REST to GraphQL: A Post-Mortem", snippet: "We thought it would solve all our over-fetching problems. It did, but it introduced 3 new ones.", time: "1d ago", tags: ["Engineering", "API"] },
];

export default async function Home() {
  const supabase = await createClient();

  // Fetch data from Supabase
  const { data: dbStartups } = await supabase.from('startups').select('*').order('created_at', { ascending: false }).limit(12);
  const { data: dbProjects } = await supabase.from('project_ideas').select('*').order('created_at', { ascending: false }).limit(12);
  const { data: dbPosts } = await supabase.from('posts').select('*').order('created_at', { ascending: false }).limit(6);

  // Fallback to mock data if DB is empty (for smooth transition during testing)
  const displayStartups = dbStartups && dbStartups.length > 0 ? dbStartups : STARTUPS;
  const displayProjects = dbProjects && dbProjects.length > 0 ? dbProjects : PROJECT_IDEAS;
  const displayPosts = dbPosts && dbPosts.length > 0 ? dbPosts : TRENDING_POSTS;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="border-b-4 border-bauhaus-black bg-bauhaus-gray">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] mb-6">
              Discover <br />
              <span className="text-bauhaus-red">Build</span> <br />
              Grow.
            </h1>
            <p className="text-lg md:text-xl font-medium max-w-lg mb-8 border-l-4 border-bauhaus-black pl-4">
              Your central hub for emerging startups, curated project ideas, and a community of builders.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/hackathons" className="bg-bauhaus-yellow text-bauhaus-black font-bold uppercase tracking-wide px-8 py-4 border-2 border-bauhaus-black hover:bg-bauhaus-black hover:text-white transition-colors shadow-[4px_4px_0_rgba(17,17,17,1)] flex items-center gap-2">
                <span>⚡ Hackathons Hub</span>
              </Link>
              <button className="bg-bauhaus-blue text-white font-bold uppercase tracking-wide px-8 py-4 border-2 border-bauhaus-black hover:bg-bauhaus-black transition-colors">
                Explore Startups
              </button>
              <button className="bg-white text-bauhaus-black font-bold uppercase tracking-wide px-8 py-4 border-2 border-bauhaus-black hover:bg-bauhaus-yellow transition-colors">
                Find Project Ideas
              </button>
            </div>
          </div>
          <div className="relative hidden md:block h-[400px]">
            {/* Abstract Bauhaus Art Representation */}
            <div className="absolute top-10 right-10 w-64 h-64 bg-bauhaus-red rounded-full border-4 border-bauhaus-black mix-blend-multiply"></div>
            <div className="absolute bottom-10 right-32 w-48 h-48 bg-bauhaus-yellow border-4 border-bauhaus-black mix-blend-multiply transform rotate-12"></div>
            <div className="absolute top-32 right-48 w-56 h-72 bg-bauhaus-blue border-4 border-bauhaus-black mix-blend-multiply"></div>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b-4 border-bauhaus-black bg-white">
        <div className="mb-12">
          <h2 className="text-4xl font-bold uppercase tracking-tighter text-center">What We Provide</h2>
          <p className="font-medium text-bauhaus-black/70 mt-4 text-center max-w-2xl mx-auto">
            Everything you need to go from idea to successful startup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/hackathons" className="border-4 border-bauhaus-black p-6 bg-bauhaus-yellow hover:-translate-y-2 transition-transform shadow-[6px_6px_0_rgba(17,17,17,1)] block group">
            <div className="w-12 h-12 bg-white rounded-full border-2 border-bauhaus-black flex items-center justify-center mb-6 text-xl">🏆</div>
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3 flex items-center justify-between">
              <span>Hackathons Hub</span>
              <span className="text-xs bg-bauhaus-black text-white px-2 py-0.5">NEW</span>
            </h3>
            <p className="text-sm font-medium text-bauhaus-black/80">Discover upcoming global hackathons, explore winning pitch decks & PPTs, and generate high-potential 24h–48h project blueprints.</p>
          </Link>

          <div className="border-4 border-bauhaus-black p-6 bg-bauhaus-gray hover:-translate-y-2 transition-transform shadow-[6px_6px_0_rgba(17,17,17,1)]">
            <div className="w-12 h-12 bg-bauhaus-yellow rounded-full border-2 border-bauhaus-black flex items-center justify-center mb-6 text-xl">💡</div>
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Startup Ideas</h3>
            <p className="text-sm font-medium text-bauhaus-black/80">Explore a curated vault of validated startup concepts across various industries like AI, Web3, and SaaS.</p>
          </div>
          
          <div className="border-4 border-bauhaus-black p-6 bg-white hover:-translate-y-2 transition-transform shadow-[6px_6px_0_rgba(17,17,17,1)]">
            <div className="w-12 h-12 bg-bauhaus-blue rounded-none border-2 border-bauhaus-black flex items-center justify-center mb-6 text-xl">🛠️</div>
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Project Ideas</h3>
            <p className="text-sm font-medium text-bauhaus-black/80">Find projects ranging from minor weekend hacks to major thesis-level builds to sharpen your skills.</p>
          </div>

          <div className="border-4 border-bauhaus-black p-6 bg-bauhaus-gray hover:-translate-y-2 transition-transform shadow-[6px_6px_0_rgba(17,17,17,1)]">
            <div className="w-12 h-12 bg-bauhaus-red rounded-full border-2 border-bauhaus-black flex items-center justify-center mb-6 text-xl">🗣️</div>
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Founder Stories</h3>
            <p className="text-sm font-medium text-bauhaus-black/80">Hear directly from successful founders. Read their insights, failures, and scaling strategies.</p>
          </div>

          <div className="border-4 border-bauhaus-black p-6 bg-white hover:-translate-y-2 transition-transform shadow-[6px_6px_0_rgba(17,17,17,1)]">
            <div className="w-12 h-12 bg-bauhaus-yellow rounded-none border-2 border-bauhaus-black flex items-center justify-center mb-6 text-xl rotate-45"><span className="-rotate-45">📈</span></div>
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Live Tracking</h3>
            <p className="text-sm font-medium text-bauhaus-black/80">Build in public. Track your progress live and share your journey with friends, mentors, and investors.</p>
          </div>

          <div className="border-4 border-bauhaus-black p-6 bg-bauhaus-gray hover:-translate-y-2 transition-transform shadow-[6px_6px_0_rgba(17,17,17,1)]">
            <div className="w-12 h-12 bg-bauhaus-black rounded-none border-2 border-bauhaus-gray flex items-center justify-center mb-6 text-xl"><span className="text-white">🤝</span></div>
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Team Management</h3>
            <p className="text-sm font-medium text-bauhaus-black/80">Find co-founders, collaborate on projects, and manage tasks within a dedicated team environment.</p>
          </div>

          <div className="border-4 border-bauhaus-black p-6 bg-white hover:-translate-y-2 transition-transform shadow-[6px_6px_0_rgba(17,17,17,1)]">
            <div className="w-12 h-12 bg-bauhaus-blue rounded-full border-2 border-bauhaus-black flex items-center justify-center mb-6 text-xl">📚</div>
            <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Resource Library</h3>
            <p className="text-sm font-medium text-bauhaus-black/80">Access a curated library of tutorials, APIs, and tools to help you build faster and smarter.</p>
          </div>
        </div>
      </section>

      {/* Main Content: Startup Feed */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b-4 border-bauhaus-black">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-bauhaus-black pb-4">
          <div>
            <h2 className="text-4xl font-bold uppercase tracking-tighter">Emerging Startups</h2>
            <p className="font-medium text-bauhaus-black/70 mt-2">Companies shaping the future.</p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="border-2 border-bauhaus-black px-4 py-1 text-sm font-bold uppercase hover:bg-bauhaus-black hover:text-white transition-colors">All</button>
            <button className="border-2 border-bauhaus-black px-4 py-1 text-sm font-bold uppercase hover:bg-bauhaus-black hover:text-white transition-colors">AI</button>
            <button className="border-2 border-bauhaus-black px-4 py-1 text-sm font-bold uppercase hover:bg-bauhaus-black hover:text-white transition-colors">Web3</button>
          </div>
        </div>

        {/* Smaller cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayStartups.map((startup, i) => {
            const colors = ['bg-bauhaus-red', 'bg-bauhaus-blue', 'bg-bauhaus-yellow', 'bg-bauhaus-black'];
            const bgColor = (startup as any).color || colors[i % colors.length];
            return (
            <div 
              key={startup.id} 
              className="group border-4 border-bauhaus-black bg-white flex flex-col hover:-translate-y-2 transition-transform duration-300 relative"
            >
              <div className={`h-3 border-b-4 border-bauhaus-black ${bgColor}`}></div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold tracking-tighter uppercase text-bauhaus-black group-hover:text-bauhaus-blue transition-colors truncate pr-2">
                    {startup.name}
                  </h3>
                  <span className="border-2 border-bauhaus-black px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-bauhaus-gray flex-shrink-0">
                    {startup.domain}
                  </span>
                </div>
                <p className="font-medium text-sm mb-6 flex-1 text-bauhaus-black/80">
                  {startup.description}
                </p>
                
                <div className="flex items-center justify-between border-t-2 border-bauhaus-black/10 pt-4 mt-auto">
                  <Link href={`/startups/${startup.id}`} className="text-xs font-bold uppercase tracking-wide hover:underline">
                    View Details &rarr;
                  </Link>
                  <a 
                    href={startup.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-wide bg-bauhaus-black text-white px-2 py-1 hover:bg-bauhaus-red transition-colors"
                  >
                    Visit Site ↗
                  </a>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/startups" className="border-4 border-bauhaus-black bg-white text-bauhaus-black font-bold uppercase px-8 py-4 text-lg hover:bg-bauhaus-black hover:text-white transition-colors">
            View All Startups
          </Link>
        </div>
      </section>

      {/* Trending Posts Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b-4 border-bauhaus-black">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-bauhaus-black pb-4">
          <div>
            <h2 className="text-4xl font-bold uppercase tracking-tighter">Trending Posts</h2>
            <p className="font-medium text-bauhaus-black/70 mt-2">Insights, stories, and ideas from the community.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/feed" className="border-2 border-bauhaus-black px-6 py-2 font-bold uppercase hover:bg-bauhaus-black hover:text-white transition-colors">
              Read More Posts
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {displayPosts.map((post) => (
            <div key={post.id} className="border-l-8 border-bauhaus-red pl-6 py-4 hover:bg-bauhaus-gray transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-bauhaus-black rounded-full"></div>
                <span className="font-bold text-sm uppercase">{(post as any).author || (post as any).author_name}</span>
                <span className="text-xs text-bauhaus-black/50 font-bold uppercase">• {(post as any).time || new Date((post as any).created_at).toLocaleDateString()}</span>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2 group-hover:text-bauhaus-blue transition-colors">{post.title}</h3>
              <p className="font-medium text-bauhaus-black/80 max-w-3xl mb-4">{post.snippet}</p>
              <div className="flex gap-2">
                {(post.tags || []).map((tag: string) => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-bauhaus-yellow px-2 py-0.5 border border-bauhaus-black">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Ideas Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-bauhaus-black pb-4">
          <div>
            <h2 className="text-4xl font-bold uppercase tracking-tighter">Build Your Next Project</h2>
            <p className="font-medium text-bauhaus-black/70 mt-2">Curated ideas from minor to major scale.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {displayProjects.map((idea, i) => (
            <div key={idea.id} className={`border-2 border-bauhaus-black p-4 flex flex-col justify-between ${i % 3 === 0 ? 'bg-bauhaus-gray' : 'bg-white'} hover:shadow-[4px_4px_0_rgba(17,17,17,1)] transition-shadow`}>
              <div>
                <h4 className="font-bold text-lg leading-tight mb-2 uppercase">{idea.title}</h4>
              </div>
              <div className="flex justify-between items-end mt-4">
                <span className={`text-xs font-bold uppercase tracking-wide px-2 py-1 border-2 border-bauhaus-black ${idea.difficulty === 'Minor' ? 'bg-bauhaus-yellow' : idea.difficulty === 'Moderate' ? 'bg-bauhaus-blue text-white' : 'bg-bauhaus-red text-white'}`}>
                  {idea.difficulty}
                </span>
                <span className="text-xs font-bold uppercase text-bauhaus-black/60">
                  {(idea as any).time || (idea as any).time_estimate}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href="/projects" className="border-4 border-bauhaus-black bg-bauhaus-black text-white font-bold uppercase px-8 py-4 text-lg hover:bg-white hover:text-bauhaus-black transition-colors">
            View All Projects
          </Link>
        </div>
      </section>
    </div>
  );
}
