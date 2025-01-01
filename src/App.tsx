import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Outreach from './pages/Outreach';
import Leaders from './pages/Leaders';
import Sponsors from './pages/Sponsors';
import Contact from './pages/Contact';
import { useLayoutEffect } from 'react';

interface ScrollToTopProps {
  children: React.ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  const location = useLocation();
  
  useLayoutEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
    // Prevent horizontal scroll
    document.body.style.overflowX = 'hidden';
  }, [location.pathname]);

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <ScrollToTop>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/outreach" element={<Outreach />} />
              <Route path="/leaders" element={<Leaders />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
          </Routes>
        </ScrollToTop>
      </Router>
    </ThemeProvider>
  );
}

export default App;
