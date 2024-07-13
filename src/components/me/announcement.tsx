"use client";

import React from "react";
import Link from "next/link";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { api } from "@/trpc/react";

import { buttonVariants } from "../ui/button";

export function Announcement() {
  const announcementQuery = api.post.getAnnouncement.useQuery();
  return (
    <div className="container mt-24">
      {announcementQuery.data && (
        <Alert variant="warning">
          <AlertTitle>
            <Link
              className="capitalize hover:underline"
              href={`/@${announcementQuery.data.author.username}/${announcementQuery.data.slug}`}
            >
              {announcementQuery.data.title}
            </Link>
          </AlertTitle>
          <AlertDescription>
            <div className="mb-1 line-clamp-2">
              {announcementQuery.data.content}
            </div>
            <Link
              className={buttonVariants({ size: "sm", variant: "ghost" })}
              href={`/@${announcementQuery.data.author.username}/${announcementQuery.data.slug}`}
            >
              Baca Selengkapnya
            </Link>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
