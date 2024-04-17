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
  dateTime: string;
  children: React.ReactNode;
}

const Article: React.FC<ArticleProps> = ({ profileUrl, photo, image, name, title, description, dateTime, children }) => {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('');

  return (
    <div className="px-4 py-3">
      <Link href={profileUrl} className="flex items-center gap-4 group mb-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={photo} />
          <AvatarFallback className='text-xs font-semibold uppercase'>{initials}</AvatarFallback>
        </Avatar>
        <p className="mb-0 font-medium transition group-hover:text-muted-foreground">{name}</p>
      </Link>
      <div className="grid grid-cols-7 gap-2 lg:gap-4">
        <div className="col-span-5 lg:col-span-6">
          <Link href={"/post"} className="text-base md:text-2xl font-semibold transition hover:text-muted-foreground">{title}</Link>
          <p className="hidden md:block mt-2" dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <Link href={profileUrl} className="overflow-hidden col-span-2 lg:col-span-1">
          <Image width={200} height={200} src={image} alt="Image" className="w-full aspect-square rounded-md" />
        </Link>
      </div>
      {/* Label */}
      <div className="flex flex-wrap gap-2 mt-2">
        <div className="flex items-center gap-2 mr-2 w-full md:w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <p className="text-sm">{dateTime}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Article;
