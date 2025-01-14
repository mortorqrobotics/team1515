import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Section } from "../components/common/Section";
import { useTheme } from 'styled-components';
import team from "../assets/team.jpg";
import abb from "../assets/maxresdefault.jpg";
import abb2 from "../assets/Awards1_d.png";
import abb3 from "../assets/LAR2023_DAY_02_1771-min.jpg";
import abb4 from "../assets/sponsors.jpg";

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
              $imageUrl={abb3}
              $position="center 30%"
            >
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
                  <h3>2023 Team Sustainability Award</h3>
                  <p>Received at the Los Angeles Regional</p>
                </EventCard>
                <EventCard>
                  <h3>Middle School Outreach</h3>
                  <p>Engaging with local schools to promote STEM</p>
                </EventCard>
              </EventList>
              <CTAButton to="/blog">View All News</CTAButton>
            </motion.div>
          </TextContent>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ImagePlaceholder
              $imageUrl={abb2}
              $position="center"
            ></ImagePlaceholder>
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
            <ImagePlaceholder 
              $imageUrl={abb}
              $position="center"
            ></ImagePlaceholder>
          </motion.div>
          <TextContent>
            <motion.div variants={fadeInUpVariants}>
              <Title>Upcoming Events</Title>
              <Description>
                Stay tuned for our upcoming competitions and community events:
              </Description>
              <EventList>
                <EventCard>
                  <h3>Los Angeles Regional</h3>
                  <p>March 13-16, 2025</p>
                </EventCard>
                <EventCard>
                  <h3>Aerospace Valley Regional</h3>
                  <p>April 2-5, 2025</p>
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
              <Title>Outreach and Impact</Title>
              <Description>
                We work with FCLA to teach special needs kids about robotics and organize donation drives to assist the LA homeless population.
              </Description>
              <SectionHighlight>
                Interested in joining our outreach efforts? We'd love to hear from you!
              </SectionHighlight>
              <CTAButton to="/outreach">Get Involved</CTAButton>
            </motion.div>
          </TextContent>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <ImagePlaceholder
              $imageUrl={abb4}
              $position="center"
            ></ImagePlaceholder>
          </motion.div>
        </AnimatedContent>
      </Section>
    </HomeContainer>
  );
};

export default Home;
