import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

export default async function HomePage() {
  noStore();

  return <main className="container"></main>;
}
