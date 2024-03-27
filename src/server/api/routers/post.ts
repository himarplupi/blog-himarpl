import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { faker } from "@faker-js/faker";
import GithubSlugger from "github-slugger";

const contentGuide = `
  # Ini adalah heading 1
  Ini adalah paragraf dengan **bold** dan *italic*.
  ## Ini adalah heading 2
  Ini adalah paragraf dengan [link](https://example.com).
  ### Ini adalah heading 3
  Ini adalah paragraf dengan \`code\`.
  #### Ini adalah heading 4
  Ini adalah paragraf dengan:
  \`\`\`
  code block
  \`\`\`
  ##### Ini adalah heading 5
  Ini adalah paragraf dengan:
  - list 1
  - list 2
  ###### Ini adalah heading 6
  Ini adalah paragraf dengan gambar:
  ![gambar](https://example.com/image.jpg)
`;

export const postRouter = createTRPCRouter({
  new: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session.user.username) {
      throw new Error("User must have a username to create a post");
    }

    const slugger = new GithubSlugger();
    const title = faker.company.catchPhrase();
    const metaTitle = parseMetaTitle(title);

    (
      await ctx.db.post.findMany({
        where: {
          authorId: ctx.session.user.id,
        },
        select: {
          slug: true,
        },
      })
    ).forEach((post) => {
      slugger.slug(post.slug);
    });

    // Insert new post
    const post = await ctx.db.post.create({
      data: {
        title,
        metaTitle,
        content: contentGuide,
        slug: slugger.slug(metaTitle),
        authorId: ctx.session.user.id,
      },
    });

    slugger.reset();

    return post;
  }),
});

function parseMetaTitle(title: string) {
  // Remove special characters and convert to lowercase
  const safeTitle = title.replace(/[^\w\s]/gi, "").toLowerCase();

  // Set safe meta title length by word length
  const maxWords = 10;
  const words = safeTitle.split(" ");
  const truncatedTitle = words.slice(0, maxWords).join(" ");

  return truncatedTitle;
}
