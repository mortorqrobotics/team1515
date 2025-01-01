import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background-color: #2A2A2A;
  color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.2rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ContactForm = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid #404040;
  border-radius: 4px;
  background-color: #333333;
  color: ${({ theme }) => theme.colors.secondary};
  flex: 1;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightAccent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled(motion.a)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.lightAccent};
  }
`;

const FooterNote = styled.p`
  text-align: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  color: #888888;
  font-size: 0.875rem;
  border-top: 1px solid #404040;
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>Contact Us</SectionTitle>
          <ContactForm>
            <Input type="email" placeholder="Enter your email" />
            <SubmitButton>Subscribe</SubmitButton>
          </ContactForm>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Follow Us</SectionTitle>
          <SocialLinks>
            <SocialLink href="https://facebook.com/team1515" target="_blank" rel="noopener noreferrer">
              Facebook
            </SocialLink>
            <SocialLink href="https://twitter.com/team1515" target="_blank" rel="noopener noreferrer">
              Twitter
            </SocialLink>
            <SocialLink href="https://instagram.com/team1515" target="_blank" rel="noopener noreferrer">
              Instagram
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Location</SectionTitle>
          <p>1234 Robotics Way</p>
          <p>Los Angeles, CA 90001</p>
          <p>Email: team1515@robotics.com</p>
        </FooterSection>
      </FooterContent>
      <FooterNote>© 2024 Team 1515 Robotics. All rights reserved.</FooterNote>
    </FooterContainer>
  );
};

export default Footer;