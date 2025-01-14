import { z } from 'zod';
import fm from "front-matter";


interface MarkdownFileContent {
  default: string;
}

export const BlogPostSchema = z.object({
  title: z.string(),
  date: z.date(),
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
  tags: z.string().optional()
});

export type BlogPost = z.infer<typeof BlogPostSchema> & {slug: string};

function slugify(str: string) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
  str = str.toLowerCase(); // convert string to lowercase
  str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
           .replace(/\s+/g, '-') // replace spaces with hyphens
           .replace(/-+/g, '-'); // remove consecutive hyphens
  return str;
}

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const modules = import.meta.glob("../_data/blog/*.md", {
    eager: true,
    query: "?raw",
  });
  const blogs = Object.entries(modules).map((module) => {
    const [path, file] = module as [string, MarkdownFileContent];
    const { attributes } = fm(file.default);
    const blogPostInformation = BlogPostSchema.parse(attributes);
    return {
        ...blogPostInformation,
        image: blogPostInformation.image.replace("public/", ""), // Files in the public directory are served at the root path
        key: path,
    }
  })




  const blogsToReturn = blogs.map((blog) => {
    let slug =  slugify(blog.title);
    const count = blogs.filter(b => slugify(b.title) === slug).length;
    if(count > 1) {
      slug += (count + 1)
    } 
    console.log(count)
    return {
      ...blog,
      slug
    };
  })
  return blogsToReturn;
};

export const getBlogPost = async (slug: string): Promise<BlogPost> => {
  const post = (await getBlogPosts()).find(p => p.slug === slug);
  if (!post) {
    throw new Error('Blog post not found');
  }
  return post;
}; 