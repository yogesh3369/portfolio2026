import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProjectDetail } from './pages/ProjectDetail';
import { ProtectedPrismCaseStudy } from './components/ProtectedPrismCaseStudy';

function App() {
  return (
    <Router>
      <div className="relative">
        <BackgroundVideo />
        <Navbar />
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
