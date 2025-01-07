import fm from "front-matter";
import { z } from "zod";

interface MarkdownFileContent {
  default: string;
}

const eventSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  // date: z.string().optional(),
  // location: z.string().optional(),
  category: z.string().optional(),
});

export default function getOutreachEvents() {
  const modules = import.meta.glob("../_data/outreach/*.md", {
    eager: true,
    query: "?raw",
  });

  const events = Object.entries(modules).map((module) => {
    const [path, file] = module as [string, MarkdownFileContent];
    const { attributes } = fm(file.default);
    const eventInformation = eventSchema.parse(attributes);

    return {
      ...eventInformation,
      imageUrl: eventInformation.image.replace("public/", ""),
      key: path,
      category: eventInformation.category || 'community',
      // date: eventInformation.date || new Date().toISOString(),
      // location: eventInformation.location || 'Beverly Hills'
    };
  });

  return events;
}