import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  className?: string;
  priority?: boolean;
}

const ImageContainer = styled(motion.div)<{ $width?: string; $height?: string }>`
  position: relative;
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || 'auto'};
  overflow: hidden;
  background-color: #f0f0f0;
`;

const StyledImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  priority = false 
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(priority ? src : null);

  useEffect(() => {
    if (!priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImageSrc(src);
      };
    }
  }, [src, priority]);

  return (
    <ImageContainer 
      $width={width} 
      $height={height} 
      className={className}
    >
      {!isLoaded && <Placeholder />}
      {imageSrc && (
        <StyledImage
          src={imageSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </ImageContainer>
  );
};

export default OptimizedImage; 