import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BlogPost, getBlogPosts } from '../utils/getBlogPosts';
import BlogCard from '../components/blog/BlogCard';

const BlogContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const FilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background: ${({ $isActive, theme }) => 
    $isActive ? theme.colors.primary : 'transparent'};
  color: ${({ $isActive, theme }) => 
    $isActive ? 'white' : theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.mediumGray};
`;

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  const categories = Array.from(
    new Set(posts.map(post => post.category))
  );

  const filteredPosts = selectedCategory
    ? posts.filter(post => post.category === selectedCategory)
    : posts;

  return (
    <BlogContainer>
      <FilterContainer>
        <FilterButton
          $isActive={!selectedCategory}
          onClick={() => setSelectedCategory(null)}
        >
          All Posts
        </FilterButton>
        {categories.map(category => (
          <FilterButton
            key={category}
            $isActive={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </FilterButton>
        ))}
      </FilterContainer>

      {loading ? (
        <EmptyState>Loading posts...</EmptyState>
      ) : filteredPosts.length > 0 ? (
        <Grid>
          {filteredPosts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </Grid>
      ) : (
        <EmptyState>
          {selectedCategory 
            ? `No posts found in ${selectedCategory} category.`
            : 'No blog posts found.'}
        </EmptyState>
      )}
    </BlogContainer>
  );
};

export default Blog; 