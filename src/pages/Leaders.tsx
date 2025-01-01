import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import getLeaders from '../utils/getLeaders';

const LeadersContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const LeadersGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const LeaderCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

const LeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${LeaderCard}:hover & {
    transform: scale(1.05);
  }
`;

const LeaderInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Name = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Role = styled.h4`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Leaders = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });
  const leaders = useMemo(getLeaders, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <LeadersContainer>
      <LeadersGrid
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {leaders.map((leader) => (
          <LeaderCard key={leader.key} variants={cardVariants}>
            <ImageContainer>
              <LeaderImage src={leader.image} alt={leader.name} />
            </ImageContainer>
            <LeaderInfo>
              <Name>{leader.name}</Name>
              <Role>{leader.role}</Role>
              <Description>{leader.description}</Description>
              <SocialLinks>
                {leader.linkedin && (
                  <SocialLink href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </SocialLink>
                )}
                {leader.github && (
                  <SocialLink href={leader.github} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </SocialLink>
                )}
              </SocialLinks>
            </LeaderInfo>
          </LeaderCard>
        ))}
      </LeadersGrid>
    </LeadersContainer>
  );
};

export default Leaders;