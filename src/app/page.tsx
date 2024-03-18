import { unstable_noStore as noStore } from "next/cache";
import { NotificationToast } from "./_components/notification-toast";

export default async function HomePage({
  searchParams,
}: {
  searchParams: {
    toast?: string;
  };
}) {
  noStore();

  return (
    <main className="container mt-16">
      <h1 className="scroll-m-20 font-serif text-4xl font-extrabold tracking-wide lg:text-5xl">
        Hello World!
      </h1>

      <NotificationToast msg={searchParams.toast} />
    </main>
  );
}
