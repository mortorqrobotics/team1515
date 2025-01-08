import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import getLeaders from '../utils/getLeaders';

const LeadersContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const LeadersGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1100px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeaderCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  min-width: 300px;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 1024px) {
    min-width: unset;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 350px;
  position: relative;
  overflow: hidden;
`;

const LeaderImage = styled.img<{ $position?: string }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $position }) => $position || 'center'};
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

const InfoSection = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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
      <InfoSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Meet Our Leadership Team</Title>
        <Subtitle>
          Our dedicated student leaders drive innovation, inspire excellence, and shape the future 
          of robotics at Team 1515. Each brings unique skills and passion to help our team succeed 
          both in competition and in our community outreach efforts.
        </Subtitle>
      </InfoSection>

      <LeadersGrid
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {leaders.map((leader) => (
          <LeaderCard key={leader.key} variants={cardVariants}>
            <ImageContainer>
              <LeaderImage 
                src={leader.image} 
                alt={leader.name} 
                $position={
                  leader.name.includes("Yury") ? "center 20%" :
                  leader.name.includes("Salkin") ? "center 30%" :
                  leader.name.includes("Xander") ? "center 30%" :
                  "center"
                }
              />
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