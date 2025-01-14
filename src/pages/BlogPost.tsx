import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BlogPost as BlogPostType, getBlogPost } from '../utils/getBlogPosts';
import OptimizedImage from '../components/common/OptimizedImage';

const PostWrapper = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.md};
  }
`;

const PostContainer = styled.article`
  max-width: 800px;
  width: 100%;
  margin: 100px 0;
  padding: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: 400px) {
    padding: ${({ theme }) => theme.spacing.sm};
    text-align: center;
  }
`;

const PostHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  line-height: 1.2;
  font-weight: 800;
`;

const FeaturedImage = styled.div`
  width: 100%;
  height: clamp(200px, 40vh, 400px);
  margin: ${({ theme }) => theme.spacing.lg} 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Meta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.mediumGray};
  font-size: 0.9rem;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Category = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Description = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: ${({ theme }) => theme.colors.mediumGray};
  line-height: 1.6;
  margin: ${({ theme }) => theme.spacing.md} auto;
  max-width: 600px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Divider = styled.span`
  margin: 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.mediumGray};
  opacity: 0.5;
`;

const Content = styled.div`
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1rem, 2vw, 1.1rem);
  margin-top: ${({ theme }) => theme.spacing.xl};

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  h2 {
    font-size: clamp(1.4rem, 3vw, 1.8rem);
    margin: ${({ theme }) => `${theme.spacing.lg} 0 ${theme.spacing.md}`};
    font-weight: 700;
    text-align: center;
  }

  h3 {
    font-size: clamp(1.2rem, 2.5vw, 1.5rem);
    margin: ${({ theme }) => `${theme.spacing.lg} 0 ${theme.spacing.md}`};
    font-weight: 600;
    text-align: center;
  }

  h4 {
    font-size: clamp(1.1rem, 2vw, 1.3rem);
    margin: ${({ theme }) => `${theme.spacing.md} 0 ${theme.spacing.sm}`};
    font-weight: 600;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: ${({ theme }) => theme.spacing.md} 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    margin: ${({ theme }) => theme.spacing.lg} 0;
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
    font-style: italic;
    background: ${({ theme }) => `${theme.colors.primary}10`};
    border-radius: 0 8px 8px 0;
  }

  ul, ol {
    margin: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.lg};
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm};
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-weight: 500;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }

  &::before {
    content: '←';
    margin-right: ${({ theme }) => theme.spacing.sm};
    font-size: 1.2em;
  }
`;

const Tags = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  justify-content: center;
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => `${theme.colors.mediumGray}30`};
`;

const Tag = styled.span`
  background: ${({ theme }) => `${theme.colors.primary}10`};
  color: ${({ theme }) => theme.colors.primary};
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}20`};
  }
`;

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        const postData = await getBlogPost(slug);
        setPost(postData);
      } catch (err) {
        setError('Failed to load blog post');
        console.error('Error loading blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return <PostContainer>Loading...</PostContainer>;
  }

  if (error || !post) {
    return <PostContainer>Error: {error || 'Post not found'}</PostContainer>;
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <PostWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PostContainer>
        <BackLink to="/blog">Back to Blog</BackLink>
        <PostHeader>
          <Category>{post.category}</Category>
          <Title>{post.title}</Title>
          <Description>{post.description}</Description>
          <Meta>
            <span>{post.author}</span>
            <Divider>•</Divider>
            <span>{formattedDate}</span>
          </Meta>
        </PostHeader>
        
        <FeaturedImage>
          <OptimizedImage
            src={post.image}
            alt={post.title}
            width="100%"
            height="100%"
          />
        </FeaturedImage>

        <Content dangerouslySetInnerHTML={{ __html: post.content }} />
        
        {post.tags && post.tags.length > 0 && (
          <Tags>
            {post.tags.split(",").map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        )}
      </PostContainer>
    </PostWrapper>
  );
};

export default BlogPost; 