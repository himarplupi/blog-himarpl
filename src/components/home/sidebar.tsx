import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { badgeVariants } from "@/components/ui/badge"
import { abbreviation } from "@/lib/utils"
import { getData } from "@/services/getData";

import { type PostTagType, type UserType } from "../common/type";


export async function Sidebar({ className }: { className?: string }) {
  const postTag = (await getData(`${process.env.NEXT_BASE_URL}/api/postTag`, 5)) as PostTagType[];
  const users = (await getData(`${process.env.NEXT_BASE_URL}/api/user`, 5)) as UserType[];

  return (
    <div className={`flex flex-col gap-8 overflow-y-auto ${className}`}>
      {/* Label */}
      <div>
        <h3 className="text-base font-semibold mb-4">Telusuri Label</h3>
        {/* Label group */}
        <div className="flex flex-wrap gap-2 mb-4">
          {postTag.length > 0 && postTag.map((tag) => (
            <Link key={tag.id} href={`${process.env.NEXT_BASE_URL}/tag/${tag.slug}`} className={badgeVariants()}>{tag.title}</Link>
          ))}
        </div>
        <Link href={"/explore-tags"} className={"text-foreground transition hover:text-muted-foreground"}>Lihat Semua</Link>
      </div>

      {/* Pengurus */}
      <div>
        <h3 className="text-base font-semibold mb-4">Pengurus</h3>
        {/* Pengurus group */}
        <div className="flex flex-col gap-4">
          {users.length > 0 && users.map((user) => (
            <Link key={user.id} href={"/"} className="flex items-center gap-4 group">
              <Avatar className="w-6 h-6">
                <AvatarImage src={user.image} />
                <AvatarFallback className='text-xs font-semibold uppercase'>
                  {abbreviation(user.name)}
                </AvatarFallback>
              </Avatar>
              <p className="mb-0 font-medium transition group-hover:text-muted-foreground">{user.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}