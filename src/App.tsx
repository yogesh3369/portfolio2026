import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProjectDetail } from './pages/ProjectDetail';
import { ProtectedPrismCaseStudy } from './components/ProtectedPrismCaseStudy';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressIndicator } from './components/ScrollProgressIndicator';
import { playClick } from './hooks/useSoundEffects';

function App() {
  useEffect(() => {
    document.addEventListener('click', playClick);
    return () => document.removeEventListener('click', playClick);
  }, []);

  return (
    <Router>
      <div className="relative">
        <CustomCursor />
        <BackgroundVideo />
        <Navbar />
        <ScrollProgressIndicator />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/prism-design-system" element={<ProtectedPrismCaseStudy />} />
          <Route path="/work/:projectSlug" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
