import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
  grid-template-columns: repeat(12, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ExternalLink = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
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

const AddressText = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
  margin: 0;
`;

const QuickLinksSection = styled(FooterSection)`
  grid-column: span 3;

  @media (max-width: 1024px) {
    grid-column: span 1;
  }
`;

const ResourcesSection = styled(FooterSection)`
  grid-column: span 3;

  @media (max-width: 1024px) {
    grid-column: span 1;
  }
`;

const ConnectSection = styled(FooterSection)`
  grid-column: span 3;

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
  }
`;

const ContactSection = styled(FooterSection)`
  grid-column: span 3;

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
  }
`;

const ContactButton = styled.button`
  margin-top: 1rem;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <QuickLinksSection>
          <SectionTitle>Quick Links</SectionTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/outreach">Outreach</FooterLink>
          <FooterLink to="/leaders">Leaders</FooterLink>
          <FooterLink to="/sponsors">Sponsors</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </QuickLinksSection>

        <ResourcesSection>
          <SectionTitle>Resources</SectionTitle>
          <ExternalLink href="https://www.firstinspires.org/" target="_blank" rel="noopener noreferrer">
            FIRST Robotics
          </ExternalLink>
          <ExternalLink href="https://www.firstinspires.org/robotics/frc" target="_blank" rel="noopener noreferrer">
            FRC Programs
          </ExternalLink>
          <FooterLink to="/sponsors#become-sponsor">Become a Sponsor</FooterLink>
          <FooterLink to="/contact#join-team">Join Our Team</FooterLink>
        </ResourcesSection>

        <ConnectSection>
          <SectionTitle>Connect With Us</SectionTitle>
          <SocialLinks>
            <SocialLink href="https://www.facebook.com/frc1515/" target="_blank" rel="noopener noreferrer">
              Facebook
            </SocialLink>
            <SocialLink href="https://x.com/i/flow/login?redirect_after_login=%2Ffrc1515" target="_blank" rel="noopener noreferrer">
              X
            </SocialLink>
            <SocialLink href="https://www.instagram.com/frc1515/?hl=en" target="_blank" rel="noopener noreferrer">
              Instagram
            </SocialLink>
          </SocialLinks>
        </ConnectSection>

        <ContactSection>
          <SectionTitle>Contact Info</SectionTitle>
          <AddressText>Beverly Hills High School</AddressText>
          <AddressText>241 S Moreno Dr</AddressText>
          <AddressText>Beverly Hills, CA 90212</AddressText>
          <ExternalLink href="mailto:1515mortorq@gmail.com">1515mortorq@gmail.com</ExternalLink>
          <AddressText style={{ marginTop: '1rem' }}>
            <strong>Hours:</strong>
          </AddressText>
          <AddressText>Monday - Friday: 3:00 PM - 6:00 PM</AddressText>
          <AddressText>Saturday: 9:00 AM - 5:00 PM</AddressText>
        </ContactSection>
      </FooterContent>
      
      <FooterNote>
        © {new Date().getFullYear()} Team 1515 MorTorq. All rights reserved.
      </FooterNote>
    </FooterContainer>
  );
};

export default Footer;