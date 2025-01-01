import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Section = styled(motion.section)<{ $bgColor?: string }>`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background-color: ${({ $bgColor }) => $bgColor || 'transparent'};
`; 