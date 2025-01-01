import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SponsorsContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const Section = styled(motion.section)<{ bgColor?: string }>`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
`;

const Content = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const SponsorGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const SponsorCard = styled(motion.div)`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`;

const SponsorLogo = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SponsorDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const sponsors = [
  {
    id: 1,
    name: "Sponsor One",
    logo: "/path-to-logo1.png", // Replace with actual logo path
    description: "Sponsor One supports our mission to inspire students in STEM.",
  },
  {
    id: 2,
    name: "Sponsor Two",
    logo: "/path-to-logo2.png", // Replace with actual logo path
    description: "Sponsor Two provides resources for our robotics programs.",
  },
  // Add more sponsors as needed
];

const Sponsors = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <SponsorsContainer>
      <Section
        ref={sectionRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <Content>
          <Title>Sponsors</Title>
          <SponsorGrid>
            {sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} variants={cardVariants}>
                <SponsorLogo src={sponsor.logo} alt={sponsor.name} />
                <SponsorDescription>{sponsor.description}</SponsorDescription>
              </SponsorCard>
            ))}
          </SponsorGrid>
        </Content>
      </Section>
    </SponsorsContainer>
  );
};

export default Sponsors;