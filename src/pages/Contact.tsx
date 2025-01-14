import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Section } from '../components/common/Section';

const ContactContainer = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Content = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xxl};
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: ${({ theme }) => theme.spacing.md};
    max-width: 600px;
  }
`;

const ContactInfo = styled(motion.div)`
  h2 {
    font-size: 2.8rem;
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
    border-top: 1px solid ${({ theme }) => theme.colors.mediumGray};
    
    p {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.spacing.sm};
      font-size: 1.1rem;
      margin-bottom: ${({ theme }) => theme.spacing.md};
    }
  }
`;

const ContactForm = styled(motion.form)`
  background: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.mediumGray};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  font-size: 1.1rem;
  width: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div<{ $success?: boolean }>`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  color: ${({ theme, $success }) => 
    $success ? theme.colors.success : 'red'};
  background-color: ${({ theme, $success }) => 
    $success ? '#d4edda' : '#f8d7da'};
  border-radius: 4px;
`;

const Contact = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
          <ContactInfo
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
            }}
          >
            <h2>Let's Connect</h2>
            <p>
              Have questions about joining Team 1515? Want to sponsor our robotics journey? 
              Or just curious about what we do? We'd love to hear from you!
            </p>
            <p>
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            <div className="contact-details">
              <p>📧 1515mortorq@gmail.com</p>
              <p>📍 Beverly Hills High School, 241 S Moreno Dr, Beverly Hills, CA 90212</p>
              <p>🤖 FRC Team 1515 - MorTorq</p>
            </div>
          </ContactInfo>

          <ContactForm 
            onSubmit={handleSubmit}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
          >
            <InputGroup>
              <Label>Name</Label>
              <Input 
                type="text" 
                name="name" 
                required 
                disabled={isSubmitting}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Email</Label>
              <Input 
                type="email" 
                name="email" 
                required 
                disabled={isSubmitting}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Subject</Label>
              <Input 
                type="text" 
                name="subject" 
                required 
                disabled={isSubmitting}
              />
            </InputGroup>
            
            <InputGroup>
              <Label>Message</Label>
              <TextArea 
                name="message" 
                required 
                disabled={isSubmitting}
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
              value="New Contact Form Submission"
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
        </Content>
      </Section>

    </ContactContainer>
  );
};

export default Contact; 