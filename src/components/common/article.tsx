// component artikel yang menerima props title, image, konten dan kategori

import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { Skeleton } from "../ui/skeleton";


export default function Article({
  userUrl,
  userImage,
  userName,
  published,
  articleUrl,
  title,
  teaser,
  articleImage,
  children
}: {
  userUrl: string,
  userImage: string,
  userName: string,
  published: Date | string,
  articleUrl: string,
  title: string,
  teaser: string,
  articleImage: string,
  children?: React.ReactNode
}) {
  return (
    <div>
      <div className="flex gap-1 md:gap-2 items-center mb-2">
        <Link href={`/@${userUrl}`} className="font-light hover:underline underline-offset-4 flex items-center gap-2 md:gap-3 text-sm">
          <div className="aspect-square overflow-hidden rounded-full">
            <Image className="h-5 w-5" src={userImage} width={32} height={32} alt="" />
          </div>
          <p className="mb-0">
            {userName}
          </p>
        </Link>
        <span className="block rounded-full w-1 h-1 border border-foreground"></span>
        <p className="font-extralight text-sm">{moment(published ?? "").format("ddd, DD MMM YY")}</p>
      </div>
      <div className="grid grid-cols-3 gap-x-4 ">
        <div className="col-span-2">
          <Link href={`/@${userUrl}/${articleUrl}`} className="font-semibold hover:underline underline-offset-4">{title}</Link>
          <p className="mt-2 hidden lg:inline-block">{teaser}</p>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-4">
            {children}
          </div>
        </div>
        <Link href={`/@${userUrl}/${articleUrl}`} className="overflow-hidden aspect-video rounded-md">
          <Image src={articleImage} width={400} height={225} alt="" className="w-full" />
        </Link>
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="">
      <div className="flex gap-1 items-center mb-2">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="w-4/5 sm:w-1/2 xl:w-1/3 h-4 rounded-full" />
      </div>
      <div className="grid grid-cols-3 gap-x-4">
        <div className="col-span-2">
          <Skeleton className="w-full h-5 rounded-full mb-4" />
          <Skeleton className="w-full h-4 rounded-md hidden lg:block mb-1" />
          <Skeleton className="w-full h-4 rounded-md hidden lg:block mb-1" />
          <Skeleton className="w-full h-4 rounded-md hidden lg:block mb-1" />
        </div>
        <Skeleton className="aspect-video rounded-md col-span-1" />
      </div>

    </div>
  )
}