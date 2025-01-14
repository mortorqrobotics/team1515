import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { BlogPost, getBlogPosts } from '../utils/getBlogPosts';
import BlogCard from '../components/blog/BlogCard';

const BlogContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xxl} 0;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto; /* Center the grid */
  padding: 0 ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack cards on smaller screens */
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.mediumGray};
`;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getBlogPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <BlogContainer>
      <Title>Our Blog</Title>
      {loading ? (
        <EmptyState>Loading posts...</EmptyState>
      ) : posts.length > 0 ? (
        <BlogGrid>
          {posts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </BlogGrid>
      ) : (
        <EmptyState>No blog posts found.</EmptyState>
      )}
    </BlogContainer>
  );
};

export default Blog; 