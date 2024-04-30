import { FormProfile } from "@/components/me/form-profile";
import { FormSocialMedia } from "@/components/me/form-social-media";
import { MeProvider } from "@/components/me/me-context";
import { api } from "@/trpc/server";

export default async function MePage() {
  const me = await api.user.me.query();

  return (
    <MeProvider me={me}>
      <main className="container mt-20">
        <h2 className="scroll-m-20 border-b pb-2 font-serif text-3xl font-semibold tracking-wide first:mt-0">
          Kelola Profil
        </h2>

        <div className="mt-4 flex flex-grow justify-center gap-x-8 gap-y-4">
          <FormProfile />
          <FormSocialMedia />
        </div>
      </main>
    </MeProvider>
  );
}
