export type PostTagType = {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  parentId?: number;
  parent?: PostTagType;
  children?: PostTagType[];
  posts?: PostType[]; // Hubungan dengan model Post
}

export type PostType = {
  id: string;
  authorId: string;
  title: string;
  metaTitle: string;
  slug: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  author: UserType;
  tags: PostTagType[];
}

export type UserType = {
  id: string;
  name?: string;
  email?: string; // unique
  emailVerified?: Date;
  image?: string;
  username?: string; // unique
  bio?: string;
  position?: string;
  role: 'member' | 'admin'; // Sesuaikan dengan enum Role jika ada
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  departmentId?: string;
  department?: []; // Hubungan dengan model Department
  posts?: PostType; // Hubungan dengan model Post
  socialMedia?: []; // Hubungan dengan model SocialMedia
  accounts?: []; // Hubungan dengan model Account
  sessions?: []; // Hubungan dengan model Session
};
