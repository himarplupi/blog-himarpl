import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";

export default async function Sidebar() {
  const popularPostTags = await api.postTag.popular.query();
  const suggestPostTags = popularPostTags.sort(() => Math.random() - 0.5);

  const users = await api.user.newArticle.query();

  // sort users dari publishedAt posts terbaru
  users.sort((a, b) => {
    const aDate = new Date(a.posts[0]?.publishedAt ?? 0);
    const bDate = new Date(b.posts[0]?.publishedAt ?? 0);
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <div className="lg:py-4 lg:px-6 lg:mt-0 p-0 mt-14 overflow-y-scroll lg:sticky top-20">
      {/* Label */}
      <h3 className="font-semibold text-xl mb-4">Telusur Label</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        {suggestPostTags.map((tag) => (
          <Link href={`/tag/${tag.slug}`} key={tag.id}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{tag.title}</Button>
          </Link>
        ))}
      </div>
      <Link href={"/explore-tags"}>
        <Button variant="link" className="text-white mb-8">Lihat Semua</Button>
      </Link>

      {/* Pengurus */}
      <h3 className="font-semibold text-xl mb-4">Pengurus</h3>
      <div className="flex flex-col gap-2 mb-8">
        {users.map((user) => (
          <div key={user.id} className="flex gap-4 justify-start items-start">
            <Link href={`@${user.username}`} className="aspect-square overflow-hidden rounded-full">
              <Image className="" src={user.image ?? ""} width={40} height={40} alt=""></Image>
            </Link>
            <div>
              <Link href={`@${user.username}`} className="font-semibold hover:underline underline-offset-4">{user.name}</Link>
              <p className="text-sm">1 Artikel bulan ini</p>
            </div>
          </div>
        ))}

      </div>

      {/* Footer */}
      <div>
        blog ini dibuat Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure perspiciatis aspernatur, similique molestiae quia id.
      </div>
    </div>
  )
}

