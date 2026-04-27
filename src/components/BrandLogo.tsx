import { getBrandLogo } from '@/data/brandLogos';

interface BrandLogoProps {
  slug: string;
  name?: string;
  size?: number;
  className?: string;
}

export default function BrandLogo({ slug, name, size = 40, className = '' }: BrandLogoProps) {
  const brand = getBrandLogo(slug);
  const fontSize = Math.round(size * 0.38);

  return (
    <div
      className={`flex items-center justify-center rounded-lg overflow-hidden flex-shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${brand.bg}, ${brand.bg}dd)`,
      }}
      title={name || slug}
    >
      <span
        style={{ color: brand.fg, fontSize, fontWeight: 700, letterSpacing: '-0.02em' }}
      >
        {brand.initials}
      </span>
    </div>
  );
}
