"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";

export function UserList() {
  const { data: users, isLoading } = api.user.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-[200px] rounded bg-muted" />
                  <div className="h-4 w-[150px] rounded bg-muted" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {users?.map((user) => (
        <Card key={user.id} className="transition-colors hover:bg-muted/50">
          <Link href={`/@${user.username ?? ""}`}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
                  <AvatarFallback>
                    {user.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-medium">{user.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    {user.departments[0]?.name ?? "No Department"} ·{" "}
                    {user._count.posts} posts
                  </div>
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
