import { getBrandLogo } from '@/data/brandLogos';

interface BrandLogoProps {
  slug: string;
  name?: string;
  size?: number;
  className?: string;
}

export default function BrandLogo({ slug, name, size = 40, className = '' }: BrandLogoProps) {
  const brand = getBrandLogo(slug);
  const svgPath = `/logos/${slug}.svg`;

  return (
    <div
      className={`flex items-center justify-center rounded-xl overflow-hidden flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${brand.bg}, ${brand.bg}cc)`,
      }}
      title={name || slug}
    >
      <img
        src={svgPath}
        alt={name || slug}
        className="w-[60%] h-[60%] object-contain"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = 'none';
          const parent = el.parentElement;
          if (parent) {
            parent.innerHTML = `<span style="color:${brand.fg};font-size:${Math.round(size * 0.38)}px;font-weight:700;letter-spacing:-0.02em">${brand.initials}</span>`;
          }
        }}
      />
    </div>
  );
}
