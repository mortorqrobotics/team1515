import { z } from 'zod';
import fm from "front-matter";


interface MarkdownFileContent {
  default: string;
}

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


export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const modules = import.meta.glob("../_data/blog/*.md", {
    eager: true,
    query: "?raw",
  });
  const blogs = Object.entries(modules).map((module) => {
    const [path, file] = module as [string, MarkdownFileContent];
    const { attributes } = fm(file.default);
    console.log(attributes)
    const blogPostInformation = BlogPostSchema.parse(attributes);

    return {
      ...blogPostInformation,
      image: blogPostInformation.image.replace("public/", ""), // Files in the public directory are served at the root path
      key: path,
    };
  });
  return blogs;
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  const post = (await getBlogPosts()).find(p => p.slug === slug);
  if (!post) {
    throw new Error('Blog post not found');
  }
  return post;
}; 