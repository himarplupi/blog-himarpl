import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { badgeVariants } from "@/components/ui/badge"


export function Sidebar({ className }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-8 overflow-y-auto ${className}`}>
      {/* Label */}
      <div>
        <h3 className="text-base font-semibold mb-4">Telusuri Label</h3>
        {/* Label group */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Link href="/" className={badgeVariants()}>Badge</Link>
        </div>
        <Link href={"/"} className={"text-foreground transition hover:text-muted-foreground"}>Lihat Semua</Link>
      </div>

      {/* Pengurus */}
      <div>
        <h3 className="text-base font-semibold mb-4">Pengurus</h3>
        {/* Pengurus group */}
        <div className="flex flex-col gap-4">
          <Link href={"/"} className="flex items-center gap-4 group">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mb-0 font-medium transition group-hover:text-muted-foreground">Ini nama user</p>
          </Link>
          <Link href={"/"} className="flex items-center gap-4 group">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mb-0 font-medium transition group-hover:text-muted-foreground">Ini nama user</p>
          </Link>
          <Link href={"/"} className="flex items-center gap-4 group">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mb-0 font-medium transition group-hover:text-muted-foreground">Ini nama user</p>
          </Link>

        </div>
      </div>
      {/* Pengurus */}
      <div>
        <h3 className="text-base font-semibold mb-4">Pengurus</h3>
        {/* Pengurus group */}
        <div className="flex flex-col gap-4">
          <Link href={"/"} className="flex items-center gap-4 group">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mb-0 font-medium transition group-hover:text-muted-foreground">Ini nama user</p>
          </Link>
          <Link href={"/"} className="flex items-center gap-4 group">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mb-0 font-medium transition group-hover:text-muted-foreground">Ini nama user</p>
          </Link>
          <Link href={"/"} className="flex items-center gap-4 group">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mb-0 font-medium transition group-hover:text-muted-foreground">Ini nama user</p>
          </Link>

        </div>
      </div>
      {/* Pengurus */}
      <div>
        <h3 className="text-base font-semibold mb-4">Pengurus</h3>
        {/* Pengurus group */}
        <div className="flex flex-col gap-4">
          <Link href={"/"} className="flex items-center gap-4 group">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mb-0 font-medium transition group-hover:text-muted-foreground">Ini nama user</p>
          </Link>
          <Link href={"/"} className="flex items-center gap-4 group">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mb-0 font-medium transition group-hover:text-muted-foreground">Ini nama user</p>
          </Link>
          <Link href={"/"} className="flex items-center gap-4 group">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="mb-0 font-medium transition group-hover:text-muted-foreground">Ini nama user</p>
          </Link>

        </div>
      </div>
    </div>
  )
}