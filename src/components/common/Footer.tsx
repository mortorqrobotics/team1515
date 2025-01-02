import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SubscribePopup from './SubscribePopup';

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

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <SectionTitle>Subscribe</SectionTitle>
          <SubmitButton onClick={() => setIsPopupOpen(true)}>
            Subscribe to Newsletter
          </SubmitButton>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Follow Us</SectionTitle>
          <SocialLinks>
            <SocialLink href="https://www.facebook.com/frc1515/" target="_blank" rel="noopener noreferrer">
              Facebook
            </SocialLink>
            <SocialLink href="https://x.com/i/flow/login?redirect_after_login=%2Ffrc1515" target="_blank" rel="noopener noreferrer">
              X (Twitter)
            </SocialLink>
            <SocialLink href="https://www.instagram.com/frc1515/?hl=en" target="_blank" rel="noopener noreferrer">
              Instagram
            </SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <SectionTitle>Location</SectionTitle>
          <p>Beverly Hills High School</p>
          <p>241 S Moreno Dr</p>
          <p>Beverly Hills, CA 90212</p>
        </FooterSection>
      </FooterContent>
      <FooterNote>© 2024 Team 1515 Robotics. All rights reserved.</FooterNote>
      <SubscribePopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </FooterContainer>
  );
};

export default Footer;