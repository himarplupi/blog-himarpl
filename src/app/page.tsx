import { unstable_noStore as noStore } from "next/cache";

export default async function HomePage() {
  noStore();

  return (
    <main className="container">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        HELLO WORLD!
      </h1>
    </main>
  );
}
