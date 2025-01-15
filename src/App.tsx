import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/globalStyles';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Outreach from './pages/Outreach';
import Leaders from './pages/Leaders';
import Sponsors from './pages/Sponsors';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="outreach" element={<Outreach />} />
            <Route path="leaders" element={<Leaders />} />
            <Route path="sponsors" element={<Sponsors />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
