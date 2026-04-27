import SEOHead from '@/components/SEOHead';
import { Link } from 'react-router-dom';
import { CheckCircle, Heart, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <SEOHead
        title="关于AI导航 - 最权威的AI工具测评平台"
        description="AI导航是专注于AI工具测评与导航的权威平台，提供客观、专业、真实的AI工具使用评测。团队由资深AI使用者组成，长期深度体验各类AI产品。"
        keywords="AI工具导航,AI工具测评,关于我们"
        canonical="https://ainavigation.com/about"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">关于 AI导航</h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            我们是一群 AI 爱好者，致力于帮助每个人找到最适合自己的 AI 工具
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {[
            { icon: CheckCircle, color: 'text-emerald-400', title: '真实测评', desc: '所有测评均为编辑团队真实长期使用体验，不接受任何付费植入' },
            { icon: Shield, color: 'text-blue-400', title: '客观公正', desc: '提供工具的优缺点对比，帮你全面了解，不做片面宣传' },
            { icon: Zap, color: 'text-yellow-400', title: '持续更新', desc: 'AI领域日新月异，我们每周持续更新收录最新最好用的工具' },
            { icon: Heart, color: 'text-red-400', title: '用户优先', desc: '以帮助用户节省时间和金钱为第一出发点，不为流量妥协' },
          ].map(item => (
            <div key={item.title} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-6">
              <item.icon size={24} className={`${item.color} mb-3`} />
              <h3 className="font-semibold text-slate-200 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/40 border border-slate-700/40 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-100 mb-4">我们的使命</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            AI工具的爆发式增长让人眼花缭乱，每天都有新工具涌现。作为普通用户，很难在海量工具中快速找到真正有价值的那几款。
          </p>
          <p className="text-slate-300 leading-relaxed">
            AI导航的使命就是做你的"AI工具把关人"——我们替你踩坑、替你测评、替你对比，最终用最简洁的方式告诉你：<strong className="text-slate-100">哪款值得用，哪款不值得花钱。</strong>
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-100 mb-4">想合作或投稿？</h2>
          <p className="text-slate-400 text-sm mb-6">欢迎优质 AI 工具开发者、测评作者与我们联系</p>
          <div className="flex justify-center gap-4">
            <a href="mailto:hi@ainavigation.com" className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors">
              联系我们
            </a>
            <Link to="/tools" className="px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm font-medium">
              浏览工具库
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
