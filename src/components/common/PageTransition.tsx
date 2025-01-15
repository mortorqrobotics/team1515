import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TransitionWrapper = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
`;

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <TransitionWrapper
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </TransitionWrapper>
  );
};

export default PageTransition;