import { z } from 'zod';

export const BlogPostSchema = z.object({
  title: z.string(),
  date: z.string(),
  author: z.string(),
  category: z.enum([
    'Competition Updates',
    'Build Progress',
    'Team News',
    'Technical Articles',
    'Community Events'
  ]),
  description: z.string(),
  content: z.string(),
  image: z.string(),
  tags: z.array(z.string()).optional(),
  slug: z.string().optional()
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

// This is a mock implementation that will be replaced by the CMS
const MOCK_POSTS: BlogPost[] = [
  {
    title: "Welcome to Our Team Blog",
    date: "2024-01-07",
    author: "Team 1515",
    category: "Team News",
    description: "Welcome to the official Team 1515 MorTorq blog! Here we'll share our journey, achievements, and insights into the world of robotics.",
    content: "# Welcome to Our Team Blog!\n\nWe're excited to launch...",
    image: "/media/blog/welcome-post.jpg",
    tags: ["Announcements", "Team Updates"],
    slug: "welcome-to-our-blog"
  }
];

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  // In production, this will be replaced by the CMS data
  return MOCK_POSTS;
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  const post = MOCK_POSTS.find(p => p.slug === slug);
  if (!post) {
    throw new Error('Blog post not found');
  }
  return post;
}; 