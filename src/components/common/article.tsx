// component artikel yang menerima props title, image, konten dan kategori

import Image from "next/image";
import Link from "next/link";
import moment from "moment";

import { calculateReadTime, cn } from "@/lib/utils";

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
  articleImage: string | null;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8">
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
              alt={userName + " profile picture"}
            />
          </div>
          <p className="mb-0">{userName}</p>
        </Link>
        <span className="block h-1 w-1 rounded-full border border-foreground"></span>
        <p className="text-sm font-extralight">
          {moment(published ?? "").format("ddd, DD MMM YY")}
        </p>
        <span className="hidden h-1 w-1 rounded-full border border-foreground sm:block"></span>
        <p className="hidden text-sm font-extralight sm:block">{`${calculateReadTime(teaser)} menit baca`}</p>
      </div>
      <div className="grid grid-cols-3 gap-x-4">
        <div className={cn(articleImage ? "col-span-2" : "col-span-3")}>
          <Link
            href={`/@${userUrl}/${articleUrl}`}
            className="font-serif text-xl font-semibold capitalize underline-offset-4 hover:underline sm:text-2xl"
          >
            {title}
          </Link>
          <p className="mt-2 line-clamp-3 text-sm lg:text-base">{teaser}</p>
          <div className="mt-2 flex flex-wrap gap-2 md:mt-4">{children}</div>
        </div>
        {articleImage && (
          <Link
            href={`/@${userUrl}/${articleUrl}`}
            className="flex aspect-video items-center justify-center overflow-hidden rounded-md"
          >
            <Image
              src={articleImage}
              width={400}
              height={225}
              alt={title + " article image"}
              className="w-full"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
