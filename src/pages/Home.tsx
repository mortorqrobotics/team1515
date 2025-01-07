import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Section } from "../components/common/Section";
import { useTheme } from 'styled-components';
import team from "../assets/team.jpg";

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const AnimatedContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const TextContent = styled.div`
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.accent};
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const ImagePlaceholder = styled.div<{ $imageUrl?: string; $position?: string }>`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: ${({ theme }) => theme.colors.mediumGray};
  background-image: ${({ $imageUrl }) => $imageUrl ? `url(${$imageUrl})` : 'none'};
  background-size: cover;
  background-position: ${({ $position }) => $position || 'center'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
`;

const SectionHighlight = styled.div`
  background: ${({ theme }) => theme.colors.lightAccent};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const EventList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const EventCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const CTAButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: ${({ theme }) => theme.spacing.md};
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const Home = () => {
  const theme = useTheme();
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const sectionsInView = sectionRefs.map((ref) =>
    useInView(ref, { 
      once: true,
      amount: 0.4
    })
  );

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <HomeContainer>
      <Section
        ref={sectionRefs[0]}
        initial="hidden"
        animate={sectionsInView[0] ? "visible" : "hidden"}
        variants={fadeInUpVariants}
      >
        <AnimatedContent>
          <TextContent>
            <motion.div variants={fadeInUpVariants}>
              <Title>About Us</Title>
              <Description>
                Team 1515 is dedicated to excellence in robotics and innovation.
                As a student-led group from Beverly Hills High School, we strive
                to inspire creativity, collaboration, and passion for STEM
                fields.
              </Description>
              <Description>
                Our team participates in the FIRST Robotics Competition (FRC),
                building not just robots but also community connections through
                outreach and education.
              </Description>
              <CTAButton to="/about">Learn More About Us</CTAButton>
            </motion.div>
          </TextContent>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ImagePlaceholder 
              $imageUrl="/path/to/image.jpg"
              $position="center 30%"
            >
              Image Placeholder
            </ImagePlaceholder>
          </motion.div>
        </AnimatedContent>
      </Section>
      <Section
        ref={sectionRefs[1]}
        initial="hidden"
        animate={sectionsInView[1] ? "visible" : "hidden"}
        variants={fadeInUpVariants}
        $bgColor={theme.colors.lightAccent}
      >
        <AnimatedContent>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ImagePlaceholder 
              $imageUrl={team}
              $position="center"
            >
            </ImagePlaceholder>
          </motion.div>
          <TextContent>
            <motion.div variants={fadeInUpVariants}>
              <Title>Our Team</Title>
              <Description>
                Behind every great robot is an even greater team. Meet the
                dedicated students, mentors, and alumni who make Team 1515
                thrive.
              </Description>
              <SectionHighlight>
                Interested in joining? We're always looking for passionate
                students to join our team!
              </SectionHighlight>
              <CTAButton to="/leaders">Meet Our Team</CTAButton>
            </motion.div>
          </TextContent>
        </AnimatedContent>
      </Section>
      <Section
        ref={sectionRefs[2]}
        initial="hidden"
        animate={sectionsInView[2] ? "visible" : "hidden"}
        variants={fadeInUpVariants}
      >
        <AnimatedContent>
          <TextContent>
            <motion.div variants={fadeInUpVariants}>
              <Title>Recent Achievements</Title>
              <Description>
                Explore the latest highlights from Team 1515:
              </Description>
              <EventList>
                <EventCard>
                  <h3>Regional Champions 2023</h3>
                  <p>First place in the Los Angeles Regional Competition</p>
                </EventCard>
                <EventCard>
                  <h3>Community Impact Award</h3>
                  <p>Recognition for our STEM outreach programs</p>
                </EventCard>
              </EventList>
              <CTAButton to="/news">View All News</CTAButton>
            </motion.div>
          </TextContent>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ImagePlaceholder>Achievement Image</ImagePlaceholder>
          </motion.div>
        </AnimatedContent>
      </Section>
      <Section
        ref={sectionRefs[3]}
        initial="hidden"
        animate={sectionsInView[3] ? "visible" : "hidden"}
        variants={fadeInUpVariants}
        $bgColor={theme.colors.lightAccent}
      >
        <AnimatedContent>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ImagePlaceholder>Competition Image</ImagePlaceholder>
          </motion.div>
          <TextContent>
            <motion.div variants={fadeInUpVariants}>
              <Title>Upcoming Events</Title>
              <Description>
                Stay tuned for our upcoming competitions and community events:
              </Description>
              <EventList>
                <EventCard>
                  <h3>Regional Competition 2024</h3>
                  <p>March 15-17, 2024 at Los Angeles Convention Center</p>
                </EventCard>
                <EventCard>
                  <h3>Community STEM Workshop</h3>
                  <p>April 5, 2024 at Beverly Hills High School</p>
                </EventCard>
              </EventList>
              <SectionHighlight>
                Check back here or follow us on social media for updates and
                detailed schedules!
              </SectionHighlight>
            </motion.div>
          </TextContent>
        </AnimatedContent>
      </Section>

      <Section
        ref={sectionRefs[4]}
        initial="hidden"
        animate={sectionsInView[4] ? "visible" : "hidden"}
        variants={fadeInUpVariants}
      >
        <AnimatedContent>
          <TextContent>
            <motion.div variants={fadeInUpVariants}>
              <Title>Our Sponsors</Title>
              <Description>
                Team 1515 extends heartfelt gratitude to our sponsors for their
                invaluable support. Your partnership fuels our success and
                inspires our future.
              </Description>
              <SectionHighlight>
                Interested in becoming a sponsor? We'd love to hear from you!
              </SectionHighlight>
              <CTAButton to="/sponsors">Become a Sponsor</CTAButton>
            </motion.div>
          </TextContent>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ImagePlaceholder>Sponsor Logos</ImagePlaceholder>
          </motion.div>
        </AnimatedContent>
      </Section>
    </HomeContainer>
  );
};

export default Home;
