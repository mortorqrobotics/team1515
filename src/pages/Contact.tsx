import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section } from '../components/common/Section';

const ContactContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const Content = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.mediumGray};
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.mediumGray};
  border-radius: 8px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const SubmitButton = styled(motion.button)`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.1rem;
  align-self: flex-start;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <ContactContainer>
      <Section
        ref={sectionRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <Content>
          <ContactForm 
            onSubmit={handleSubmit}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <InputGroup>
              <Label>Name</Label>
              <Input type="text" required />
            </InputGroup>
            
            <InputGroup>
              <Label>Email</Label>
              <Input type="email" required />
            </InputGroup>
            
            <InputGroup>
              <Label>Subject</Label>
              <Input type="text" required />
            </InputGroup>
            
            <InputGroup>
              <Label>Message</Label>
              <TextArea required />
            </InputGroup>
            
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </SubmitButton>
          </ContactForm>
        </Content>
      </Section>
    </ContactContainer>
  );
};

export default Contact; 