import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disables automatic generation of AGENTS.md and CLAUDE.md by next dev
  agentRules: false,
};

export default nextConfig;
