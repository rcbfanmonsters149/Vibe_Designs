export interface PastWinner {
  id: string;
  hackathonName: string;
  edition: string;
  year: string;
  organizer: string;
  projectName: string;
  tagline: string;
  description: string;
  teamName: string;
  teamMembers: string[];
  award: string;
  prizeAmount: string;
  track: string;
  color: string;
  pptUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  whyItWon: string[];
  techStack: string[];
  slidesOutline?: { slideNumber: number; title: string; content: string }[];
}

export interface UpcomingHackathon {
  id: string;
  name: string;
  tagline: string;
  organizer: string;
  logoBadge: string;
  color: string;
  format: 'Virtual (Global)' | 'In-Person' | 'Hybrid';
  location: string;
  status: 'live' | 'open' | 'upcoming';
  totalPrize: string;
  registrationDeadline: string;
  startDate: string;
  submissionDeadline: string;
  demoDayDate: string;
  websiteUrl: string;
  tracks: string[];
  sponsors: string[];
  overview: string;
  eligibility: string;
  teamSize: string;
}

export interface HackathonIdea {
  id: string;
  title: string;
  track: 'AI Agents' | 'Web3 & DeFi' | 'Developer Tools' | 'Climate & Sustainability' | 'HealthTech' | 'FinTech & Commerce' | 'Social Impact' | 'Gaming & XR';
  difficulty: 'Minor (Weekend)' | 'Moderate (36h)' | 'Major (48h)';
  timeframe: '24h' | '36h' | '48h';
  problem: string;
  solution: string;
  winningHook: string;
  targetBounties: string[];
  recommendedStack: string[];
  accentColor: string;
}

export interface TeammatePost {
  id: string;
  name: string;
  role: string;
  skills: string[];
  targetHackathon: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Pro Hacker';
  contact: string;
  lookingFor: string;
  timePosted: string;
}

export const PAST_WINNERS: PastWinner[] = [
  {
    id: 'ethglobal-sf-agentmesh',
    hackathonName: 'ETHGlobal San Francisco',
    edition: '2024 Championship',
    year: '2024',
    organizer: 'ETHGlobal',
    projectName: 'AgentMesh Protocol',
    tagline: 'Autonomous AI agents that execute trustless cross-chain arbitrage and settlements.',
    description: 'AgentMesh enables AI agents to hold crypto wallets, negotiate real-time transaction routes, and settle trades across 4 EVM chains without exposing private keys, using zero-knowledge proofs and intent-based routing.',
    teamName: 'ZeroEntropy Labs',
    teamMembers: ['Alex Chen (Smart Contracts)', 'Sophia Patel (AI/Agentic)', 'Liam O\'Connor (Fullstack)'],
    award: '1st Place Overall & Best Use of Autonomous Agents',
    prizeAmount: '$35,000 + Sponsor Bounties',
    track: 'AI + Web3',
    color: 'bg-bauhaus-red',
    pptUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vTemplateETHGlobal/pub',
    demoUrl: 'https://agentmesh.demo.xyz',
    githubUrl: 'https://github.com/agentmesh/ethglobal-sf-winner',
    videoUrl: 'https://youtube.com/watch?v=mock-ethglobal-agentmesh',
    whyItWon: [
      'Live working demo with real on-chain transaction execution within 3 seconds',
      'Flawless pitch: started with live agent negotiation on stage that solved a real gas bottleneck',
      'Combined 4 sponsor SDKs (Chainlink CCIP, The Graph, Dynamic, Base) to stack sponsor prizes',
      'Clear monetization and security architecture presented in the pitch deck'
    ],
    techStack: ['Solidity', 'Next.js 15', 'LangChain', 'Chainlink CCIP', 'Viem', 'Supabase'],
    slidesOutline: [
      { slideNumber: 1, title: 'The Hook', content: 'AI agents have minds, but no economic hands. They cannot transact securely without centralized keys.' },
      { slideNumber: 2, title: 'The Problem', content: 'Cross-chain latency + MEV sandwich attacks cost AI arbitrage bots $42M annually.' },
      { slideNumber: 3, title: 'Solution: AgentMesh', content: 'Decentralized intent network where AI agents execute ZK-authenticated multi-chain swaps.' },
      { slideNumber: 4, title: 'Live Demo & Architecture', content: 'Live 10-second demo showing Agent Alpha negotiating with Agent Beta across Base and Arbitrum.' },
      { slideNumber: 5, title: 'Roadmap & Team', content: 'Decentralized relayer network, mainnet testbed, backed by senior Web3 & AI engineers.' }
    ]
  },
  {
    id: 'hackmit-omnisense',
    hackathonName: 'HackMIT',
    edition: 'Flagship Collegiate Hackathon',
    year: '2024',
    organizer: 'MIT TechX',
    projectName: 'OmniSense AR',
    tagline: 'Real-time spatial auditory navigation and scene understanding for the visually impaired.',
    description: 'An edge-computed multimodal assistive system using lightweight Gemini vision models and spatial audio to describe physical obstacles, text, and faces through ordinary bone-conduction headphones in under 180ms.',
    teamName: 'SpectraVision',
    teamMembers: ['Maya Lin (Computer Vision)', 'Marcus Vance (iOS/Swift)', 'Devin Ray (Hardware/Edge)'],
    award: 'Grand Prize Winner & Best Hardware Hack',
    prizeAmount: '$15,000 + Apple Vision Devkit',
    track: 'Accessibility & AI',
    color: 'bg-bauhaus-blue',
    pptUrl: 'https://canva.com/design/mock-hackmit-omnisense/view',
    demoUrl: 'https://omnisense-mit.vercel.app',
    githubUrl: 'https://github.com/spectravision/hackmit-omnisense',
    videoUrl: 'https://youtube.com/watch?v=mock-hackmit-omnisense',
    whyItWon: [
      'Emotional and compelling problem statement backed by user interviews from the MIT assistive tech lab',
      'Sub-200ms latency on real hardware during live judges walkabout',
      'Clean 5-slide deck that visualized latency reduction vs cloud models'
    ],
    techStack: ['Gemini 1.5 Flash', 'FastAPI', 'SwiftUI', 'CoreML', 'WebSockets', 'WebAudio API'],
    slidesOutline: [
      { slideNumber: 1, title: 'Real World Barrier', content: '2.2 billion visually impaired individuals navigate an unpredictable 3D world with 2D tools.' },
      { slideNumber: 2, title: 'Existing Failures', content: 'Cloud AI is too slow (>2.5s latency), causing collision hazards in real-time navigation.' },
      { slideNumber: 3, title: 'OmniSense: Sub-200ms Spatial AI', content: 'Edge-quantized vision stream converted into directional 3D audio cues.' },
      { slideNumber: 4, title: 'Live Demonstration', content: 'Volunteer blindfolded navigating through an obstacle corridor with spatial audio pings.' },
      { slideNumber: 5, title: 'Impact & Hardware BOM', content: 'Works on any $20 bone conduction headset and modern smartphone.' }
    ]
  },
  {
    id: 'calhacks-gitpulse',
    hackathonName: 'CalHacks 11.0',
    edition: 'World\'s Largest Collegiate Hackathon',
    year: '2024',
    organizer: 'UC Berkeley',
    projectName: 'GitPulse Debugger',
    tagline: 'Autonomous AI PR agent that spins up ephemeral sandboxes to reproduce and fix production bugs.',
    description: 'When an error occurs in production (via Sentry/Datadog), GitPulse automatically forks the repo, reproduces the bug in an isolated micro-container, generates an isolated unit test, writes the fix, and opens a verified Pull Request.',
    teamName: 'DevStack 404',
    teamMembers: ['David Zhang (DevOps/Rust)', 'Elena Rostova (Fullstack)', 'Arjun Mehta (AI/LLM Infra)'],
    award: '1st Place DevTools Track & Top 3 Overall',
    prizeAmount: '$20,000',
    track: 'Developer Tools',
    color: 'bg-bauhaus-yellow',
    pptUrl: 'https://pitch.com/v/gitpulse-calhacks-winner',
    demoUrl: 'https://gitpulse-demo.dev',
    githubUrl: 'https://github.com/devstack404/gitpulse-engine',
    videoUrl: 'https://loom.com/share/mock-gitpulse-calhacks',
    whyItWon: [
      'Incredible developer experience: judges watched a live production crash trigger a PR with passing tests in 90 seconds',
      'Deep technical integration using Docker-in-Docker ephemeral sandboxes and AST transformations',
      'Clear business model and immediate ROI for engineering teams'
    ],
    techStack: ['TypeScript', 'Docker API', 'Gemini Pro', 'GitHub Apps API', 'TailwindCSS', 'PostgreSQL'],
    slidesOutline: [
      { slideNumber: 1, title: 'The PagerDuty Nightmare', content: 'Engineers spend 40% of their week reproducing edge-case bugs and flaky production issues.' },
      { slideNumber: 2, title: 'The Missing Link', content: 'AI assistants write code, but they cannot run, reproduce, or verify bugs in sandboxed runtimes.' },
      { slideNumber: 3, title: 'GitPulse Engine', content: 'Automated reproduction harness: Crash Log -> Ephemeral Container -> Repro Test -> Verified Fix PR.' },
      { slideNumber: 4, title: 'Live 90-Second Demo', content: 'Throwing an unhandled promise rejection on live site -> watching GitHub PR auto-generate.' },
      { slideNumber: 5, title: 'Market Opportunity', content: 'B2B SaaS model targeting 30M developers; integrations with Sentry, GitHub, and GitLab.' }
    ]
  },
  {
    id: 'hackthenorth-synthecare',
    hackathonName: 'Hack the North',
    edition: 'Canada\'s Biggest Hackathon',
    year: '2024',
    organizer: 'University of Waterloo',
    projectName: 'SyntheCare MedSync',
    tagline: 'Synthetic EHR patient generator that preserves differential privacy for clinical AI research.',
    description: 'SyntheCare allows researchers and hospital developers to generate medically realistic, non-identifiable electronic health records (EHR) with verified lab results and ICD-10 codes, unlocking biomedical research without HIPAA violations.',
    teamName: 'BioSynthetics',
    teamMembers: ['Nikhil Sharma (Bioinformatics)', 'Chloe Dubois (Data Science)', 'Samira Khan (Fullstack)'],
    award: 'Best HealthTech & Grand Finalist',
    prizeAmount: '$12,000 + Y Combinator Interview',
    track: 'HealthTech & Privacy',
    color: 'bg-bauhaus-red',
    pptUrl: 'https://docs.google.com/presentation/d/mock-synthecare/pub',
    demoUrl: 'https://synthecare-waterloo.vercel.app',
    githubUrl: 'https://github.com/biosynthetics/synthecare-core',
    videoUrl: 'https://youtube.com/watch?v=mock-synthecare-pitch',
    whyItWon: [
      'Solved the single biggest bottleneck in healthcare AI: clinical training data access',
      'Demonstrated rigorous mathematical proof of epsilon-differential privacy',
      'Beautiful, intuitive dashboard for clinicians and data scientists'
    ],
    techStack: ['Python', 'PyTorch', 'Next.js 14', 'Tailwind', 'FastAPI', 'DuckDB'],
    slidesOutline: [
      { slideNumber: 1, title: 'Healthcare AI is Starved', content: '85% of clinical AI projects fail because real patient data is locked behind HIPAA & privacy silos.' },
      { slideNumber: 2, title: 'The Dilemma', content: 'De-identification methods are easily re-identified; standard synthetic data lacks biological coherence.' },
      { slideNumber: 3, title: 'SyntheCare Generator', content: 'Conditional GANs + Clinical Knowledge Graph that produces high-fidelity, zero-PII health cohorts.' },
      { slideNumber: 4, title: 'Validation Results', content: 'Trained a diagnostic model on synthetic data that matched 97.4% accuracy of real hospital data.' },
      { slideNumber: 5, title: 'Go-to-Market', content: 'Enterprise licensing for Pharma R&D, University Medical Centers, and Health startups.' }
    ]
  },
  {
    id: 'google-gemini-competition-ecotwin',
    hackathonName: 'Google Gemini Developer Competition',
    edition: 'Global AI Championship',
    year: '2024',
    organizer: 'Google Cloud & DeepMind',
    projectName: 'EcoTwin Global',
    tagline: 'Multimodal satellite & sensor intelligence for predicting micro-climate wildfire risks.',
    description: 'EcoTwin ingests high-resolution multispectral satellite imagery, weather feeds, and IoT soil sensors into Gemini 1.5 Pro\'s 2M context window to simulate wildfire propagation in real-time for emergency responders.',
    teamName: 'TerraSight AI',
    teamMembers: ['Lucas Becker (Geospatial ML)', 'Priya Natarajan (Backend/Cloud)', 'Tariq Al-Mansoor (UI/UX)'],
    award: 'Grand Prize Champion ($100k) & Best Multimodal App',
    prizeAmount: '$100,000',
    track: 'AI & Climate',
    color: 'bg-bauhaus-yellow',
    pptUrl: 'https://slides.com/terrasight/ecotwin-gemini-championship',
    demoUrl: 'https://ecotwin-global.web.app',
    githubUrl: 'https://github.com/terrasight-ai/ecotwin-gemini',
    videoUrl: 'https://youtube.com/watch?v=mock-ecotwin-google',
    whyItWon: [
      'Groundbreaking use of Gemini 1.5 Pro million-token context window to process an entire geographic county\'s sensor logs',
      'Interactive 3D simulation map rendered at 60 FPS in WebGL',
      'Endorsed by local volunteer fire departments during the hackathon testing period'
    ],
    techStack: ['Gemini 1.5 Pro', 'Google Earth Engine', 'Three.js / WebGL', 'Next.js', 'Google Cloud Run'],
    slidesOutline: [
      { slideNumber: 1, title: 'Wildfires Move Faster Than Models', content: 'Traditional wildfire prediction runs in batch cycles (4+ hours). Fire spreads in minutes.' },
      { slideNumber: 2, title: 'Massive Multimodal Data', content: 'Satellites, infrared cameras, wind radar, and soil telemetry cannot fit in traditional LLM contexts.' },
      { slideNumber: 3, title: 'EcoTwin Engine', content: 'Feeding 2M tokens of live multi-spectral raster data directly into Gemini 1.5 Pro.' },
      { slideNumber: 4, title: 'Live Simulation', content: 'Real-time evacuation route optimization for Maui terrain scenario.' },
      { slideNumber: 5, title: 'Global Deployment', content: 'Open-source SDK for civil protection agencies and insurance underwriters.' }
    ]
  },
  {
    id: 'treehacks-neurosync',
    hackathonName: 'TreeHacks (Stanford)',
    edition: 'Stanford Flagship Hackathon',
    year: '2024',
    organizer: 'Stanford University',
    projectName: 'NeuroSync Focus',
    tagline: 'Non-invasive BCI brainwave feedback for adaptive ADHD workflow acceleration.',
    description: 'An open-hardware headband and companion desktop application that reads EEG brainwave frequencies, detects cognitive fatigue or focus degradation, and dynamically alters editor UI and task granularity to maintain flow state.',
    teamName: 'Synapse Collective',
    teamMembers: ['Kyle Vance (Neuroscience)', 'Zoe Hernandez (Fullstack)', 'Owen Brooks (Signal Processing)'],
    award: 'Grand Prize - Health & Moonshot Track',
    prizeAmount: '$18,000 + Stanford VCs Mentorship',
    track: 'Hardware & NeuroTech',
    color: 'bg-bauhaus-blue',
    pptUrl: 'https://docs.google.com/presentation/d/mock-neurosync/pub',
    demoUrl: 'https://neurosync-stanford.dev',
    githubUrl: 'https://github.com/synapse-collective/neurosync',
    videoUrl: 'https://youtube.com/watch?v=mock-neurosync-treehacks',
    whyItWon: [
      'Live brainwave visualization on the big screen during judging pitch',
      'Simple $35 open-hardware sensor setup assembled in 36 hours',
      'Very clear scientific rigor paired with consumer-grade software design'
    ],
    techStack: ['Python BrainFlow', 'Electron', 'React 19', 'Tailwind', 'WebSockets', 'OpenBCI'],
    slidesOutline: [
      { slideNumber: 1, title: 'The Attention Crisis', content: 'Over 366M adults with ADHD lose 2.5 hours daily to context switching and dopamine crashes.' },
      { slideNumber: 2, title: 'Static Tools Fail', content: 'Timers and task lists are passive. They don\'t know when your brain actually checks out.' },
      { slideNumber: 3, title: 'NeuroSync Feedback Loop', content: 'Real-time EEG theta/beta ratio analysis that adapts your IDE and task pacing dynamically.' },
      { slideNumber: 4, title: 'Live Demonstration', content: 'Real-time brain state shift trigger: automatically breaking down a complex GitHub issue.' },
      { slideNumber: 5, title: 'Commercialization', content: 'Affordable consumer hardware kit + SaaS subscription for knowledge workers.' }
    ]
  }
];

export const UPCOMING_HACKATHONS: UpcomingHackathon[] = [
  {
    id: 'ethglobal-brussels',
    name: 'ETHGlobal Worldwide 2025',
    tagline: 'The premier global Ethereum hackathon gathering 2,000+ top Web3 & AI builders.',
    organizer: 'ETHGlobal',
    logoBadge: 'Ξ ETH',
    color: 'bg-bauhaus-blue',
    format: 'Hybrid',
    location: 'Brussels, Belgium & Online',
    status: 'open',
    totalPrize: '$500,000+ in Bounties',
    registrationDeadline: '2025-05-15T23:59:00Z',
    startDate: '2025-05-23T16:00:00Z',
    submissionDeadline: '2025-05-25T09:00:00Z',
    demoDayDate: '2025-05-25T14:00:00Z',
    websiteUrl: 'https://ethglobal.com',
    tracks: ['AI Agents on Web3', 'Account Abstraction', 'ZK Privacy & Identity', 'DeFi 3.0', 'Public Goods'],
    sponsors: ['Ethereum Foundation', 'Base', 'Uniswap', 'Arbitrum', 'Worldcoin', 'Chainlink', 'Polygon'],
    overview: 'ETHGlobal is the gold standard for blockchain hackathons. You will build alongside leading protocol founders, core researchers, and venture capitalists. Dedicated hacker houses and 24/7 technical mentors available.',
    eligibility: 'Open to all developers, designers, and founders globally (In-person & Virtual tracks).',
    teamSize: '1 to 5 members'
  },
  {
    id: 'hackmit-2025',
    name: 'HackMIT 2025',
    tagline: 'MIT’s flagship undergraduate hackathon bringing 1,000 hackers to Cambridge.',
    organizer: 'MIT TechX',
    logoBadge: 'MIT ⚡',
    color: 'bg-bauhaus-red',
    format: 'In-Person',
    location: 'MIT Campus, Cambridge, MA, USA',
    status: 'open',
    totalPrize: '$75,000 in Prizes + Hardware',
    registrationDeadline: '2025-08-10T23:59:00Z',
    startDate: '2025-09-19T18:00:00Z',
    submissionDeadline: '2025-09-21T08:00:00Z',
    demoDayDate: '2025-09-21T13:00:00Z',
    websiteUrl: 'https://hackmit.org',
    tracks: ['Generative AI & LLMs', 'Hardware & Assistive Tech', 'Sustainability & Energy', 'FinTech & Security'],
    sponsors: ['Google', 'Jane Street', 'Palantir', 'OpenAI', 'Citadel', 'Stripe', 'Figma'],
    overview: 'HackMIT is one of the most prestigious collegiate hackathons in the world. Features top-tier mentorship, hardware labs, and direct recruiter access from top tech and quantitative trading firms.',
    eligibility: 'Undergraduate and graduate students from any university worldwide. Travel reimbursements available.',
    teamSize: '1 to 4 members'
  },
  {
    id: 'calhacks-12',
    name: 'CalHacks 12.0',
    tagline: 'The world\'s largest collegiate hackathon hosted in the heart of San Francisco.',
    organizer: 'UC Berkeley',
    logoBadge: 'CAL 🐻',
    color: 'bg-bauhaus-yellow',
    format: 'In-Person',
    location: 'Metreon & Palace of Fine Arts, San Francisco, CA',
    status: 'upcoming',
    totalPrize: '$150,000 in Cash & Seed Grants',
    registrationDeadline: '2025-09-01T23:59:00Z',
    startDate: '2025-10-17T17:00:00Z',
    submissionDeadline: '2025-10-19T09:00:00Z',
    demoDayDate: '2025-10-19T14:00:00Z',
    websiteUrl: 'https://calhacks.io',
    tracks: ['AI Super-Agents', 'Silicon Valley Moonshots', 'Cybersecurity', 'Open Source DevTools', 'Bio & Longevity'],
    sponsors: ['NVIDIA', 'Anthropic', 'Supabase', 'Vercel', 'Databricks', 'Weights & Biases', 'Y Combinator'],
    overview: 'CalHacks brings over 2,500 students to San Francisco. Many previous winning teams went on to raise multi-million dollar seed rounds directly from attending angel investors and YC partners.',
    eligibility: 'College students worldwide. High school seniors eligible with waiver.',
    teamSize: '2 to 4 members'
  },
  {
    id: 'hack-the-north-2025',
    name: 'Hack the North 2025',
    tagline: 'Canada’s biggest hackathon hosted at the University of Waterloo.',
    organizer: 'Hack the North & TechVenture',
    logoBadge: 'HTN 🍁',
    color: 'bg-bauhaus-blue',
    format: 'In-Person',
    location: 'University of Waterloo, Ontario, Canada',
    status: 'open',
    totalPrize: '$65,000 + Flight Grants',
    registrationDeadline: '2025-07-20T23:59:00Z',
    startDate: '2025-09-12T16:00:00Z',
    submissionDeadline: '2025-09-14T08:00:00Z',
    demoDayDate: '2025-09-14T12:00:00Z',
    websiteUrl: 'https://hackthenorth.com',
    tracks: ['Future of Work', 'Health & Biotechnology', 'Space & Geospatial', 'Civic Tech & Education'],
    sponsors: ['Shopify', 'Cockroach Labs', 'Microsoft', 'Bloomberg', 'GitHub', 'Meta', 'Cloudflare'],
    overview: 'Renowned for world-class hospitality, custom workshops, and high-impact project outcomes. Free travel buses from major North American universities and chartered flights from select hubs.',
    eligibility: 'High school and university students of all backgrounds.',
    teamSize: '1 to 4 members'
  },
  {
    id: 'google-ai-hackathon-2025',
    name: 'Google Gemini Developer Hackathon 2025',
    tagline: 'Build next-generation autonomous multimodal AI apps with Gemini 2.0 & Google Cloud.',
    organizer: 'Google DeepMind & Cloud',
    logoBadge: 'G 🤖',
    color: 'bg-bauhaus-red',
    format: 'Virtual (Global)',
    location: 'Online (Worldwide)',
    status: 'live',
    totalPrize: '$250,000 Cash Pool + GCP Credits',
    registrationDeadline: '2025-06-30T23:59:00Z',
    startDate: '2025-04-01T00:00:00Z',
    submissionDeadline: '2025-07-07T23:59:00Z',
    demoDayDate: '2025-07-25T18:00:00Z',
    websiteUrl: 'https://ai.google.dev/competition',
    tracks: ['Multimodal Video & Audio Agents', 'Developer Tools & Code Assist', 'Enterprise Workflow Automation', 'Creativity & Gaming'],
    sponsors: ['Google Cloud', 'Google DeepMind', 'Firebase', 'Flutter', 'Kaggle'],
    overview: 'Global virtual challenge challenging creators to exploit Gemini 2.0\'s real-time multimodal streaming, function calling, and massive context windows. Category winners receive direct showcase at Google I/O.',
    eligibility: 'Anyone 18+ worldwide. Individuals or teams.',
    teamSize: '1 to 6 members'
  },
  {
    id: 'mlh-global-hack-week',
    name: 'MLH Global Hack Week',
    tagline: 'A week-long global celebration of coding, beginner workshops, and mini-challenges.',
    organizer: 'Major League Hacking (MLH)',
    logoBadge: 'MLH 🏆',
    color: 'bg-bauhaus-yellow',
    format: 'Virtual (Global)',
    location: 'Online (Discord & Twitch)',
    status: 'live',
    totalPrize: '$30,000 in Swag & Tech Gear',
    registrationDeadline: '2025-06-01T12:00:00Z',
    startDate: '2025-06-02T10:00:00Z',
    submissionDeadline: '2025-06-09T18:00:00Z',
    demoDayDate: '2025-06-10T20:00:00Z',
    websiteUrl: 'https://globalhackweek.mlh.io',
    tracks: ['Beginner Friendly', 'Open Source Contributions', 'Web Development', 'Game Jam', 'Cloud & DevOps'],
    sponsors: ['GitHub', 'Twilio', 'MongoDB', 'Postman', 'Capital One', 'Hedera', 'Auth0'],
    overview: 'Ideal for beginners and intermediate developers looking to earn points, build their first portfolio project, attend live coding workshops, and win custom MLH swag badges.',
    eligibility: 'Completely open to all skill levels from beginner to advanced.',
    teamSize: 'Solo or teams up to 4'
  },
  {
    id: 'solana-radar-hackathon',
    name: 'Solana Global Radar Hackathon',
    tagline: 'The world\'s highest throughput crypto hackathon with seed funding tracks.',
    organizer: 'Solana Foundation & Superteam',
    logoBadge: 'SOL ⚡',
    color: 'bg-bauhaus-blue',
    format: 'Virtual (Global)',
    location: 'Online & Regional Superteam Hubs',
    status: 'upcoming',
    totalPrize: '$600,000 in Seed Prizes & Grants',
    registrationDeadline: '2025-09-01T23:59:00Z',
    startDate: '2025-09-02T00:00:00Z',
    submissionDeadline: '2025-10-08T23:59:00Z',
    demoDayDate: '2025-10-22T16:00:00Z',
    websiteUrl: 'https://solana.com/radar',
    tracks: ['DePIN (Decentralized Physical Infra)', 'DeFi & Payments', 'Consumer Crypto & Social', 'Gaming', 'Crypto x AI'],
    sponsors: ['Solana Foundation', 'Jump Crypto', 'Multicoin Capital', 'Squads', 'Helium', 'Jupiter'],
    overview: 'The launchpad for the next billion-dollar crypto protocols. Previous winners include Tensor, StepN, and Kamino Finance. Includes demo days in front of Tier-1 crypto venture funds.',
    eligibility: 'Open to builders globally. Submissions must run on Solana testnet or mainnet.',
    teamSize: '1 to 5 members'
  },
  {
    id: 'nasa-space-apps',
    name: 'NASA Space Apps Challenge 2025',
    tagline: 'The largest annual global hackathon using open NASA Earth & space data.',
    organizer: 'NASA & International Space Agencies',
    logoBadge: 'NASA 🚀',
    color: 'bg-bauhaus-red',
    format: 'Hybrid',
    location: '300+ Cities Worldwide & Virtual',
    status: 'upcoming',
    totalPrize: 'Global Awards & Invitation to NASA Rocket Launch',
    registrationDeadline: '2025-10-01T23:59:00Z',
    startDate: '2025-10-04T09:00:00Z',
    submissionDeadline: '2025-10-05T23:59:00Z',
    demoDayDate: '2025-10-15T18:00:00Z',
    websiteUrl: 'https://www.spaceappschallenge.org',
    tracks: ['Climate & Earth Science', 'Astrophysics & Exoplanets', 'Space Exploration Hardware', 'Art & Gamification'],
    sponsors: ['NASA', 'ESA', 'JAXA', 'CSA', 'AWS', 'Planet Labs'],
    overview: 'Collaborate with scientists, designers, engineers, and technologists to address real-world challenges on Earth and in space using free, open-source data from NASA and international space partners.',
    eligibility: 'Open to everyone: students, professionals, hobbyists, coders and non-coders.',
    teamSize: '1 to 6 members'
  }
];

export const HACKATHON_IDEAS: HackathonIdea[] = [
  {
    id: 'idea-1',
    title: 'Agentic API Fuzzer & Zero-Day Exploit Explainer',
    track: 'AI Agents',
    difficulty: 'Moderate (36h)',
    timeframe: '36h',
    problem: 'Security engineers take days to triage and reproduce complex GraphQL/REST API authorization vulnerabilities (BOLA/IDOR).',
    solution: 'An autonomous agent that ingests OpenAPI specs, simulates malicious tenant interactions, catches broken object-level authorization, and auto-generates a reproducible test case and mitigation diff.',
    winningHook: 'Live stage demo: Paste any GitHub repo URL and watch the agent uncover an intentional exploit live in 60 seconds with an interactive visual dependency graph.',
    targetBounties: ['Best Security Hack', 'Best Use of Gemini 1.5 Pro', 'Best Developer Tool'],
    recommendedStack: ['Next.js 15', 'Gemini 1.5 Flash', 'FastAPI', 'Supabase', 'TailwindCSS'],
    accentColor: 'border-bauhaus-red'
  },
  {
    id: 'idea-2',
    title: 'DePIN Real-Time Noise & Air Quality Mesh Map',
    track: 'Climate & Sustainability',
    difficulty: 'Major (48h)',
    timeframe: '48h',
    problem: 'Urban noise and particulate pollution change by the minute, but municipal sensors are miles apart and updated once a day.',
    solution: 'Turn any smartphone or $15 ESP32 sensor into a decentralized environmental node that feeds zero-knowledge verified decibel & air metrics to an interactive 3D WebGL city heatmap, rewarding nodes with micro-tokens.',
    winningHook: 'Demonstrates physical-world impact. Judges walk around with the live mobile web app and watch the heat map update in real-time.',
    targetBounties: ['Best Climate / Sustainability Hack', 'Best DePIN / Web3 App', 'Best WebGL / Mapbox'],
    recommendedStack: ['Mapbox GL / Three.js', 'Solana / Base Web3', 'Next.js', 'WebSockets', 'Supabase Realtime'],
    accentColor: 'border-bauhaus-blue'
  },
  {
    id: 'idea-3',
    title: 'Voice-to-SQL Voice Commander for Hospital ER Nurses',
    track: 'HealthTech',
    difficulty: 'Minor (Weekend)',
    timeframe: '24h',
    problem: 'Emergency room nurses spend up to 2.5 hours per shift typing medical notes into clunky EHR terminals instead of caring for critical patients.',
    solution: 'A hands-free, HIPAA-compliant voice assistant running on a cheap tablet that translates natural doctor/nurse bedside conversations into structured FHIR/HL7 database entries with 100% clinician confirmation UI.',
    winningHook: 'Clear 3-minute pitch: Roleplay an emergency triage scenario live with audio input and watch the patient database update instantly.',
    targetBounties: ['Best HealthTech Hack', 'Best Voice AI Application', 'Best UI/UX Design'],
    recommendedStack: ['Web Speech API / Whisper', 'Gemini 1.5 Flash', 'Next.js', 'PostgreSQL (Supabase)', 'Tailwind'],
    accentColor: 'border-bauhaus-yellow'
  },
  {
    id: 'idea-4',
    title: 'Multi-Agent Code Review Consensus Engine',
    track: 'Developer Tools',
    difficulty: 'Moderate (36h)',
    timeframe: '36h',
    problem: 'Single AI code reviewers hallucinate false positives or miss subtle architectural race conditions.',
    solution: 'A GitHub App that spawns 3 adversarial agent personas (Performance Specialist, Security Auditor, UX Purist) to debate PR changes in a simulated round-table and output a unified, synthesized review.',
    winningHook: 'Visual live debate UI showing agents arguing over performance trade-offs before generating the final GitHub PR comment.',
    targetBounties: ['Best Developer Tool', 'Best Multi-Agent System', 'Best GitHub Integration'],
    recommendedStack: ['GitHub Probot / Webhooks', 'Google GenAI SDK', 'Next.js', 'Radix UI', 'Vercel Serverless'],
    accentColor: 'border-bauhaus-black'
  },
  {
    id: 'idea-5',
    title: 'Zero-Knowledge Credential Proof for Underbanked Micro-Loans',
    track: 'FinTech & Commerce',
    difficulty: 'Major (48h)',
    timeframe: '48h',
    problem: 'Freelancers in developing economies cannot access credit because they lack traditional credit bureau history despite steady digital earnings.',
    solution: 'A protocol that generates ZK-proofs of Stripe/Upwork/PayPal cashflows to prove creditworthiness to DeFi lenders without revealing private client names or bank accounts.',
    winningHook: 'Solves financial exclusion with cutting-edge cryptography. Judges see loan approval happen in 5 seconds with zero personal data leakage.',
    targetBounties: ['Best FinTech Hack', 'Best ZK / Privacy Innovation', 'Best Social Impact'],
    recommendedStack: ['Circom / SnarkJS', 'Next.js', 'Solidity', 'Ethers.js', 'Supabase Auth'],
    accentColor: 'border-bauhaus-red'
  },
  {
    id: 'idea-6',
    title: 'Interactive 3D Video Game Generation from Children\'s Drawings',
    track: 'Gaming & XR',
    difficulty: 'Major (48h)',
    timeframe: '48h',
    problem: 'Kids have boundless imagination for stories and games, but turning doodles into playable experiences requires complex game engines.',
    solution: 'Snap a picture of a hand-drawn crayon level. An AI vision pipeline segments characters and platforms, generates 3D low-poly meshes, and builds a playable browser platformer in under 30 seconds.',
    winningHook: 'High emotional viral factor. Draw a monster live during the demo, photograph it with your phone, and play as that monster on stage.',
    targetBounties: ['Most Creative / Fun Hack', 'Best Use of Multimodal AI', 'Audience Choice Award'],
    recommendedStack: ['Three.js', 'Gemini Vision', 'Canvas API', 'React 19', 'Web Audio API'],
    accentColor: 'border-bauhaus-blue'
  },
  {
    id: 'idea-7',
    title: 'Autonomous Disaster Relief Supply Matcher',
    track: 'Social Impact',
    difficulty: 'Moderate (36h)',
    timeframe: '36h',
    problem: 'During floods or earthquakes, aid coordination is chaotic: shelters have excess blankets but zero insulin, while donors don\'t know where to send goods.',
    solution: 'An SMS & WhatsApp AI agent that parses distress messages in multiple local dialects, aggregates geospatial supply needs, and dynamically matches logistics routes for local volunteers.',
    winningHook: 'Works 100% over offline-resilient SMS and simple USSD codes, demonstrating real emergency viability without high-speed internet.',
    targetBounties: ['Best Social Good Hack', 'Best Twilio / Messaging App', 'Best Resilient Tech'],
    recommendedStack: ['Twilio API', 'Gemini Multilingual', 'Next.js', 'Leaflet / OpenStreetMap', 'Supabase'],
    accentColor: 'border-bauhaus-yellow'
  },
  {
    id: 'idea-8',
    title: 'Smart Contract Gasless Multi-Sig for Non-Technical DAO Members',
    track: 'Web3 & DeFi',
    difficulty: 'Minor (Weekend)',
    timeframe: '24h',
    problem: 'Non-technical non-profit or club board members struggle with hardware wallets, seed phrases, and gas fees when signing treasury payouts.',
    solution: 'Passkey-powered (FaceID / TouchID) multi-signature treasury wallet utilizing ERC-4337 Account Abstraction, allowing any board member to approve payments via biometric phone prompt with zero gas fees.',
    winningHook: 'Demonstrates Web3 mass adoption: approval takes 2 seconds using standard iPhone FaceID without installing MetaMask.',
    targetBounties: ['Best Account Abstraction Hack', 'Best UX in Web3', 'Best Mobile Web3'],
    recommendedStack: ['WebAuthn / Passkeys', 'Biconomy / ZeroDev ERC-4337', 'Next.js', 'Tailwind', 'Viem'],
    accentColor: 'border-bauhaus-black'
  }
];

export const TEAMMATE_LISTINGS: TeammatePost[] = [
  {
    id: 'team-1',
    name: 'Devon Park',
    role: 'Fullstack & Agentic AI Specialist',
    skills: ['Next.js', 'Python', 'Gemini API', 'LangChain', 'Tailwind'],
    targetHackathon: 'HackMIT 2025',
    experienceLevel: 'Pro Hacker',
    contact: 'devon.park@mit.edu',
    lookingFor: 'Looking for 1 UI/UX designer and 1 hardware/embedded engineer to build an assistive robotics project.',
    timePosted: '2 hours ago'
  },
  {
    id: 'team-2',
    name: 'Aisha Al-Hassan',
    role: 'Smart Contract & ZK Developer',
    skills: ['Solidity', 'Rust', 'Circom', 'Viem', 'The Graph'],
    targetHackathon: 'ETHGlobal Worldwide',
    experienceLevel: 'Pro Hacker',
    contact: 'aisha.eth@proton.me',
    lookingFor: 'Need a stellar Next.js frontend dev who can build sleek Bauhaus or Cyberpunk dashboards in 36h.',
    timePosted: '5 hours ago'
  },
  {
    id: 'team-3',
    name: 'Lucas Vance',
    role: 'Product Designer & Pitch Lead',
    skills: ['Figma', 'Storytelling', 'Pitch Decks', 'Frontend React', 'Video Editing'],
    targetHackathon: 'CalHacks 12.0',
    experienceLevel: 'Intermediate',
    contact: 'lucas.vance@berkeley.edu',
    lookingFor: 'Looking for 2 backend / ML engineers building developer tools or multimodal AI applications.',
    timePosted: '1 day ago'
  },
  {
    id: 'team-4',
    name: 'Sofia Chen',
    role: 'Computer Vision & Edge ML',
    skills: ['PyTorch', 'TensorFlow Lite', 'FastAPI', 'Docker', 'OpenCV'],
    targetHackathon: 'Google Gemini Developer Hackathon',
    experienceLevel: 'Intermediate',
    contact: 'sofia.chen.ai@gmail.com',
    lookingFor: 'Teaming up for Google Gemini competition to build a real-time multimodal audio/video app.',
    timePosted: '1 day ago'
  }
];

export const PITCH_DECK_TEMPLATE = [
  {
    slideNumber: 1,
    title: 'Slide 1: The Hook & One-Liner (15 Seconds)',
    purpose: 'Grab the judges\' attention immediately with a relatable scenario or shocking metric.',
    keyElements: [
      'Catchy project name and high-contrast Bauhaus logo',
      'One-line elevator pitch: "We are [X] for [Y] that does [Z]"',
      'The emotional problem: "Last year, 400,000 developers lost 3 hours a day to..."'
    ],
    proTip: 'Never start by introducing team names. Hook the judges with the problem first!'
  },
  {
    slideNumber: 2,
    title: 'Slide 2: The Core Problem & Why Existing Solutions Fail (30 Seconds)',
    purpose: 'Validate that the problem is urgent, expensive, and unsolved.',
    keyElements: [
      'Concrete user persona (e.g. "Meet Sarah, a hospital triage nurse")',
      'The exact 2-3 points of failure in current software/hardware',
      'The cost: Lost money, wasted hours, or security vulnerability'
    ],
    proTip: 'Use a simple visual comparison table or 3 bullet points. No walls of text.'
  },
  {
    slideNumber: 3,
    title: 'Slide 3: The Solution & LIVE DEMO (90 Seconds)',
    purpose: 'Show, don\'t tell! The live demo is 70% of your judging score.',
    keyElements: [
      'Switch immediately to the live screen or recorded backup video',
      'Show the "Happy Path" user flow from start to finish',
      'Highlight the "Magic Moment" (the 1 feature that makes jaws drop)'
    ],
    proTip: 'Always have a 60-second offline screen recording ready in case the venue Wi-Fi fails.'
  },
  {
    slideNumber: 4,
    title: 'Slide 4: Technical Architecture & Sponsor Stacking (30 Seconds)',
    purpose: 'Prove you built something hard during the hackathon and win sponsor prize bounties.',
    keyElements: [
      'Clean system architecture diagram (Frontend -> API -> AI Engine -> Database/Chain)',
      'List sponsor SDKs and APIs prominently with logos',
      'Novelty: Highlight any custom algorithms, sub-200ms latency, or complex logic'
    ],
    proTip: 'Judges love seeing real telemetry, latency metrics, or ZK-proof generation times.'
  },
  {
    slideNumber: 5,
    title: 'Slide 5: Business Viability, Roadmap & Team (15 Seconds)',
    purpose: 'Show this isn\'t just a toy, but the foundation of a real company.',
    keyElements: [
      'Monetization model (B2B SaaS, transaction fee, API credits)',
      'Post-hackathon 30-day roadmap',
      'Team members and relevant superpowers (MIT CS, Ex-Stripe intern, Design lead)'
    ],
    proTip: 'End on a confident note with your live demo URL and GitHub link visible on the closing slide.'
  }
];

export const HACKATHON_TIMELINE_PLAYBOOK = [
  {
    phase: 'Hours 0 – 4: Ideation, Scoping & Architecture',
    badge: 'Ideation & Lock',
    color: 'bg-bauhaus-yellow',
    tasks: [
      'Brainstorm 5 ideas and filter by sponsor prize bounties ($$$).',
      'Ruthlessly cut scope: Define the 1 core "Magic Moment" and cut everything else to V2.',
      'Initialize Git repo, set up CI/CD, Next.js template, Supabase database, and API keys.',
      'Assign clear roles: 1 Frontend Lead, 1 Backend/AI Lead, 1 Pitch & Demo Lead.'
    ]
  },
  {
    phase: 'Hours 4 – 20: Core MVP Sprint (The Build)',
    badge: 'The Heavy Lift',
    color: 'bg-bauhaus-blue text-white',
    tasks: [
      'Build the end-to-end backend pipe first (API call -> Model/Chain -> Response).',
      'Build the high-contrast UI with mock data in parallel.',
      'Integrate the 2-3 sponsor SDKs early to qualify for sponsor mentor help at 2 AM.',
      'Get the first rough working demo running by Hour 16.'
    ]
  },
  {
    phase: 'Hours 20 – 28: Polish, Edge Cases & Zero-Friction UX',
    badge: 'Polish & Delight',
    color: 'bg-bauhaus-red text-white',
    tasks: [
      'Replace all placeholder text with hyper-realistic demo scenarios.',
      'Add loading states, optimistic UI updates, and subtle animations.',
      'Test live deployment on Vercel/Cloudflare from a mobile phone and another laptop.',
      'Sleep for at least 3-4 hours! Exhausted pitch teams lose on stage.'
    ]
  },
  {
    phase: 'Hours 28 – 36: Pitch Deck, Video Recording & Submission',
    badge: 'Winning The Room',
    color: 'bg-bauhaus-black text-white',
    tasks: [
      'Lock all code 4 hours before deadline. No new features.',
      'Record a high-quality 2-minute Loom/YouTube demo video with clear microphone audio.',
      'Craft the 5-slide pitch deck and rehearse the 3-minute presentation 5 times with a timer.',
      'Submit on Devpost / Taikai 1 hour early to avoid site crashes.'
    ]
  }
];
