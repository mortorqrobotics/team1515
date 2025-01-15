import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useRef, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Section } from "../components/common/Section";
import { useTheme } from 'styled-components';
import team from "../assets/team.jpg";
import abb from "../assets/maxresdefault.jpg";
import abb2 from "../assets/Awards1_d.png";
import abb3 from "../assets/LAR2023_DAY_02_1771-min.jpg";
import abb4 from "../assets/sponsors.jpg";
import getSponsors from '../utils/getSponsors';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const AnimatedContent = styled(motion.create("div"))`
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

const ContactWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Content = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  margin-top: ${({ theme }) => theme.spacing.xl};
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: ${({ theme }) => theme.spacing.xl} auto 0;
  }
`;

const ContactInfo = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.accent};
    font-weight: 700;
    line-height: 1.2;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  .contact-details {
    margin-top: ${({ theme }) => theme.spacing.xl};
    padding-top: ${({ theme }) => theme.spacing.lg};
    border-top: 1px solid ${({ theme }) => `${theme.colors.mediumGray}20`};
    
    p {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacing.sm};
      margin-bottom: ${({ theme }) => theme.spacing.md};
    }
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  background: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.mediumGray};
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.mediumGray};
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(motion.button)`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const InfoBox = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TierList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TierItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => `${theme.colors.mediumGray}08`};
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.mediumGray}12`};
  }

  strong {
    display: block;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.1rem;
    letter-spacing: -0.01em;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    padding-left: 1.5em;
    margin-bottom: 4px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;

    &:before {
      content: "•";
      position: absolute;
      left: 0.5em;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const SponsorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const SponsorTier = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const TierTitle = styled.h3`
  font-size: 1.8rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const SponsorCard = styled(motion.create("div"))`
  background: white;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    max-width: 180px;
    height: auto;
    margin: 0 auto ${({ theme }) => theme.spacing.md};
  }

  h4 {
    font-size: 1.2rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.mediumGray};
  }
`;

const ContactSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

const ContactCard = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ContactTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ContactText = styled.p`
  color: ${({ theme }) => theme.colors.mediumGray};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const StatusMessage = styled.div<{ $success?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  text-align: center;
  background-color: ${({ theme, $success }) => 
    $success ? theme.colors.success : '#dc3545'};
  color: white;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Home = () => {
  const theme = useTheme();
  const sectionRefs = [
    useRef(null),
    useRef(null),
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      const response = await fetch('https://formsubmit.co/1515mortorq@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        },
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <HomeContainer>
      <Section
        ref={sectionRefs[0]}
        initial="hidden"
        animate={sectionsInView[0] ? "visible" : "hidden"}
        variants={fadeInVariants}
      >
        <AnimatedContent>
          <TextContent>
            <motion.div variants={fadeInVariants}>
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
          <motion.div variants={fadeInVariants}>
            <ImagePlaceholder 
              $imageUrl={abb3}
              $position="center 30%"
            />
          </motion.div>
        </AnimatedContent>
      </Section>
      <Section
        ref={sectionRefs[1]}
        initial="hidden"
        animate={sectionsInView[1] ? "visible" : "hidden"}
        variants={fadeInVariants}
        $bgColor={theme.colors.lightAccent}
      >
        <AnimatedContent>
          <motion.div variants={fadeInVariants}>
            <ImagePlaceholder 
              $imageUrl={team}
              $position="center"
            />
          </motion.div>
          <TextContent>
            <motion.div variants={fadeInVariants}>
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
        variants={fadeInVariants}
      >
        <AnimatedContent>
          <TextContent>
            <motion.div variants={fadeInVariants}>
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
          <motion.div variants={fadeInVariants}>
            <ImagePlaceholder
              $imageUrl={abb2}
              $position="center"
            />
          </motion.div>
        </AnimatedContent>
      </Section>
      <Section
        ref={sectionRefs[3]}
        initial="hidden"
        animate={sectionsInView[3] ? "visible" : "hidden"}
        variants={fadeInVariants}
        $bgColor={theme.colors.lightAccent}
      >
        <AnimatedContent>
          <motion.div variants={fadeInVariants}>
            <ImagePlaceholder 
              $imageUrl={abb}
              $position="center"
            />
          </motion.div>
          <TextContent>
            <motion.div variants={fadeInVariants}>
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
        variants={fadeInVariants}
      >
        <AnimatedContent>
          <TextContent>
            <motion.div variants={fadeInVariants}>
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
          <motion.div variants={fadeInVariants}>
            <ImagePlaceholder
              $imageUrl={abb4}
              $position="center"
            />
          </motion.div>
        </AnimatedContent>
      </Section>

      <Section
        ref={sectionRefs[6]}
        initial="hidden"
        animate={sectionsInView[6] ? "visible" : "hidden"}
        variants={fadeInVariants}
        $bgColor={theme.colors.lightAccent}
      >
        <Content variants={fadeInVariants}>
          <Title>Get in Touch</Title>
          <Description style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            Have questions about our team or interested in sponsorship opportunities? 
            We'd love to hear from you!
          </Description>

          <ContactGrid>
            <ContactInfo>
              <h2>Let's Connect</h2>
              <p>
                Have questions about joining Team 1515? Want to sponsor our robotics journey? 
                Or just curious about what we do? We'd love to hear from you!
              </p>
              <div className="contact-details">
                <p>📧 1515mortorq@gmail.com</p>
                <p>📍 Beverly Hills High School, 241 S Moreno Dr, Beverly Hills, CA 90212</p>
                <p>🤖 FRC Team 1515 - MorTorq</p>
              </div>
            </ContactInfo>

            <ContactForm 
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <InputGroup>
                <Label>Name</Label>
                <Input 
                  type="text" 
                  name="name" 
                  required 
                  disabled={isSubmitting}
                  placeholder="Your name"
                />
              </InputGroup>
              
              <InputGroup>
                <Label>Email</Label>
                <Input 
                  type="email" 
                  name="email" 
                  required 
                  disabled={isSubmitting}
                  placeholder="Your email address"
                />
              </InputGroup>
              
              <InputGroup>
                <Label>Subject</Label>
                <Input 
                  type="text" 
                  name="subject" 
                  required 
                  disabled={isSubmitting}
                  placeholder="What's this about?"
                />
              </InputGroup>
              
              <InputGroup>
                <Label>Message</Label>
                <TextArea 
                  name="message" 
                  required 
                  disabled={isSubmitting}
                  placeholder="Your message here..."
                />
              </InputGroup>
              
              {/* Hidden input for formsubmit.co configuration */}
              <input 
                type="hidden" 
                name="_next" 
                value={window.location.href}
              />
              <input 
                type="hidden" 
                name="_subject" 
                value="New Contact Form Submission from Home Page"
              />
              
              <SubmitButton
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </SubmitButton>

              {submitStatus === 'success' && (
                <StatusMessage $success>
                  Message sent successfully!
                </StatusMessage>
              )}
              
              {submitStatus === 'error' && (
                <StatusMessage>
                  Failed to send message. Please try again.
                </StatusMessage>
              )}
            </ContactForm>
          </ContactGrid>
        </Content>
      </Section>
    </HomeContainer>
  );
};

export default Home;
