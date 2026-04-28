import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1"
      aria-label="回到顶部"
      title="回到顶部"
    >
      <ArrowUp size={20} />
    </button>
  );
}
