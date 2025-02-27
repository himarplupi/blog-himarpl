import { UserList } from "@/components/users/user-list";

export default function UsersPage() {
  return (
    <main className="container mt-24">
      <h1 className="mb-8 text-3xl font-bold">Pengurus</h1>
      <UserList />
    </main>
  );
}
