import styled from 'styled-components';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  height?: string;
  align?: 'left' | 'center' | 'right';
  overlay?: boolean;
  animate?: {
    title?: any;
    subtitle?: any;
  };
}

const HeroSection = styled(motion.section)<{ $height?: string; $backgroundImage?: string; $overlay?: boolean }>`
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height || '100vh'};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${({ $backgroundImage }) => $backgroundImage ? `url(${$backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: ${({ theme }) => theme.spacing.xl};
  color: #FFFFFF;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $overlay }) => $overlay ? 'rgba(0, 0, 0, 0.5)' : 'none'};
    z-index: 1;
  }
`;

const HeroContent = styled.div<{ $align?: string }>`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  text-align: ${({ $align }) => $align || 'center'};
  z-index: 2;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: #FFFFFF;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.1;
  
  .highlight {
    color: ${({ theme }) => theme.colors.primary};
    display: inline-block;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: #FFFFFF;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.5;
  font-weight: 400;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);  
  opacity: 0.9;
  letter-spacing: -0.01em;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  cursor: pointer;
  
  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border-right: 2px solid #FFFFFF;
    border-bottom: 2px solid #FFFFFF;
    transform: rotate(45deg);
    transition: border-color 0.2s ease;
  }

  &:hover::before {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Hero = ({
  title,
  subtitle,
  backgroundImage,
  height,
  align = 'center',
  overlay = false,
  animate
}: HeroProps) => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  const defaultTitleAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const defaultSubtitleAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.3, duration: 0.8, ease: "easeOut" } }
  };

  return (
    <HeroSection
      $height={height}
      $backgroundImage={backgroundImage}
      $overlay={overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <HeroContent $align={align}>
        <Title
          initial={animate?.title?.initial || defaultTitleAnimation.initial}
          animate={animate?.title || defaultTitleAnimation.animate}
        >
          {title}
        </Title>
        <Subtitle
          initial={animate?.subtitle?.initial || defaultSubtitleAnimation.initial}
          animate={animate?.subtitle || defaultSubtitleAnimation.animate}
        >
          {subtitle}
        </Subtitle>
      </HeroContent>
      <ScrollIndicator
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ y: 3, transition: { duration: 0.2 } }}
        onClick={scrollToContent}
      />
    </HeroSection>
  );
};

export default Hero;