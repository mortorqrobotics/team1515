import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../../utils/getBlogPosts';
import OptimizedImage from '../common/OptimizedImage';

const Card = styled(motion.article)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 200px;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Meta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

const Category = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const Description = styled.p`
  margin: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const ReadMore = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ImageContainer>
        <OptimizedImage
          src={post.image}
          alt={post.title}
          width="100%"
          height="100%"
        />
      </ImageContainer>
      <Content>
        <Category>{post.category}</Category>
        <Title>{post.title}</Title>
        <Meta>
          <span>{post.author}</span>
          <span>•</span>
          <span>{formattedDate}</span>
        </Meta>
        <Description>{post.description}</Description>
        <ReadMore to={`/blog/${post.slug}`}>Read More →</ReadMore>
      </Content>
    </Card>
  );
};

export default BlogCard; 