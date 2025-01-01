import styled from 'styled-components';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: string;
  align?: 'left' | 'center' | 'right';
  overlay?: boolean;
}

const HeroContainer = styled.div<{ $height?: string; $backgroundImage?: string }>`
  width: 100%;
  height: ${({ $height }) => $height || '100vh'};
  background-image: ${({ $backgroundImage }) => 
    $backgroundImage ? `url(${$backgroundImage})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  backdrop-filter: blur(2px);
`;

const Content = styled(motion.div)<{ align?: 'left' | 'center' | 'right' }>`
  position: relative;
  z-index: 2;
  text-align: ${({ align }) => align || 'center'};
  width: 100%;
  max-width: 1200px;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 8vw, 6rem);
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: #FFFFFF;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
  
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
  line-height: 1.8;
  font-weight: 400;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
`;

const LearnMoreButton = styled(motion.button)`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border: 2px solid #FFFFFF;
  color: #FFFFFF;
  text-decoration: none;
  font-weight: 600;
  border-radius: 30px;
  transition: all 0.3s ease;
  cursor: pointer;
  background: transparent;
  font-size: 1.1rem;
  letter-spacing: 1px;
  text-transform: uppercase;

  &:hover {
    background: #FFFFFF;
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const Hero = ({ 
  title, 
  subtitle, 
  backgroundImage, 
  height,
  align = 'center',
  overlay = true 
}: HeroProps) => {
  const formatTitle = (title: string) => {
    if (title === "MORTORQ") {
      return (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span>MOR</span>
          <span className="highlight">TORQ</span>
        </motion.span>
      );
    }
    return title;
  };

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight - 70,
      behavior: 'smooth'
    });
  };

  return (
    <HeroContainer 
      $height={height} 
      $backgroundImage={backgroundImage}
    >
      {overlay && <Overlay />}
      <Content
        align={align}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Title>{formatTitle(title)}</Title>
        {subtitle && (
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {subtitle}
          </Subtitle>
        )}
        <LearnMoreButton
          onClick={handleScroll}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </LearnMoreButton>
      </Content>
    </HeroContainer>
  );
};

export default Hero;