import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BackgroundVideo } from './components/BackgroundVideo';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ProjectDetail } from './pages/ProjectDetail';
import { PrismCaseStudy } from './components/PrismCaseStudy';

function App() {
  return (
    <Router>
      <div className="relative">
        <BackgroundVideo />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/prism-design-system" element={<PrismCaseStudy />} />
          <Route path="/work/:projectSlug" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
