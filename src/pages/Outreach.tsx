import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Section } from '../components/common/Section';
import getOutreachEvents from '../utils/getOutreachEvents';

const OutreachContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const EventGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  min-width: 400px;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 1024px) {
    min-width: unset;
  }
`;

const EventImage = styled.div<{ $imageUrl?: string }>`
  width: 100%;
  height: 300px;
  background: ${({ $imageUrl, theme }) => 
    $imageUrl ? `url('${$imageUrl}')` : theme.colors.mediumGray};
  background-size: cover;
  background-position: center;
`;

const EventContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const EventTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.accent};
`;

const EventMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
`;

const EventDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CategoryTag = styled.span<{ $category: string }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ $category, theme }) => {
    switch ($category) {
      case 'workshop': return theme.colors.primary;
      case 'competition': return theme.colors.accent;
      case 'community': return theme.colors.primary;
      default: return theme.colors.mediumGray;
    }
  }};
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: uppercase;
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

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;

const Outreach = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const events = useMemo(getOutreachEvents, []);

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
    <OutreachContainer>
      <InfoSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Community Outreach</Title>
        <Subtitle>
          At Team 1515, we are passionate about making STEM education accessible and exciting. 
          Through hands-on workshops, mentoring programs, and participation in local events, 
          we aim to inspire the next generation of innovators and leaders. From teaching 
          robotics basics to middle school students to showcasing our creations at community 
          festivals, our outreach efforts are designed to spark curiosity and empower future 
          problem-solvers.
        </Subtitle>
        
        <Stats>
          {[
            { number: "1000+", label: "Students Reached" },
            { number: "10+", label: "Annual Events" },
          ].map((stat, index) => (
            <StatItem
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </Stats>
      </InfoSection>

      <Section>
        <EventGrid
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {events.map((event) => (
            <EventCard key={event.key} variants={cardVariants}>
              <EventImage $imageUrl={event.imageUrl} />
              <EventContent>
                <EventTitle>{event.title}</EventTitle>
                <EventMeta>
                  {/* <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span>{event.location}</span> */}
                </EventMeta>
                <EventDescription>{event.description}</EventDescription>
                <CategoryTag $category={event.category}>
                  {event.category}
                </CategoryTag>
              </EventContent>
            </EventCard>
          ))}
        </EventGrid>
      </Section>
    </OutreachContainer>
  );
};

export default Outreach;