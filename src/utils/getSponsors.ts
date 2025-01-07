import fm from "front-matter";
import { z } from "zod";

interface MarkdownFileContent {
  default: string;
}

const sponsorSchema = z.object({
  name: z.string(),
  logo: z.string(),
  description: z.string(),
  tier: z.enum(["Platinum", "Gold", "Silver", "Bronze"]),
  website: z.string().optional(),
});

export default function getSponsors() {
  const modules = import.meta.glob("../_data/sponsors/*.md", {
    eager: true,
    query: "?raw",
  });

  const sponsors = Object.entries(modules).map((module) => {
    const [path, file] = module as [string, MarkdownFileContent];
    const { attributes } = fm(file.default);
    const sponsorInformation = sponsorSchema.parse(attributes);

    return {
      ...sponsorInformation,
      logo: sponsorInformation.logo.replace("public/", ""),
      key: path,
    };
  });

  return sponsors;
}