'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  PAST_WINNERS,
  UPCOMING_HACKATHONS,
  HACKATHON_IDEAS,
  TEAMMATE_LISTINGS,
  PITCH_DECK_TEMPLATE,
  HACKATHON_TIMELINE_PLAYBOOK,
  PastWinner,
  UpcomingHackathon,
  HackathonIdea,
  TeammatePost
} from './data';

export default function HackathonView() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'ideas' | 'generator' | 'playbook' | 'teams'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('All');

  // Modal States
  const [selectedHackathonModal, setSelectedHackathonModal] = useState<UpcomingHackathon | null>(null);
  const [selectedWinnerModal, setSelectedWinnerModal] = useState<PastWinner | null>(null);

  // Generator State
  const [genTrack, setGenTrack] = useState<string>('AI Agents');
  const [genDuration, setGenDuration] = useState<string>('36h');
  const [genStrengths, setGenStrengths] = useState<string[]>(['Frontend (Next.js)', 'AI / LLM API']);
  const [generatedResult, setGeneratedResult] = useState<{
    name: string;
    tagline: string;
    problem: string;
    solution: string;
    magicMoment: string;
    bounties: string[];
    stack: string[];
    slides: { number: number; title: string; content: string }[];
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Calendar Link Generators
  const generateGoogleCalendarUrl = (hackathon: UpcomingHackathon) => {
    const title = encodeURIComponent(`${hackathon.name} - Hackathon Kickoff`);
    const details = encodeURIComponent(`${hackathon.tagline}\n\nPrize Pool: ${hackathon.totalPrize}\nWebsite: ${hackathon.websiteUrl}`);
    const location = encodeURIComponent(hackathon.location);
    const startIso = hackathon.startDate.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    const endIso = hackathon.submissionDeadline.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
  };

  const downloadIcsFile = (hackathon: UpcomingHackathon) => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//IdeaVault//Hackathons//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${hackathon.name}`,
      `DESCRIPTION:${hackathon.tagline}\\n\\nWebsite: ${hackathon.websiteUrl}`,
      `LOCATION:${hackathon.location}`,
      `DTSTART:${hackathon.startDate.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      `DTEND:${hackathon.submissionDeadline.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${hackathon.id}-schedule.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📅 Downloaded .ics calendar file!');
  };

  // Generator Function
  const handleGenerateIdea = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const titlesByTrack: Record<string, { name: string; tagline: string; problem: string; solution: string; magicMoment: string; bounties: string[]; stack: string[] }[]> = {
        'AI Agents': [
          {
            name: 'AgenticAudit.dev',
            tagline: 'Self-healing smart contracts through adversarial multi-agent mutation testing.',
            problem: 'Audits take 3 weeks and $50k. Critical re-entrancy bugs slip into production unnoticed.',
            solution: 'An automated agent swarm that writes fuzzing exploits and provides formal mathematical proof of fix.',
            magicMoment: 'Live terminal showing 3 AI agents attacking a vulnerable contract in real time and writing the patch.',
            bounties: ['Best AI Agent System', 'Best Developer Tool', 'Best Security Hack'],
            stack: ['Next.js 15', 'Gemini 1.5 Flash', 'Foundry / Solidity', 'TailwindCSS', 'Supabase Realtime']
          },
          {
            name: 'VoicePR Commander',
            tagline: 'Review and merge GitHub pull requests via voice while commuting.',
            problem: 'Senior devs spend 15 hours a week stuck in static PR diff reviews away from their desk.',
            solution: 'Audio-first PR summaries with interactive voice queries ("Explain why line 42 throws an error").',
            magicMoment: 'Speaking to the phone: "Summarize changes in auth.ts" and receiving instantaneous voice response with audio waveform.',
            bounties: ['Best Voice AI Hack', 'Best Developer Productivity', 'Most Innovative UX'],
            stack: ['Web Speech API', 'Gemini 1.5 Pro', 'GitHub REST API', 'Next.js', 'Vercel Serverless']
          }
        ],
        'Web3 & DeFi': [
          {
            name: 'PasskeyVault Pay',
            tagline: 'Biometric multi-sig vault for cross-border freelancing with zero gas fees.',
            problem: 'Seed phrases and gas token management block 99% of non-crypto clients from paying digital nomads.',
            solution: 'ERC-4337 smart accounts controlled via iPhone FaceID / Android Fingerprint with session keys.',
            magicMoment: 'Approving a $500 payout in 1.2 seconds using native TouchID without opening any wallet extension.',
            bounties: ['Best Account Abstraction Hack', 'Best Consumer Web3', 'Best DeFi Innovation'],
            stack: ['Solidity', 'Passkeys / WebAuthn', 'Viem', 'Base Chain', 'TailwindCSS']
          }
        ],
        'Developer Tools': [
          {
            name: 'TraceScope 3D',
            tagline: 'Visualizing microservice distributed traces as interactive 3D particle nodes.',
            problem: 'Reading massive JSON trace logs from OpenTelemetry during production incidents causes cognitive overload.',
            solution: 'A WebGL 3D network graph where bottlenecks glow red and latency spikes create physical particle waves.',
            magicMoment: 'Clicking a glowing red cluster in 3D and seeing the exact SQL query bottleneck expand in real time.',
            bounties: ['Best DevTool', 'Best UI/UX', 'Best WebGL / Data Viz'],
            stack: ['Three.js', 'Next.js 15', 'OpenTelemetry SDK', 'Tailwind', 'Go Backend']
          }
        ],
        'HealthTech': [
          {
            name: 'EchoBio Stethoscope',
            tagline: 'Smartphone microphone heart murmur and respiratory wheeze AI classifier.',
            problem: 'Rural clinics lack access to specialist cardiologists for early detection of valvular heart disease.',
            solution: 'A web app that records chest acoustic vibrations through the phone microphone and runs on-device spectrogram classification.',
            magicMoment: 'Placing phone on chest -> hearing the filtered audio -> seeing instant confidence heatmap of S1/S2 heart sounds.',
            bounties: ['Best HealthTech', 'Best Mobile Web App', 'AI for Social Good'],
            stack: ['Web Audio API', 'TensorFlow.js', 'Next.js', 'TailwindCSS', 'Supabase Auth']
          }
        ],
        'Climate & Sustainability': [
          {
            name: 'WattShift AI',
            tagline: 'Automated residential appliance scheduler aligned with real-time green grid pricing.',
            problem: 'Consumers want to use solar/wind power, but EV chargers and heat pumps run during peak fossil fuel hours.',
            solution: 'Smart plug IoT integration that shifts high-wattage charging to exact 15-minute zero-carbon grid windows.',
            magicMoment: 'Live simulation showing a household saving $42/month and 120kg CO2 with 1 click.',
            bounties: ['Best Climate Hack', 'Best IoT / Hardware', 'Best Data-Driven App'],
            stack: ['Next.js', 'Gemini 1.5 Flash', 'Open Climate API', 'Chart.js', 'PostgreSQL']
          }
        ]
      };

      const trackList = titlesByTrack[genTrack] || titlesByTrack['AI Agents'];
      const pick = trackList[Math.floor(Math.random() * trackList.length)];

      setGeneratedResult({
        name: pick.name,
        tagline: pick.tagline,
        problem: pick.problem,
        solution: pick.solution,
        magicMoment: pick.magicMoment,
        bounties: pick.bounties,
        stack: pick.stack,
        slides: [
          { number: 1, title: 'Hook & Problem', content: `Start with the core pain: "${pick.problem}"` },
          { number: 2, title: 'Why Now & The Solution', content: `Introduce ${pick.name}: "${pick.tagline}"` },
          { number: 3, title: 'LIVE DEMO (Crucial)', content: `Demonstrate the magic moment: "${pick.magicMoment}"` },
          { number: 4, title: 'Architecture & Sponsor Tech', content: `Stack: ${pick.stack.join(', ')}. Target Bounties: ${pick.bounties.join(', ')}` },
          { number: 5, title: 'Impact & Roadmap', content: 'Future vision: monetization, API integrations, and 30-day alpha launch.' }
        ]
      });
      setIsGenerating(false);
      showToast('✨ Generated custom hackathon project blueprint!');
    }, 600);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(`📋 Copied ${label} to clipboard!`);
  };

  // Filters
  const filteredUpcoming = UPCOMING_HACKATHONS.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.tracks.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === 'All' || h.format === selectedFormat;
    const matchesTrack = selectedTrack === 'All' || h.tracks.some(t => t.toLowerCase().includes(selectedTrack.toLowerCase()));
    return matchesSearch && matchesFormat && matchesTrack;
  });

  const filteredPast = PAST_WINNERS.filter(w => {
    const matchesSearch = w.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.hackathonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.track.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = selectedTrack === 'All' || w.track.toLowerCase().includes(selectedTrack.toLowerCase());
    return matchesSearch && matchesTrack;
  });

  const filteredIdeas = HACKATHON_IDEAS.filter(i => {
    const matchesSearch = i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.solution.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = selectedTrack === 'All' || i.track.toLowerCase().includes(selectedTrack.toLowerCase());
    const matchesTimeframe = selectedTimeframe === 'All' || i.timeframe === selectedTimeframe;
    return matchesSearch && matchesTrack && matchesTimeframe;
  });

  return (
    <div className="w-full pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-bauhaus-black text-white px-6 py-3 border-4 border-white shadow-[6px_6px_0_rgba(17,17,17,1)] font-bold text-sm uppercase flex items-center gap-3 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hero Header */}
      <section className="border-b-4 border-bauhaus-black bg-bauhaus-gray relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-bauhaus-yellow border-2 border-bauhaus-black mb-6 font-bold uppercase text-xs tracking-widest shadow-[3px_3px_0_rgba(17,17,17,1)]">
                <span>⚡ All-In-One Hackathon Headquarters</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.95] mb-6 text-bauhaus-black">
                Hack. <span className="text-bauhaus-red">Pitch.</span> <br />
                <span className="text-bauhaus-blue">Dominate.</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-bauhaus-black/80 mb-8 border-l-4 border-bauhaus-black pl-4">
                Explore major upcoming hackathons, study past winning pitch decks & PPTs, generate bulletproof 24h–48h ideas, and master the winning formula.
              </p>
              
              {/* Quick Jump Badges */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className="bg-white border-2 border-bauhaus-black px-3 py-1 font-bold text-xs uppercase hover:bg-bauhaus-yellow transition-colors shadow-[2px_2px_0_rgba(17,17,17,1)]"
                >
                  📅 Upcoming Hackathons ({UPCOMING_HACKATHONS.length})
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className="bg-white border-2 border-bauhaus-black px-3 py-1 font-bold text-xs uppercase hover:bg-bauhaus-red hover:text-white transition-colors shadow-[2px_2px_0_rgba(17,17,17,1)]"
                >
                  🏆 Past Winners & PPTs ({PAST_WINNERS.length})
                </button>
                <button
                  onClick={() => setActiveTab('ideas')}
                  className="bg-white border-2 border-bauhaus-black px-3 py-1 font-bold text-xs uppercase hover:bg-bauhaus-blue hover:text-white transition-colors shadow-[2px_2px_0_rgba(17,17,17,1)]"
                >
                  💡 Ideas Bank ({HACKATHON_IDEAS.length})
                </button>
                <button
                  onClick={() => setActiveTab('generator')}
                  className="bg-bauhaus-yellow border-2 border-bauhaus-black px-3 py-1 font-bold text-xs uppercase hover:bg-bauhaus-black hover:text-white transition-colors shadow-[2px_2px_0_rgba(17,17,17,1)]"
                >
                  ⚡ AI Idea Generator
                </button>
              </div>
            </div>

            {/* Visual Geometric Accent Card */}
            <div className="border-4 border-bauhaus-black bg-white p-6 shadow-[8px_8px_0_rgba(17,17,17,1)] lg:w-96">
              <div className="flex justify-between items-center border-b-2 border-bauhaus-black pb-3 mb-4">
                <span className="font-bold uppercase tracking-wider text-xs bg-bauhaus-red text-white px-2 py-0.5">Quick Stat</span>
                <span className="font-bold text-xs uppercase">Live Snapshot</span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm uppercase">Total Active Prize Pool</span>
                  <span className="font-bold text-lg text-bauhaus-blue">$1,670,000+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm uppercase">Major Hackathons Listed</span>
                  <span className="font-bold text-lg text-bauhaus-red">8 Flagships</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm uppercase">Curated Winning Decks</span>
                  <span className="font-bold text-lg text-bauhaus-black">6 Case Studies</span>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('generator')}
                className="w-full mt-6 bg-bauhaus-black text-white font-bold uppercase py-3 border-2 border-bauhaus-black hover:bg-bauhaus-blue transition-colors text-center text-sm shadow-[3px_3px_0_rgba(17,17,17,1)]"
              >
                Launch Idea Generator &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Navigation Bar */}
      <div className="sticky top-0 z-30 bg-white border-b-4 border-bauhaus-black shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between overflow-x-auto py-2">
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-2 font-bold uppercase text-xs md:text-sm border-2 border-bauhaus-black transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-bauhaus-blue text-white shadow-[3px_3px_0_rgba(17,17,17,1)]'
                  : 'bg-white hover:bg-bauhaus-gray'
              }`}
            >
              📅 Upcoming Hackathons
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2 font-bold uppercase text-xs md:text-sm border-2 border-bauhaus-black transition-all ${
                activeTab === 'past'
                  ? 'bg-bauhaus-red text-white shadow-[3px_3px_0_rgba(17,17,17,1)]'
                  : 'bg-white hover:bg-bauhaus-gray'
              }`}
            >
              🏆 Past Winners & PPTs
            </button>
            <button
              onClick={() => setActiveTab('ideas')}
              className={`px-4 py-2 font-bold uppercase text-xs md:text-sm border-2 border-bauhaus-black transition-all ${
                activeTab === 'ideas'
                  ? 'bg-bauhaus-yellow text-bauhaus-black shadow-[3px_3px_0_rgba(17,17,17,1)]'
                  : 'bg-white hover:bg-bauhaus-gray'
              }`}
            >
              💡 Ideas & Bounties
            </button>
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-4 py-2 font-bold uppercase text-xs md:text-sm border-2 border-bauhaus-black transition-all ${
                activeTab === 'generator'
                  ? 'bg-bauhaus-black text-white shadow-[3px_3px_0_rgba(17,17,17,1)]'
                  : 'bg-white hover:bg-bauhaus-gray'
              }`}
            >
              ⚡ AI Pitch Generator
            </button>
            <button
              onClick={() => setActiveTab('playbook')}
              className={`px-4 py-2 font-bold uppercase text-xs md:text-sm border-2 border-bauhaus-black transition-all ${
                activeTab === 'playbook'
                  ? 'bg-bauhaus-blue text-white shadow-[3px_3px_0_rgba(17,17,17,1)]'
                  : 'bg-white hover:bg-bauhaus-gray'
              }`}
            >
              🎯 Winning Playbook
            </button>
            <button
              onClick={() => setActiveTab('teams')}
              className={`px-4 py-2 font-bold uppercase text-xs md:text-sm border-2 border-bauhaus-black transition-all ${
                activeTab === 'teams'
                  ? 'bg-bauhaus-yellow text-bauhaus-black shadow-[3px_3px_0_rgba(17,17,17,1)]'
                  : 'bg-white hover:bg-bauhaus-gray'
              }`}
            >
              🤝 Team Finder
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 pt-10">

        {/* ------------------- TAB 1: UPCOMING HACKATHONS ------------------- */}
        {activeTab === 'upcoming' && (
          <div>
            {/* Filter & Search Toolbar */}
            <div className="border-4 border-bauhaus-black bg-white p-6 shadow-[6px_6px_0_rgba(17,17,17,1)] mb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Search Hackathon or Tech</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, track, city..."
                    className="w-full border-2 border-bauhaus-black p-2 font-medium text-sm focus:outline-none focus:bg-bauhaus-gray"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Format</label>
                  <select
                    value={selectedFormat}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className="w-full border-2 border-bauhaus-black p-2 font-medium text-sm focus:outline-none bg-white"
                  >
                    <option value="All">All Formats (Global & In-Person)</option>
                    <option value="In-Person">In-Person Only</option>
                    <option value="Virtual (Global)">Virtual / Online Only</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Track Focus</label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="w-full border-2 border-bauhaus-black p-2 font-medium text-sm focus:outline-none bg-white"
                  >
                    <option value="All">All Tracks</option>
                    <option value="AI">AI & Machine Learning</option>
                    <option value="Web3">Web3 & Crypto</option>
                    <option value="Hardware">Hardware & Edge</option>
                    <option value="Health">Health & BioTech</option>
                    <option value="Climate">Sustainability & Space</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Hackathon Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {filteredUpcoming.map((hackathon) => {
                const isLive = hackathon.status === 'live';
                const isOpen = hackathon.status === 'open';
                return (
                  <div
                    key={hackathon.id}
                    className="border-4 border-bauhaus-black bg-white flex flex-col hover:-translate-y-1.5 transition-transform duration-200 shadow-[6px_6px_0_rgba(17,17,17,1)] relative"
                  >
                    {/* Color Header Banner */}
                    <div className={`h-4 border-b-4 border-bauhaus-black ${hackathon.color}`}></div>

                    <div className="p-6 flex flex-col flex-1">
                      {/* Top Badges */}
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs uppercase px-2 py-0.5 border-2 border-bauhaus-black bg-bauhaus-black text-white">
                            {hackathon.logoBadge}
                          </span>
                          <span className="text-xs font-bold uppercase text-bauhaus-black/60">
                            {hackathon.organizer}
                          </span>
                        </div>
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 border-2 border-bauhaus-black ${
                            isLive
                              ? 'bg-bauhaus-red text-white animate-pulse'
                              : isOpen
                              ? 'bg-bauhaus-yellow text-bauhaus-black'
                              : 'bg-bauhaus-gray'
                          }`}
                        >
                          {isLive ? '🔴 LIVE NOW' : isOpen ? '🟡 REGISTRATION OPEN' : '🔵 UPCOMING'}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold uppercase tracking-tight text-bauhaus-black mb-2">
                        {hackathon.name}
                      </h3>
                      <p className="font-medium text-sm text-bauhaus-black/80 mb-4 line-clamp-2">
                        {hackathon.tagline}
                      </p>

                      {/* Info Pills */}
                      <div className="grid grid-cols-2 gap-2 mb-6 text-xs font-semibold bg-bauhaus-gray p-3 border-2 border-bauhaus-black">
                        <div>
                          <span className="text-bauhaus-black/60 block uppercase text-[10px]">Location & Format</span>
                          <span className="font-bold text-bauhaus-black">{hackathon.location}</span>
                        </div>
                        <div>
                          <span className="text-bauhaus-black/60 block uppercase text-[10px]">Prize Pool</span>
                          <span className="font-bold text-bauhaus-blue">{hackathon.totalPrize}</span>
                        </div>
                        <div>
                          <span className="text-bauhaus-black/60 block uppercase text-[10px]">Start Date</span>
                          <span className="font-bold text-bauhaus-black">
                            {new Date(hackathon.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                        <div>
                          <span className="text-bauhaus-black/60 block uppercase text-[10px]">Registration Due</span>
                          <span className="font-bold text-bauhaus-red">
                            {new Date(hackathon.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </div>
                      </div>

                      {/* Tracks */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {hackathon.tracks.slice(0, 3).map((track) => (
                          <span
                            key={track}
                            className="text-[10px] font-bold uppercase tracking-wider bg-white px-2 py-0.5 border border-bauhaus-black"
                          >
                            {track}
                          </span>
                        ))}
                        {hackathon.tracks.length > 3 && (
                          <span className="text-[10px] font-bold uppercase bg-bauhaus-gray px-1.5 py-0.5 border border-bauhaus-black">
                            +{hackathon.tracks.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-auto pt-4 border-t-2 border-bauhaus-black flex flex-wrap items-center justify-between gap-3">
                        <button
                          onClick={() => setSelectedHackathonModal(hackathon)}
                          className="bg-bauhaus-yellow font-bold uppercase text-xs px-4 py-2 border-2 border-bauhaus-black hover:bg-bauhaus-black hover:text-white transition-colors shadow-[2px_2px_0_rgba(17,17,17,1)]"
                        >
                          View Schedule & Dates 📅
                        </button>
                        <a
                          href={hackathon.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-bauhaus-black text-white font-bold uppercase text-xs px-4 py-2 border-2 border-bauhaus-black hover:bg-bauhaus-red transition-colors flex items-center gap-1 shadow-[2px_2px_0_rgba(17,17,17,1)]"
                        >
                          Official Site ↗
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------- TAB 2: PAST WINNERS & PPTs ------------------- */}
        {activeTab === 'past' && (
          <div>
            <div className="border-4 border-bauhaus-black bg-bauhaus-gray p-6 mb-10 shadow-[6px_6px_0_rgba(17,17,17,1)]">
              <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2">🏆 Hackathon Hall of Fame</h2>
              <p className="font-medium text-sm text-bauhaus-black/80 max-w-3xl">
                Deconstruct the anatomy of winning hackathon projects. Explore real pitch decks (PPTs), working live demos, GitHub repositories, and exact slide-by-slide outlines that secured 1st place prizes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredPast.map((winner) => (
                <div
                  key={winner.id}
                  className="border-4 border-bauhaus-black bg-white flex flex-col shadow-[6px_6px_0_rgba(17,17,17,1)] hover:-translate-y-1.5 transition-transform"
                >
                  <div className={`h-4 border-b-4 border-bauhaus-black ${winner.color}`}></div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-bauhaus-black/60 block">
                          {winner.hackathonName} • {winner.edition} ({winner.year})
                        </span>
                        <h3 className="text-2xl font-bold uppercase tracking-tight text-bauhaus-black mt-1">
                          {winner.projectName}
                        </h3>
                      </div>
                      <span className="text-[11px] font-bold uppercase px-2.5 py-1 border-2 border-bauhaus-black bg-bauhaus-yellow text-bauhaus-black">
                        {winner.prizeAmount}
                      </span>
                    </div>

                    <div className="mb-4 bg-bauhaus-gray p-3 border-2 border-bauhaus-black">
                      <span className="text-[11px] font-bold uppercase text-bauhaus-red block mb-1">
                        🎖️ {winner.award}
                      </span>
                      <p className="text-xs font-semibold text-bauhaus-black/80 italic">
                        "{winner.tagline}"
                      </p>
                    </div>

                    <p className="text-sm font-medium text-bauhaus-black/80 mb-5">
                      {winner.description}
                    </p>

                    {/* Why this won highlights */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider border-b-2 border-bauhaus-black pb-1 mb-2">
                        💡 Why This Won The Judges
                      </h4>
                      <ul className="space-y-1 text-xs font-medium text-bauhaus-black/80">
                        {winner.whyItWon.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-bauhaus-blue font-bold">✓</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {winner.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-bold uppercase bg-bauhaus-gray px-2 py-0.5 border border-bauhaus-black">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Artifact Links (PPT, Demo, GitHub, Video) */}
                    <div className="mt-auto pt-4 border-t-2 border-bauhaus-black flex flex-wrap gap-2 items-center justify-between">
                      <button
                        onClick={() => setSelectedWinnerModal(winner)}
                        className="bg-bauhaus-blue text-white font-bold uppercase text-xs px-4 py-2 border-2 border-bauhaus-black hover:bg-bauhaus-black transition-colors shadow-[2px_2px_0_rgba(17,17,17,1)] flex items-center gap-1.5"
                      >
                        📊 View Pitch Deck / PPT Outline
                      </button>

                      <div className="flex gap-2">
                        {winner.githubUrl && (
                          <a
                            href={winner.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-bauhaus-black px-3 py-1.5 font-bold uppercase text-xs hover:bg-bauhaus-yellow transition-colors"
                          >
                            GitHub ↗
                          </a>
                        )}
                        {winner.demoUrl && (
                          <a
                            href={winner.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-bauhaus-black text-white border-2 border-bauhaus-black px-3 py-1.5 font-bold uppercase text-xs hover:bg-bauhaus-red transition-colors"
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------- TAB 3: CURATED HACKATHON IDEAS ------------------- */}
        {activeTab === 'ideas' && (
          <div>
            {/* Toolbar */}
            <div className="border-4 border-bauhaus-black bg-white p-6 shadow-[6px_6px_0_rgba(17,17,17,1)] mb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Search Ideas</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search problem, AI, Web3, audio..."
                    className="w-full border-2 border-bauhaus-black p-2 font-medium text-sm focus:outline-none focus:bg-bauhaus-gray"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Filter Track</label>
                  <select
                    value={selectedTrack}
                    onChange={(e) => setSelectedTrack(e.target.value)}
                    className="w-full border-2 border-bauhaus-black p-2 font-medium text-sm focus:outline-none bg-white"
                  >
                    <option value="All">All Categories</option>
                    <option value="AI Agents">AI Agents</option>
                    <option value="Web3 & DeFi">Web3 & DeFi</option>
                    <option value="Developer Tools">Developer Tools</option>
                    <option value="Climate & Sustainability">Climate & Sustainability</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="FinTech & Commerce">FinTech & Commerce</option>
                    <option value="Social Impact">Social Impact</option>
                    <option value="Gaming & XR">Gaming & XR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Timeframe</label>
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="w-full border-2 border-bauhaus-black p-2 font-medium text-sm focus:outline-none bg-white"
                  >
                    <option value="All">All Timeframes</option>
                    <option value="24h">24 Hours (Fast Prototype)</option>
                    <option value="36h">36 Hours (Collegiate Standard)</option>
                    <option value="48h">48 Hours (Full Weekend)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ideas Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredIdeas.map((idea) => (
                <div
                  key={idea.id}
                  className={`border-4 border-bauhaus-black bg-white p-6 shadow-[6px_6px_0_rgba(17,17,17,1)] flex flex-col justify-between hover:-translate-y-1.5 transition-transform`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 border-2 border-bauhaus-black bg-bauhaus-yellow text-bauhaus-black">
                        {idea.track}
                      </span>
                      <span className="text-[11px] font-bold uppercase px-2 py-0.5 border-2 border-bauhaus-black bg-bauhaus-gray">
                        ⏱️ {idea.timeframe}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold uppercase tracking-tight text-bauhaus-black mb-3">
                      {idea.title}
                    </h3>

                    <div className="space-y-3 mb-6 text-sm">
                      <div className="border-l-4 border-bauhaus-red pl-3">
                        <span className="text-[10px] font-bold uppercase text-bauhaus-red block">Problem</span>
                        <p className="font-medium text-bauhaus-black/80">{idea.problem}</p>
                      </div>

                      <div className="border-l-4 border-bauhaus-blue pl-3">
                        <span className="text-[10px] font-bold uppercase text-bauhaus-blue block">Hackathon Solution</span>
                        <p className="font-medium text-bauhaus-black/80">{idea.solution}</p>
                      </div>

                      <div className="border-l-4 border-bauhaus-yellow pl-3 bg-bauhaus-gray p-2">
                        <span className="text-[10px] font-bold uppercase text-bauhaus-black block font-mono">🏆 Winning Judge Hook</span>
                        <p className="font-semibold text-bauhaus-black text-xs">{idea.winningHook}</p>
                      </div>
                    </div>

                    {/* Target Bounties */}
                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase text-bauhaus-black/60 block mb-1">Target Prize Bounties</span>
                      <div className="flex flex-wrap gap-1">
                        {idea.targetBounties.map((bounty) => (
                          <span key={bounty} className="text-[10px] font-bold uppercase bg-bauhaus-gray px-2 py-0.5 border border-bauhaus-black">
                            💰 {bounty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-bauhaus-black flex items-center justify-between gap-2 mt-4">
                    <button
                      onClick={() => copyToClipboard(`${idea.title}\n\nProblem: ${idea.problem}\n\nSolution: ${idea.solution}\n\nWinning Hook: ${idea.winningHook}`, idea.title)}
                      className="border-2 border-bauhaus-black px-3 py-1.5 font-bold uppercase text-xs hover:bg-bauhaus-yellow transition-colors"
                    >
                      Copy Brief 📋
                    </button>
                    <Link
                      href="/profile"
                      className="bg-bauhaus-black text-white border-2 border-bauhaus-black px-3 py-1.5 font-bold uppercase text-xs hover:bg-bauhaus-blue transition-colors"
                    >
                      Track in Dashboard &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------- TAB 4: SMART IDEA & PITCH GENERATOR ------------------- */}
        {activeTab === 'generator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="lg:col-span-5 border-4 border-bauhaus-black bg-white p-6 shadow-[6px_6px_0_rgba(17,17,17,1)]">
              <div className="border-b-4 border-bauhaus-black pb-4 mb-6">
                <span className="text-xs font-bold uppercase bg-bauhaus-red text-white px-2 py-0.5 mb-2 inline-block">Interactive Tool</span>
                <h2 className="text-3xl font-bold uppercase tracking-tighter">AI Pitch Generator</h2>
                <p className="text-xs font-medium text-bauhaus-black/70 mt-1">
                  Customize your track, timeframe, and team skills to generate a tailored project concept and 5-slide pitch outline.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase mb-2">1. Target Hackathon Track</label>
                  <select
                    value={genTrack}
                    onChange={(e) => setGenTrack(e.target.value)}
                    className="w-full border-2 border-bauhaus-black p-3 font-bold text-sm bg-bauhaus-gray focus:outline-none"
                  >
                    <option value="AI Agents">🤖 AI Agents & Automation</option>
                    <option value="Web3 & DeFi">⛓️ Web3 & DeFi Protocols</option>
                    <option value="Developer Tools">🛠️ Developer Tools & Infra</option>
                    <option value="HealthTech">🩺 HealthTech & Bio</option>
                    <option value="Climate & Sustainability">🌱 Climate & CleanTech</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-2">2. Hackathon Duration</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['24h', '36h', '48h'].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setGenDuration(dur)}
                        className={`py-2 text-xs font-bold uppercase border-2 border-bauhaus-black transition-colors ${
                          genDuration === dur
                            ? 'bg-bauhaus-blue text-white shadow-[2px_2px_0_rgba(17,17,17,1)]'
                            : 'bg-white hover:bg-bauhaus-gray'
                        }`}
                      >
                        {dur} Sprint
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-2">3. Team Superpowers</label>
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    {['Frontend (Next.js)', 'AI / LLM API', 'Smart Contracts', 'UI/UX Design', 'Backend / DB', 'Hardware / IoT'].map((skill) => {
                      const selected = genStrengths.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => {
                            if (selected) {
                              setGenStrengths(genStrengths.filter((s) => s !== skill));
                            } else {
                              setGenStrengths([...genStrengths, skill]);
                            }
                          }}
                          className={`p-2 border-2 border-bauhaus-black text-left transition-colors ${
                            selected ? 'bg-bauhaus-yellow text-bauhaus-black' : 'bg-white text-bauhaus-black/60'
                          }`}
                        >
                          {selected ? '✓ ' : '+ '} {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateIdea}
                  disabled={isGenerating}
                  className="w-full bg-bauhaus-red text-white font-bold uppercase py-4 border-2 border-bauhaus-black hover:bg-bauhaus-black transition-colors text-sm shadow-[4px_4px_0_rgba(17,17,17,1)] disabled:opacity-50 mt-4"
                >
                  {isGenerating ? 'Synthesizing Winning Concept...' : '⚡ Generate Project & Pitch Deck'}
                </button>
              </div>
            </div>

            {/* Generated Output Showcase */}
            <div className="lg:col-span-7 border-4 border-bauhaus-black bg-white p-6 shadow-[6px_6px_0_rgba(17,17,17,1)]">
              {generatedResult ? (
                <div>
                  <div className="flex justify-between items-start border-b-4 border-bauhaus-black pb-4 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase bg-bauhaus-yellow px-2 py-0.5 border border-bauhaus-black inline-block mb-1">
                        Generated Blueprint
                      </span>
                      <h3 className="text-3xl font-bold uppercase tracking-tight text-bauhaus-black">
                        {generatedResult.name}
                      </h3>
                      <p className="font-bold text-sm text-bauhaus-blue mt-1">
                        "{generatedResult.tagline}"
                      </p>
                    </div>

                    <button
                      onClick={() => copyToClipboard(JSON.stringify(generatedResult, null, 2), generatedResult.name)}
                      className="border-2 border-bauhaus-black px-3 py-1 font-bold text-xs uppercase hover:bg-bauhaus-yellow transition-colors"
                    >
                      Copy All 📋
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="border-2 border-bauhaus-black p-4 bg-bauhaus-gray">
                      <span className="text-[10px] font-bold uppercase text-bauhaus-red block">Problem & Urgency</span>
                      <p className="font-medium text-sm text-bauhaus-black/90">{generatedResult.problem}</p>
                    </div>

                    <div className="border-2 border-bauhaus-black p-4 bg-white">
                      <span className="text-[10px] font-bold uppercase text-bauhaus-blue block">The Solution</span>
                      <p className="font-medium text-sm text-bauhaus-black/90">{generatedResult.solution}</p>
                    </div>

                    <div className="border-2 border-bauhaus-black p-4 bg-bauhaus-yellow/20">
                      <span className="text-[10px] font-bold uppercase text-bauhaus-black block">✨ The 30-Second "Magic Moment" Demo</span>
                      <p className="font-bold text-sm text-bauhaus-black">{generatedResult.magicMoment}</p>
                    </div>
                  </div>

                  {/* 5-Slide Pitch Deck Structure */}
                  <div className="border-t-4 border-bauhaus-black pt-4">
                    <h4 className="font-bold uppercase tracking-wide text-sm mb-3">
                      📊 5-Slide Winning Pitch Structure
                    </h4>
                    <div className="space-y-2">
                      {generatedResult.slides.map((slide) => (
                        <div key={slide.number} className="border-2 border-bauhaus-black p-3 bg-white flex items-start gap-3">
                          <span className="bg-bauhaus-black text-white text-xs font-bold px-2 py-0.5">Slide {slide.number}</span>
                          <div>
                            <h5 className="font-bold text-xs uppercase">{slide.title}</h5>
                            <p className="text-xs text-bauhaus-black/80 font-medium">{slide.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center bg-bauhaus-gray border-2 border-dashed border-bauhaus-black">
                  <div className="w-16 h-16 bg-bauhaus-yellow rounded-full border-4 border-bauhaus-black flex items-center justify-center text-2xl mb-4">
                    💡
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2">Ready to Brainstorm</h3>
                  <p className="text-sm font-medium text-bauhaus-black/70 max-w-sm">
                    Select your parameters on the left and click <strong>"Generate Project & Pitch Deck"</strong> to create a ready-to-pitch hackathon project blueprint.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------- TAB 5: WINNING PLAYBOOK & PPT FORMULA ------------------- */}
        {activeTab === 'playbook' && (
          <div className="space-y-12">
            {/* Header */}
            <div className="border-4 border-bauhaus-black bg-white p-8 shadow-[6px_6px_0_rgba(17,17,17,1)]">
              <h2 className="text-4xl font-bold uppercase tracking-tighter mb-4">
                🎯 The Hackathon Winner's Playbook
              </h2>
              <p className="font-medium text-base text-bauhaus-black/80 max-w-3xl">
                The exact formulas, hour-by-hour timelines, and slide deck structures used by repeat hackathon champions to win top prizes and seed investor attention.
              </p>
            </div>

            {/* 5-Slide Pitch Deck Formula */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 bg-bauhaus-red border-2 border-bauhaus-black"></div>
                <h3 className="text-2xl font-bold uppercase tracking-tight">The 5-Slide Winning Pitch Deck Formula</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PITCH_DECK_TEMPLATE.map((slide) => (
                  <div
                    key={slide.slideNumber}
                    className="border-4 border-bauhaus-black bg-white p-6 shadow-[4px_4px_0_rgba(17,17,17,1)] flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase bg-bauhaus-black text-white px-2 py-0.5 inline-block mb-3">
                        Slide {slide.slideNumber}
                      </span>
                      <h4 className="text-lg font-bold uppercase tracking-tight mb-2">
                        {slide.title}
                      </h4>
                      <p className="text-xs font-semibold text-bauhaus-blue mb-4">
                        🎯 Purpose: {slide.purpose}
                      </p>

                      <div className="border-t-2 border-bauhaus-black/20 pt-3 mb-4">
                        <span className="text-[10px] font-bold uppercase text-bauhaus-black/60 block mb-2">Key Elements</span>
                        <ul className="space-y-1 text-xs font-medium text-bauhaus-black/80">
                          {slide.keyElements.map((el, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-bauhaus-red font-bold">•</span>
                              <span>{el}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-bauhaus-gray p-2.5 border-2 border-bauhaus-black text-[11px] font-bold">
                      💡 Pro Tip: <span className="font-medium text-bauhaus-black/80">{slide.proTip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hour-by-Hour Timeline */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 bg-bauhaus-blue border-2 border-bauhaus-black"></div>
                <h3 className="text-2xl font-bold uppercase tracking-tight">Hour-by-Hour 36h Execution Timeline</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {HACKATHON_TIMELINE_PLAYBOOK.map((phase, idx) => (
                  <div key={idx} className="border-4 border-bauhaus-black bg-white p-6 shadow-[4px_4px_0_rgba(17,17,17,1)]">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold uppercase text-base">{phase.phase}</h4>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 border border-bauhaus-black ${phase.color}`}>
                        {phase.badge}
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs font-medium text-bauhaus-black/80">
                      {phase.tasks.map((task, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="font-bold text-bauhaus-black">{tIdx + 1}.</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------- TAB 6: TEAM FINDER ------------------- */}
        {activeTab === 'teams' && (
          <div>
            <div className="border-4 border-bauhaus-black bg-white p-6 shadow-[6px_6px_0_rgba(17,17,17,1)] mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold uppercase tracking-tighter">🤝 Teammate Matchmaking</h2>
                <p className="font-medium text-sm text-bauhaus-black/80 mt-1">
                  Connect with engineers, designers, and pitch experts for your next hackathon team.
                </p>
              </div>
              <button
                onClick={() => showToast('✨ Teammate posting feature active! Connect directly via contacts below.')}
                className="bg-bauhaus-yellow font-bold uppercase text-xs px-6 py-3 border-2 border-bauhaus-black hover:bg-bauhaus-black hover:text-white transition-colors shadow-[3px_3px_0_rgba(17,17,17,1)] shrink-0"
              >
                + Post Hacker Profile
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TEAMMATE_LISTINGS.map((post) => (
                <div
                  key={post.id}
                  className="border-4 border-bauhaus-black bg-white p-6 shadow-[4px_4px_0_rgba(17,17,17,1)] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold uppercase text-bauhaus-black">{post.name}</h3>
                        <span className="text-xs font-bold uppercase text-bauhaus-blue">{post.role}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase bg-bauhaus-gray px-2 py-0.5 border border-bauhaus-black">
                        {post.experienceLevel}
                      </span>
                    </div>

                    <div className="mb-4 bg-bauhaus-gray p-3 border-2 border-bauhaus-black">
                      <span className="text-[10px] font-bold uppercase text-bauhaus-black/60 block mb-1">Target Hackathon</span>
                      <span className="font-bold text-sm text-bauhaus-red">{post.targetHackathon}</span>
                    </div>

                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase text-bauhaus-black/60 block mb-1">Looking For</span>
                      <p className="font-medium text-xs text-bauhaus-black/80">{post.lookingFor}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.skills.map((skill) => (
                        <span key={skill} className="text-[10px] font-bold uppercase bg-white px-2 py-0.5 border border-bauhaus-black">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-bauhaus-black flex items-center justify-between text-xs">
                    <span className="text-bauhaus-black/50 font-bold uppercase">{post.timePosted}</span>
                    <a
                      href={`mailto:${post.contact}`}
                      className="bg-bauhaus-black text-white font-bold uppercase px-3 py-1.5 border border-bauhaus-black hover:bg-bauhaus-blue transition-colors"
                    >
                      Connect ✉️
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ------------------- MODAL: HACKATHON SCHEDULE & DETAILS ------------------- */}
      {selectedHackathonModal && (
        <div className="fixed inset-0 z-50 bg-bauhaus-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="border-4 border-bauhaus-black bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[10px_10px_0_rgba(17,17,17,1)] p-6 md:p-8 relative">
            <button
              onClick={() => setSelectedHackathonModal(null)}
              className="absolute top-4 right-4 bg-bauhaus-red text-white w-8 h-8 font-bold border-2 border-bauhaus-black flex items-center justify-center hover:bg-bauhaus-black transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-xs uppercase px-2 py-0.5 bg-bauhaus-black text-white">
                {selectedHackathonModal.logoBadge}
              </span>
              <span className="text-xs font-bold uppercase text-bauhaus-black/60">
                {selectedHackathonModal.organizer}
              </span>
            </div>

            <h2 className="text-3xl font-bold uppercase tracking-tight text-bauhaus-black mb-2">
              {selectedHackathonModal.name}
            </h2>
            <p className="font-medium text-sm text-bauhaus-black/80 mb-6">
              {selectedHackathonModal.tagline}
            </p>

            {/* Detailed Timeline Dates Schedule */}
            <div className="border-4 border-bauhaus-black bg-bauhaus-gray p-5 mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-bauhaus-black pb-1">
                📅 Important Dates & Schedule
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center border-b border-bauhaus-black/10 pb-2">
                  <span className="font-bold uppercase text-bauhaus-black/70">Registration Deadline:</span>
                  <span className="font-bold text-bauhaus-red">
                    {new Date(selectedHackathonModal.registrationDeadline).toUTCString()}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-bauhaus-black/10 pb-2">
                  <span className="font-bold uppercase text-bauhaus-black/70">Hackathon Kickoff / Opening:</span>
                  <span className="font-bold text-bauhaus-blue">
                    {new Date(selectedHackathonModal.startDate).toUTCString()}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-bauhaus-black/10 pb-2">
                  <span className="font-bold uppercase text-bauhaus-black/70">Project Submission Deadline:</span>
                  <span className="font-bold text-bauhaus-black">
                    {new Date(selectedHackathonModal.submissionDeadline).toUTCString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold uppercase text-bauhaus-black/70">Demo Day & Awards:</span>
                  <span className="font-bold text-bauhaus-yellow">
                    {new Date(selectedHackathonModal.demoDayDate).toUTCString()}
                  </span>
                </div>
              </div>

              {/* Calendar Sync Actions */}
              <div className="mt-5 pt-4 border-t-2 border-bauhaus-black flex flex-wrap gap-2">
                <a
                  href={generateGoogleCalendarUrl(selectedHackathonModal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-bauhaus-black px-3 py-1.5 font-bold uppercase text-xs hover:bg-bauhaus-yellow transition-colors shadow-[2px_2px_0_rgba(17,17,17,1)]"
                >
                  📅 Add to Google Calendar
                </a>
                <button
                  onClick={() => downloadIcsFile(selectedHackathonModal)}
                  className="bg-white border-2 border-bauhaus-black px-3 py-1.5 font-bold uppercase text-xs hover:bg-bauhaus-blue hover:text-white transition-colors shadow-[2px_2px_0_rgba(17,17,17,1)]"
                >
                  📥 Download .iCal / Outlook
                </button>
              </div>
            </div>

            {/* Overview & Key Info */}
            <div className="space-y-4 text-xs font-medium text-bauhaus-black/80 mb-6">
              <div>
                <span className="font-bold uppercase text-bauhaus-black block mb-1">About This Hackathon</span>
                <p>{selectedHackathonModal.overview}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-white p-3 border-2 border-bauhaus-black">
                <div>
                  <span className="font-bold uppercase text-bauhaus-black/60 block">Eligibility</span>
                  <span className="font-bold text-bauhaus-black">{selectedHackathonModal.eligibility}</span>
                </div>
                <div>
                  <span className="font-bold uppercase text-bauhaus-black/60 block">Team Constraints</span>
                  <span className="font-bold text-bauhaus-black">{selectedHackathonModal.teamSize}</span>
                </div>
              </div>
            </div>

            {/* Sponsors */}
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase text-bauhaus-black/60 block mb-2">Major Sponsors & Bounties</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedHackathonModal.sponsors.map((sp) => (
                  <span key={sp} className="text-[10px] font-bold uppercase bg-bauhaus-gray px-2 py-0.5 border border-bauhaus-black">
                    {sp}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t-2 border-bauhaus-black">
              <button
                onClick={() => setSelectedHackathonModal(null)}
                className="border-2 border-bauhaus-black px-4 py-2 font-bold uppercase text-xs hover:bg-bauhaus-gray transition-colors"
              >
                Close
              </button>
              <a
                href={selectedHackathonModal.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-bauhaus-black text-white border-2 border-bauhaus-black px-6 py-2 font-bold uppercase text-xs hover:bg-bauhaus-red transition-colors"
              >
                Register on Official Website ↗
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- MODAL: WINNING PITCH DECK & ARTIFACTS ------------------- */}
      {selectedWinnerModal && (
        <div className="fixed inset-0 z-50 bg-bauhaus-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="border-4 border-bauhaus-black bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[10px_10px_0_rgba(17,17,17,1)] p-6 md:p-8 relative">
            <button
              onClick={() => setSelectedWinnerModal(null)}
              className="absolute top-4 right-4 bg-bauhaus-red text-white w-8 h-8 font-bold border-2 border-bauhaus-black flex items-center justify-center hover:bg-bauhaus-black transition-colors"
            >
              ✕
            </button>

            <span className="text-xs font-bold uppercase text-bauhaus-black/60 block mb-1">
              {selectedWinnerModal.hackathonName} • {selectedWinnerModal.award}
            </span>
            <h2 className="text-3xl font-bold uppercase tracking-tight text-bauhaus-black mb-2">
              {selectedWinnerModal.projectName}
            </h2>
            <p className="font-bold text-sm text-bauhaus-blue mb-4">
              Team: {selectedWinnerModal.teamName} ({selectedWinnerModal.teamMembers.join(', ')})
            </p>

            {/* Slides Outline */}
            <div className="border-4 border-bauhaus-black bg-bauhaus-gray p-5 mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 border-b-2 border-bauhaus-black pb-1">
                📊 Pitch Deck (PPT) Slide-by-Slide Breakdown
              </h3>

              <div className="space-y-3">
                {selectedWinnerModal.slidesOutline?.map((slide) => (
                  <div key={slide.slideNumber} className="border-2 border-bauhaus-black bg-white p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-bauhaus-black text-white text-[10px] font-bold px-1.5 py-0.5">
                        Slide {slide.slideNumber}
                      </span>
                      <h4 className="font-bold text-xs uppercase">{slide.title}</h4>
                    </div>
                    <p className="text-xs font-medium text-bauhaus-black/80">{slide.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Links & Close */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t-2 border-bauhaus-black">
              <div className="flex gap-2">
                {selectedWinnerModal.demoUrl && (
                  <a
                    href={selectedWinnerModal.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-bauhaus-blue text-white border-2 border-bauhaus-black px-3 py-1.5 font-bold uppercase text-xs hover:bg-bauhaus-black transition-colors"
                  >
                    Open Live Demo ↗
                  </a>
                )}
                {selectedWinnerModal.githubUrl && (
                  <a
                    href={selectedWinnerModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-bauhaus-black px-3 py-1.5 font-bold uppercase text-xs hover:bg-bauhaus-yellow transition-colors"
                  >
                    View Code ↗
                  </a>
                )}
              </div>

              <button
                onClick={() => setSelectedWinnerModal(null)}
                className="bg-bauhaus-black text-white border-2 border-bauhaus-black px-5 py-1.5 font-bold uppercase text-xs hover:bg-bauhaus-red transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
