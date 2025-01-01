import fm from "front-matter";
import { z } from "zod";

interface MarkdownFileContent {
  default: string;
}

const leaderSchema = z.object({
  name: z.string(),
  role: z.string(),
  description: z.string(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  image: z.string(),
});

export default function getLeaders() {
  const modules = import.meta.glob("../_data/leaders/*.md", {
    eager: true,
    query: "?raw",
  });

  const leaders = Object.entries(modules).map((module) => {
    const [path, file] = module as [string, MarkdownFileContent];
    const { attributes } = fm(file.default);
    const leaderInformation = leaderSchema.parse(attributes);

    return {
      ...leaderInformation,
      image: leaderInformation.image.replace("public/", ""), // Files in the public directory are served at the root path
      key: path,
    };
  });

  return leaders;
}
