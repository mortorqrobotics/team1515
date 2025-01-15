import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import Hero from '../components/common/Hero';
import PageTransition from '../components/common/PageTransition';
import home_hero_bg from "../assets/home_hero_bg.webp";
import leaders from '../assets/leaders-min.jpg';
import abb from "../assets/lowtaperfade.jpeg"
import abb2 from "../assets/LAR2023_DAY_02_1770-min.jpg"
import abb3 from "../assets/sponsors.jpg"
import abb4 from "../assets/contact.jpg"
import abb5 from "../assets/blogbg.jpg"

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
    if (location.pathname.startsWith('/blog/')) {
      return null;
    }

    const defaultAnimation = {
      title: { opacity: [0, 1], transition: { duration: 0.8, ease: "easeOut" } },
      subtitle: { opacity: [0, 1], transition: { delay: 0.3, duration: 0.8, ease: "easeOut" } }
    };

    switch (location.pathname) {
      case '/':
        return {
          title: "MORTORQ",
          subtitle: "Striving to inspire future generations to pursue careers in STEM and Entrepreneurship by encouraging inclusion, leadership, ingenuity and teamwork.",
          backgroundImage: home_hero_bg,
          overlay: true,
          height: "100vh",
          animate: defaultAnimation
        };
      case '/about':
        return {
          title: "About MORTORQ",
          subtitle: "Since 2004, Team 1515 has been inspiring innovation and fostering the next generation of STEM leaders.",
          overlay: true,
          height: "90vh",
          align: "center" as const,
          backgroundImage: abb2,
          animate: defaultAnimation
        };
      case '/outreach':
        return {
          title: "Outreach",
          subtitle: "Empowering our community through STEM education and robotics initiatives",
          height: "85vh",
          align: "center" as const,
          backgroundImage: abb,
          overlay: true,
          animate: defaultAnimation
        };
      case '/leaders':
        return {
          title: "Our Team",
          subtitle: "Meet the dedicated individuals who drive our team forward",
          backgroundImage: leaders,
          height: "85vh",
          align: "center" as const,
          overlay: true,
          animate: defaultAnimation
        };
      case '/blog':
        return {
          title: "Blog & Updates",
          subtitle: "Stay up to date with Team 1515's latest news, achievements, and insights",
          height: "80vh",
          align: "center" as const,
          backgroundImage: abb5,
          overlay: true,
          animate: defaultAnimation
        };
      case '/sponsors':
        return {
          title: "Sponsors",
          subtitle: "Thank you to our generous sponsors for their support",
          height: "80vh",
          align: "center" as const,
          backgroundImage: abb3,
          overlay: true,
          animate: defaultAnimation
        };
      default:
        return {
          title: "404",
          subtitle: "Page not found",
          height: "50vh",
          align: "center" as const,
          animate: defaultAnimation
        };
    }
  };

  const heroProps = getHeroProps();

  return (
    <LayoutWrapper>
      <Navigation />
      {heroProps && <Hero {...heroProps} />}
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