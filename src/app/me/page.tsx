import { FormProfile } from "@/components/me/form-profile";
import { FormSocialMedia } from "@/components/me/form-social-media";
import { MeProvider } from "@/components/me/me-context";
import { Settings } from "@/components/me/settings";
import { api } from "@/trpc/server";

export default async function MePage() {
  const me = await api.user.me.query();

  return (
    <MeProvider me={me}>
      <main className="container py-20">
        <h2 className="scroll-m-20 pb-2 font-serif text-3xl font-bold italic tracking-wide first:mt-0">
          Kelola Profil
        </h2>

        <div className="flex flex-grow flex-col justify-center gap-x-8 gap-y-4 lg:flex-row">
          <FormProfile />
          <div className="md:basis-4/12">
            <FormSocialMedia />
            <Settings />
          </div>
        </div>
      </main>
    </MeProvider>
  );
}
