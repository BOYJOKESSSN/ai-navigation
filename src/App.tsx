import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ToolsPage from '@/pages/ToolsPage';
import ToolDetailPage from '@/pages/ToolDetailPage';
import ReviewsPage from '@/pages/ReviewsPage';
import ArticleDetailPage from '@/pages/ArticleDetailPage';
import AboutPage from '@/pages/AboutPage';
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminTools from '@/pages/admin/AdminTools';
import AdminArticles from '@/pages/admin/AdminArticles';
import ToolForm from '@/pages/admin/ToolForm';
import ArticleForm from '@/pages/admin/ArticleForm';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/tools" element={<PublicLayout><ToolsPage /></PublicLayout>} />
        <Route path="/tools/:slug" element={<PublicLayout><ToolDetailPage /></PublicLayout>} />
        <Route path="/reviews" element={<PublicLayout><ReviewsPage /></PublicLayout>} />
        <Route path="/reviews/:slug" element={<PublicLayout><ArticleDetailPage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="tools" element={<AdminTools />} />
          <Route path="tools/new" element={<ToolForm />} />
          <Route path="tools/edit/:id" element={<ToolForm />} />
          <Route path="articles" element={<AdminArticles />} />
          <Route path="articles/new" element={<ArticleForm />} />
          <Route path="articles/edit/:id" element={<ArticleForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
