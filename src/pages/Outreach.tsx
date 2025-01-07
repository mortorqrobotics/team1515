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