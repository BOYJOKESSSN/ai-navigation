import { getBrandLogo } from '@/data/brandLogos';

interface BrandLogoProps {
  slug: string;
  name?: string;
  size?: number;
  className?: string;
}

export default function BrandLogo({ slug, name, size = 48, className = '' }: BrandLogoProps) {
  const brand = getBrandLogo(slug);
  const svgPath = `/logos/${slug}.svg`;

  return (
    <div
      className={`flex items-center justify-center rounded-xl overflow-hidden flex-shrink-0 shadow-lg ${className}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        background: `linear-gradient(145deg, ${brand.bg}, ${adjustBrightness(brand.bg, -15)})`,
        boxShadow: `0 4px 12px ${brand.bg}33`,
      }}
      title={name || slug}
    >
      <img
        src={svgPath}
        alt={name || slug}
        className="w-[58%] h-[58%] object-contain"
        loading="lazy"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = 'none';
          const parent = el.parentElement;
          if (parent) {
            parent.innerHTML = `<span style="color:${brand.fg};font-size:${Math.round(size * 0.38)}px;font-weight:700;letter-spacing:-0.02em;line-height:1">${brand.initials}</span>`;
          }
        }}
      />
    </div>
  );
}

// Helper function to adjust color brightness
function adjustBrightness(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
}
