import React from 'react';
import Image from "next/image";
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface ArticleProps {
  profileUrl: string;
  photo: string;
  image: string;
  name: string;
  title: string;
  description: string;
  dateTime: Date;
  children: React.ReactNode;
}

const Article: React.FC<ArticleProps> = ({ profileUrl, photo, image, name, title, description, dateTime, children }) => {
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  };

  const time = dateTime.toLocaleString('en-GB', options);

  return (
    <div className="px-4 py-3">
      <Link href={profileUrl} className="flex items-center gap-4 group mb-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={photo} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="mb-0 font-medium transition group-hover:text-muted-foreground">{name}</p>
      </Link>
      <div className="grid grid-cols-7 gap-2 lg:gap-4">
        <div className="col-span-5 lg:col-span-6">
          <Link href={"/post"} className="text-base md:text-2xl font-semibold transition hover:text-muted-foreground">{title}</Link>
          <p className="hidden md:block mt-2">{description}</p>
        </div>
        <Link href={profileUrl} className="overflow-hidden col-span-2 lg:col-span-1">
          <Image width={200} height={200} src={image} alt="Image" className="w-full aspect-square rounded-md" />
        </Link>
      </div>
      {/* Label */}
      <div className="flex flex-wrap gap-2 mt-2">
        <div className="flex items-center gap-2 mr-2 w-full md:w-fit">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.50009 0.877014C3.84241 0.877014 0.877258 3.84216 0.877258 7.49984C0.877258 11.1575 3.8424 14.1227 7.50009 14.1227C11.1578 14.1227 14.1229 11.1575 14.1229 7.49984C14.1229 3.84216 11.1577 0.877014 7.50009 0.877014ZM1.82726 7.49984C1.82726 4.36683 4.36708 1.82701 7.50009 1.82701C10.6331 1.82701 13.1729 4.36683 13.1729 7.49984C13.1729 10.6328 10.6331 13.1727 7.50009 13.1727C4.36708 13.1727 1.82726 10.6328 1.82726 7.49984ZM8 4.50001C8 4.22387 7.77614 4.00001 7.5 4.00001C7.22386 4.00001 7 4.22387 7 4.50001V7.50001C7 7.63262 7.05268 7.7598 7.14645 7.85357L9.14645 9.85357C9.34171 10.0488 9.65829 10.0488 9.85355 9.85357C10.0488 9.65831 10.0488 9.34172 9.85355 9.14646L8 7.29291V4.50001Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
          <p className="text-sm">{time.toString()}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Article;
