import Link from "next/link";

import Article from "@/components/common/article";
import { Navbar } from "@/components/common/navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { badgeVariants } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator";
import { getServerAuthSession } from "@/server/auth";


export default async function UserPage() {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar session={session} />
      <main className="container mt-16 min-h-screen py-8">
        <div className="grid grid-cols-3 gap-8 lg:gap-16">
          <div className="col-span-1 flex flex-col gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-semibold">@username</p>
            <div>
              <h3 className="text-xl font-semibold">Ini nama lengkapnya</h3>
              <p className="">Departemen</p>
            </div>
            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem enim nobis eveniet repellat et doloremque repellendus, cupiditate, optio laborum facilis temporibus earum! Inventore, ducimus enim.</p>

            <p className="font-medium">Social Media</p>
            <div className="flex flex-col gap-1">
              <Link className="transition font-semibold hover:text-muted-foreground" href={"/"}>nama sosmed</Link>
              <Link className="transition font-semibold hover:text-muted-foreground" href={"/"}>nama sosmed</Link>
              <Link className="transition font-semibold hover:text-muted-foreground" href={"/"}>nama sosmed</Link>
            </div>
            <Separator />
            <Link className="transition font-semibold hover:text-muted-foreground" href={"/"}>Edit Profil</Link>
          </div>

          <div className="col-span-2 flex flex-col gap-4 ">
            {/* Start Looping artikel */}
            <Article
              profileUrl="/" photo={`https://github.com/shadcn.png`} image={`https://github.com/shadcn.png`}
              name={"Ini nama user"} title={"Mahasiswa RPL membuat revolusi pada bidang teknologi"} description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus porro itaque repellat pariatur facere, asperiores hic esse qui eius! Debitis sed possimus nulla hic ex?"} dateTime={new Date()}>
              <Link href="/" className={badgeVariants()}>Label</Link>
              <Link href="/" className={badgeVariants()}>Label</Link>
              <Link href="/" className={badgeVariants()}>Label</Link>
            </Article>
            <Separator />
            <Article
              profileUrl="/" photo={`https://github.com/shadcn.png`} image={`https://github.com/shadcn.png`}
              name={"Ini nama user"} title={"Mahasiswa RPL membuat revolusi pada bidang teknologi"} description={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus porro itaque repellat pariatur facere, asperiores hic esse qui eius! Debitis sed possimus nulla hic ex?"} dateTime={new Date()}>
              <Link href="/" className={badgeVariants()}>Label</Link>
              <Link href="/" className={badgeVariants()}>Label</Link>
              <Link href="/" className={badgeVariants()}>Label</Link>
            </Article>
            <Separator />
            {/* End looping artikel */}
          </div>
        </div>
      </main>
    </>
  );
}
