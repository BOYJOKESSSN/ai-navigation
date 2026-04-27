// Brand logo configurations for all tools
// Uses brand colors for the background, SVG files for the icon

interface BrandConfig {
  initials: string;
  bg: string;
  fg: string;
}

export const brandLogos: Record<string, BrandConfig> = {
  // AI对话
  chatgpt: { initials: 'GP', bg: '#10a37f', fg: '#ffffff' },
  claude: { initials: 'Cl', bg: '#d97706', fg: '#ffffff' },
  perplexity: { initials: 'Pe', bg: '#2563eb', fg: '#ffffff' },
  deepseek: { initials: 'DS', bg: '#1e3a5f', fg: '#ffffff' },
  kimi: { initials: 'Ki', bg: '#7c3aed', fg: '#ffffff' },
  doubao: { initials: 'DB', bg: '#3b82f6', fg: '#ffffff' },
  gemini: { initials: 'Ge', bg: '#4285f4', fg: '#ffffff' },
  coze: { initials: 'Co', bg: '#5B4CF7', fg: '#ffffff' },
  'baidu-cloud': { initials: '百', bg: '#2932E1', fg: '#ffffff' },
  qinyan: { initials: '清', bg: '#6C5CE7', fg: '#ffffff' },
  jimeng: { initials: '即', bg: '#7B5EA7', fg: '#ffffff' },
  cnblogs: { initials: '博', bg: '#1296DB', fg: '#ffffff' },
  // AI绘图
  midjourney: { initials: 'MJ', bg: '#0d1117', fg: '#58a6ff' },
  dalle: { initials: 'DL', bg: '#10a37f', fg: '#ffffff' },
  'stable-diffusion': { initials: 'SD', bg: '#a855f7', fg: '#ffffff' },
  // AI视频
  sora: { initials: 'So', bg: '#1a1a2e', fg: '#e94560' },
  'runway-gen3': { initials: 'Rw', bg: '#1e3a5f', fg: '#60a5fa' },
  kling: { initials: 'Kl', bg: '#1e293b', fg: '#f472b6' },
  luma: { initials: 'Lu', bg: '#0f172a', fg: '#a78bfa' },
  // AI编程
  cursor: { initials: 'Cu', bg: '#7c3aed', fg: '#ffffff' },
  'github-copilot': { initials: 'CP', bg: '#0d1117', fg: '#ffffff' },
  v0: { initials: 'V0', bg: '#0f0f0f', fg: '#ffffff' },
  bolt: { initials: 'Bt', bg: '#18181b', fg: '#f97316' },
  replicate: { initials: 'Rp', bg: '#0d1117', fg: '#ffffff' },
  huggingface: { initials: 'HF', bg: '#1a1a2e', fg: '#ffd21e' },
  // AI音频
  suno: { initials: 'Su', bg: '#1a1a2e', fg: '#f472b6' },
  elevenlabs: { initials: 'EL', bg: '#1e293b', fg: '#38bdf8' },
  descript: { initials: 'De', bg: '#4f46e5', fg: '#ffffff' },
  // 效率工具
  notion: { initials: 'No', bg: '#0d1117', fg: '#ffffff' },
  canva: { initials: 'Ca', bg: '#7c3aed', fg: '#ffffff' },
  figma: { initials: 'Fi', bg: '#1e1e1e', fg: '#f24e1e' },
  grammarly: { initials: 'Gr', bg: '#15c39a', fg: '#ffffff' },
  jasper: { initials: 'Ja', bg: '#18181b', fg: '#f97316' },
  gamma: { initials: 'Ga', bg: '#7c3aed', fg: '#ffffff' },
  // 新增品牌配置
  wenxin: { initials: '文', bg: '#2932E1', fg: '#ffffff' },
  tongyi: { initials: '通', bg: '#FF6A00', fg: '#ffffff' },
  xinghuo: { initials: '讯', bg: '#0066FF', fg: '#ffffff' },
  metaso: { initials: '秘', bg: '#6C5CE7', fg: '#ffffff' },
  yuanbao: { initials: '元', bg: '#07C160', fg: '#ffffff' },
  leonardo: { initials: 'Le', bg: '#A855F7', fg: '#ffffff' },
  ideogram: { initials: 'Id', bg: '#EC4899', fg: '#ffffff' },
  wanxiang: { initials: '万', bg: '#FF6A00', fg: '#ffffff' },
  'jimeng-video': { initials: '即', bg: '#7B5EA7', fg: '#ffffff' },
  pika: { initials: 'Pi', bg: '#F472B6', fg: '#ffffff' },
  windsurf: { initials: 'Ws', bg: '#10B981', fg: '#ffffff' },
  replit: { initials: 'Re', bg: '#F26207', fg: '#ffffff' },
  xiezuocat: { initials: '猫', bg: '#6C5CE7', fg: '#ffffff' },
  'copy-ai': { initials: 'Ca', bg: '#7C3AED', fg: '#ffffff' },
  'notion-writing': { initials: 'No', bg: '#0d1117', fg: '#ffffff' },
  murf: { initials: 'Mu', bg: '#1E3A5F', fg: '#ffffff' },
  'gamma-prod': { initials: 'Ga', bg: '#7c3aed', fg: '#ffffff' },
  otter: { initials: 'Ot', bg: '#2563EB', fg: '#ffffff' },
  'perplexity-prod': { initials: 'Pe', bg: '#2563eb', fg: '#ffffff' },
};

export function getBrandLogo(slug: string): BrandConfig {
  return brandLogos[slug] || { initials: 'AI', bg: '#6366f1', fg: '#ffffff' };
}
