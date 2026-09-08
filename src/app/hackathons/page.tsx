import type { Metadata } from 'next';
import HackathonView from './HackathonView';

export const metadata: Metadata = {
  title: 'Hackathons & Ideas Hub | IdeaVault',
  description: 'Explore upcoming major hackathons, study past winning pitch decks and PPTs, find curated 24h-48h hackathon ideas, and generate winning project blueprints.',
};

export default function HackathonsPage() {
  return (
    <div className="min-h-screen bg-background">
      <HackathonView />
    </div>
  );
}
