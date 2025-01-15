import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from 'styled-components';

const AboutContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const Section = styled(motion.section)<{ $bgColor?: string }>`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
  background-color: ${({ $bgColor }) => $bgColor || 'transparent'};
  position: relative;

  &:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
  }
`;

const Content = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

// Reusing animation variants from Home page
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const Text = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const ValueCard = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.lg};
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ValueTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyledList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ListItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:before {
    content: "•";
    color: ${({ theme }) => theme.colors.accent};
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const About = () => {
  const theme = useTheme();
  const sectionRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
  const sectionInView = sectionRefs.map(ref => useInView(ref, { 
    once: true, 
    margin: "-40px"
  }));

  return (
    <AboutContainer>
      <Section
        ref={sectionRefs[0]}
        initial="hidden"
        animate={sectionInView[0] ? "visible" : "hidden"}
        variants={staggerChildren}
      >
        <Content variants={fadeInUpVariants}>
          <Title>About Team 1515</Title>
          <Text>
            Welcome to Team 1515 MorTorq Robotics, the robotics team from Beverly Hills High School! 
            Founded in 2004, we are proud participants in the FIRST Robotics Competition (FRC), 
            where innovation meets teamwork.
          </Text>
          <Text>
            Our mission is simple yet powerful: to inspire creativity, foster collaboration, 
            and ignite a passion for STEM (Science, Technology, Engineering, and Mathematics). 
            Each year, we design, build, and program robots to compete on an international stage, 
            but our efforts go far beyond competition.
          </Text>
        </Content>
      </Section>

      <Section
        ref={sectionRefs[1]}
        initial="hidden"
        animate={sectionInView[1] ? "visible" : "hidden"}
        variants={staggerChildren}
        $bgColor={theme.colors.lightAccent}
      >
        <Content variants={fadeInUpVariants}>
          <Title>Our Values</Title>
          <Grid>
            {['Innovation', 'Teamwork', 'Education', 'Community'].map((value, index) => (
              <ValueCard
                key={value}
                whileHover={{ y: -10 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.2 }
                  }
                }}
              >
                <ValueTitle>{value}</ValueTitle>
                <Text>
                  {value === 'Innovation' && 'Combining cutting-edge technology with imaginative problem-solving.'}
                  {value === 'Teamwork' && 'Building robots and relationships that last.'}
                  {value === 'Education' && 'Empowering students to develop technical, leadership, and communication skills.'}
                  {value === 'Community' && 'Engaging with our local and global communities to promote STEM education.'}
                </Text>
              </ValueCard>
            ))}
          </Grid>
        </Content>
      </Section>

      <Section
        ref={sectionRefs[2]}
        initial="hidden"
        animate={sectionInView[2] ? "visible" : "hidden"}
        variants={staggerChildren}
      >
        <Content variants={fadeInUpVariants}>
          <Title>Our History</Title>
          <Text>
            Since our founding, Team 1515 has earned numerous awards for technical excellence, 
            creativity, and outreach efforts. From building high-performing robots to mentoring 
            younger teams and hosting workshops, we aim to leave a positive and lasting impact.
          </Text>
        </Content>
      </Section>

      <Section
        ref={sectionRefs[3]}
        initial="hidden"
        animate={sectionInView[3] ? "visible" : "hidden"}
        variants={staggerChildren}
        $bgColor={theme.colors.lightAccent}
      >
        <Content variants={fadeInUpVariants}>
          <Title>Outreach and Impact</Title>
          <Text>
            We believe in giving back. Through partnerships with schools, community events, 
            and mentoring, we work to make STEM accessible and exciting for all. 
            Our initiatives include:
          </Text>
          <StyledList variants={staggerChildren}>
            {[
              'Hosting robotics workshops for elementary and middle school students.',
              'Volunteering at community events to spread awareness about STEM.',
              'Mentoring younger FRC and FIRST LEGO League teams.'
            ].map((item, index) => (
              <ListItem
                key={index}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <Text style={{ margin: 0 }}>{item}</Text>
              </ListItem>
            ))}
          </StyledList>
        </Content>
      </Section>

      <Section
        ref={sectionRefs[4]}
        initial="hidden"
        animate={sectionInView[4] ? "visible" : "hidden"}
        variants={staggerChildren}
      >
        <Content variants={fadeInUpVariants}>
          <Title>Join Us</Title>
          <Text>
            We are always looking for passionate students, dedicated mentors, and generous 
            sponsors to join us on our journey. Whether you're interested in programming, 
            engineering, design, or marketing, there's a place for you on Team 1515!
          </Text>
        </Content>
      </Section>
    </AboutContainer>
  );
};

export default About;