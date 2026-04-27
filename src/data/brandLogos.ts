// Brand logo configurations for each tool
// Uses colored initials + brand colors instead of external URLs

interface BrandConfig {
  initials: string;
  bg: string;
  fg: string;
  emoji?: string;
}

export const brandLogos: Record<string, BrandConfig> = {
  chatgpt: { initials: 'GP', bg: '#10a37f', fg: '#ffffff', emoji: '💬' },
  midjourney: { initials: 'MJ', bg: '#0d1117', fg: '#58a6ff', emoji: '🎨' },
  cursor: { initials: 'Cu', bg: '#7c3aed', fg: '#ffffff', emoji: '⚡' },
  sora: { initials: 'So', bg: '#1a1a2e', fg: '#e94560', emoji: '🎬' },
  claude: { initials: 'Cl', bg: '#d97706', fg: '#ffffff', emoji: '🤖' },
  'runway-gen3': { initials: 'Rw', bg: '#1e3a5f', fg: '#60a5fa', emoji: '🎥' },
  perplexity: { initials: 'Pe', bg: '#2563eb', fg: '#ffffff', emoji: '🔍' },
  elevenlabs: { initials: 'EL', bg: '#1e293b', fg: '#38bdf8', emoji: '🎙️' },
};

export function getBrandLogo(slug: string): BrandConfig {
  return brandLogos[slug] || { initials: 'AI', bg: '#6366f1', fg: '#ffffff', emoji: '🤖' };
}
