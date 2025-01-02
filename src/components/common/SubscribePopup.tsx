import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const PopupContent = styled(motion.div)`
  background: white;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const StatusMessage = styled.div<{ $success?: boolean }>`
  margin-top: 1rem;
  padding: 0.5rem;
  text-align: center;
  color: ${({ $success }) => 
    $success ? '#28a745' : '#dc3545'};
  background-color: ${({ $success }) => 
    $success ? '#d4edda' : '#f8d7da'};
  border-radius: 4px;
`;

interface SubscribePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const SubscribePopup = ({ isOpen, onClose }: SubscribePopupProps) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const API_URL = import.meta.env.VITE_API_URL;
    
    if (!API_URL) {
      console.error('API_URL not configured');
      setStatus('error');
      setError('API configuration error');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setFormData({ name: '', email: '' });
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 2000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <PopupContent
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton onClick={onClose}>×</CloseButton>
            <Title>Subscribe to Our Newsletter</Title>
            <Description>
              Stay updated with Team 1515's latest achievements, upcoming events, and robotics news!
            </Description>
            <Form onSubmit={handleSubmit}>
              <Input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name" 
                required 
                disabled={status === 'loading'}
              />
              <Input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address" 
                required 
                disabled={status === 'loading'}
              />
              <SubmitButton 
                type="submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </SubmitButton>
              
              {status === 'success' && (
                <StatusMessage $success>
                  Successfully subscribed! Closing...
                </StatusMessage>
              )}
              
              {status === 'error' && (
                <StatusMessage>
                  {error}
                </StatusMessage>
              )}
            </Form>
          </PopupContent>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default SubscribePopup; 