"use server";

import { getServerAuthSession } from "@/server/auth";
import { NavDropdown } from "./nav-dropdown";

export async function NavBar() {
  const session = await getServerAuthSession();

  return <NavDropdown session={session} />;
}
