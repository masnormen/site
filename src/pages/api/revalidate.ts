import { NextApiRequest, NextApiResponse } from "next";

import { env } from "@/env.mjs";
import { getPostsFromCollection } from "@/utils/notion";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const [{ data: posts }, { data: works }] = await Promise.all([
      getPostsFromCollection(env.POSTS_NOTION_ID),
      getPostsFromCollection(env.WORKS_NOTION_ID),
    ]);
    const postPaths = posts.map((item) => ({
      params: {
        type: "blog",
        slug: item.slug,
      },
    }));
    const workPaths = works.map((item) => ({
      params: {
        type: "works",
        slug: item.slug,
      },
    }));

    const paths = [...postPaths, ...workPaths].map((path) => `/${path.params.type}/${path.params.slug}`).concat(["/"]);
    for (const path of paths) {
      await res.revalidate(path);
    }

    return res.json({ revalidated: true, revalidatedPaths: paths });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
