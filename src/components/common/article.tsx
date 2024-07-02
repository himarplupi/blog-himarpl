// component artikel yang menerima props title, image, konten dan kategori

import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { Skeleton } from "../ui/skeleton";

export function Article({
  userUrl,
  userImage,
  userName,
  published,
  articleUrl,
  title,
  teaser,
  articleImage,
  children,
}: {
  userUrl: string;
  userImage: string;
  userName: string;
  published: Date | string;
  articleUrl: string;
  title: string;
  teaser: string;
  articleImage: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6 sm:mb-4">
      <div className="mb-2 flex items-center gap-1 md:gap-2">
        <Link
          href={`/@${userUrl}`}
          className="flex items-center gap-2 text-sm font-light underline-offset-4 hover:underline md:gap-3"
        >
          <div className="aspect-square overflow-hidden rounded-full">
            <Image
              className="h-5 w-5"
              src={userImage}
              width={32}
              height={32}
              alt=""
            />
          </div>
          <p className="mb-0">{userName}</p>
        </Link>
        <span className="block h-1 w-1 rounded-full border border-foreground"></span>
        <p className="text-sm font-extralight">
          {moment(published ?? "").format("ddd, DD MMM YY")}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-x-4 ">
        <div className="col-span-2">
          <Link
            href={`/@${userUrl}/${articleUrl}`}
            className="font-semibold capitalize underline-offset-4 hover:underline font-serif text-xl sm:text-2xl"
          >
            {title}
          </Link>
          <p className="mt-2  hidden lg:line-clamp-3">{teaser}</p>
          <div className="mt-2 flex flex-wrap gap-2 md:mt-4">{children}</div>
        </div>
        <Link
          href={`/@${userUrl}/${articleUrl}`}
          className="aspect-video overflow-hidden rounded-md"
        >
          <Image
            src={articleImage}
            width={400}
            height={225}
            alt=""
            className="w-full"
          />
        </Link>
      </div>
    </div>
  );
}

export function ArticleSkeleton() {
  return (
    <div className="">
      <div className="mb-2 flex items-center gap-1">
        <Skeleton className="h-5 w-5 rounded-full" />
        <Skeleton className="h-4 w-4/5 rounded-full sm:w-1/2 xl:w-1/3" />
      </div>
      <div className="grid grid-cols-3 gap-x-4">
        <div className="col-span-2">
          <Skeleton className="mb-4 h-5 w-full rounded-full" />
          <Skeleton className="mb-1 hidden h-4 w-full rounded-md lg:block" />
          <Skeleton className="mb-1 hidden h-4 w-full rounded-md lg:block" />
          <Skeleton className="mb-1 hidden h-4 w-full rounded-md lg:block" />
        </div>
        <Skeleton className="col-span-1 aspect-video rounded-md" />
      </div>
    </div>
  );
}
