import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../components/common/Section';

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  imageUrl?: string;
  location: string;
  category: 'workshop' | 'competition' | 'community' | 'other';
  impact?: string;
  participants?: number;
}

const OutreachContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const EventGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const EventCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const EventImage = styled.div<{ imageUrl?: string }>`
  width: 100%;
  height: 200px;
  background: ${({ imageUrl, theme }) => 
    imageUrl ? `url(${imageUrl})` : theme.colors.mediumGray};
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

const CategoryTag = styled.span<{ category: Event['category'] }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ category, theme }) => {
    switch (category) {
      case 'workshop': return theme.colors.primary;
      case 'competition': return theme.colors.accent;
      case 'community': return theme.colors.lightAccent;
      default: return theme.colors.mediumGray;
    }
  }};
  color: white;
  border-radius: 4px;
  font-size: 0.8rem;
  text-transform: uppercase;
`;

// Temporary mock data - replace with CMS data later
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'STEM Workshop for Kids',
    date: '2024-04-15',
    description: 'Interactive robotics workshop for elementary school students',
    location: 'Beverly Hills Elementary',
    category: 'workshop',
    participants: 30,
    impact: 'Introduced 30 students to basic robotics concepts'
  },
  // Add more mock events as needed
];

const Outreach = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

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
          {mockEvents.map((event) => (
            <EventCard key={event.id} variants={cardVariants}>
              <EventImage imageUrl={event.imageUrl} />
              <EventContent>
                <EventTitle>{event.title}</EventTitle>
                <EventMeta>
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span>{event.location}</span>
                </EventMeta>
                <EventDescription>{event.description}</EventDescription>
                <CategoryTag category={event.category}>
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