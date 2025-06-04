import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { Pluggable } from "unified";

export const MDXOptions = {
  mdxOptions: {
    remarkPlugins: [
      remarkGfm,
      [
        remarkToc,
        {
          heading: "Contents",
          ordered: true,
          tight: true,
          maxDepth: 3,
        },
      ] as unknown as Pluggable,
    ],
    rehypePlugins: [rehypeSlug],
  },
};

export const cleanMDXContent = (content: string): string => {
  return content
    .replace(/^```markdown\n/, "")
    .replace(/\n```$/, "")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, "\n");
};
