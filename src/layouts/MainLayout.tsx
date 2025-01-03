import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Hero from '../components/common/Hero';
import PageTransition from '../components/common/PageTransition';
import home_hero_bg from "../assets/home_hero_bg.webp";

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-between;
  overflow-x: hidden;
`;

const MainContent = styled.main`
  flex: 1 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`;


const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getHeroProps = () => {
    switch (location.pathname) {
      case '/':
        return {
          title: "MORTORQ",
          subtitle: "Striving to inspire future generations to pursue careers in STEM and Entrepreneurship by encouraging inclusion, leadership, ingenuity and teamwork.",
          backgroundImage: home_hero_bg,
          overlay: true,
          height: "100vh",
        };
      case '/about':
        return {
          title: "About MORTORQ",
          subtitle: "Since 2004, Team 1515 has been inspiring innovation and fostering the next generation of STEM leaders.",
          overlay: true,
          height: "70vh",
          align: "center" as const
        };
      case '/outreach':
        return {
          title: "Outreach",
          subtitle: "Empowering our community through STEM education and robotics initiatives",
          height: "60vh",
          align: "center" as const
        };
      case '/leaders':
        return {
          title: "Our Leaders",
          subtitle: "Meet the dedicated individuals who drive our team forward",
          height: "60vh",
          align: "center" as const
        };
      case '/sponsors':
        return {
          title: "Our Sponsors",
          subtitle: "Partners in innovation who make our journey possible",
          height: "60vh",
          align: "center" as const
        };
      case '/contact':
        return {
          title: "Contact Us",
          subtitle: "Get in touch with Team 1515",
          height: "60vh",
          align: "center" as const
        };
      default:
        return {
          title: "404",
          subtitle: "Page not found",
          height: "50vh",
          align: "center" as const
        };
    }
  };

  return (
    <LayoutWrapper>
      <Navigation />
      <Hero {...getHeroProps()} />
      <MainContent>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </MainContent>
      <Footer />
    </LayoutWrapper>
  );
};

export default MainLayout; 