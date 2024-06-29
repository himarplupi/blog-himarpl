"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

import { Article } from "../common/article";

export function Articles({ user }: { user: string | null }) {
  const [tagQuery, setTagQuery] = useQueryState("tag");
  const popularTag = api.postTag.popular.useQuery();

  if (user != null) {
    // get post by user
  }

  return (
    <>
      {user != null && (
        <div className="mb-2 flex gap-2 overflow-x-scroll pb-2">
          {popularTag.isLoading ? (
            <Button
              disabled
              className="rounded-full capitalize"
              variant={"outline"}
              size="sm"
            >
              <LoaderCircle className="animate-spin" />
            </Button>
          ) : (
            <Button
              className="rounded-full capitalize"
              variant={tagQuery == null ? "default" : "outline"}
              onClick={() => setTagQuery(null)}
              size="sm"
            >
              Untuk Kamu
            </Button>
          )}

          {popularTag.data?.map((tag) => (
            <Button
              className="rounded-full capitalize"
              onClick={() => setTagQuery(tag.slug)}
              variant={tagQuery == tag.slug ? "default" : "outline"}
              key={tag.id}
              size="sm"
            >
              {tag.title}
            </Button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-6">
        <Article
          userUrl="dikdns"
          userImage="https://avatars.githubusercontent.com/u/130320055?v=4"
          userName="Andika Eka Kurnia"
          published="Selasa, 20 Juli 2024"
          articleUrl="autus-adstringo-sono"
          title="Abbas debeo depono absque asperiores suasoria complectus ars verus trado."
          teaser="Paulatim uterque aurum vallum inflammatio cunae socius statua curtus. Attonbitus sol complectus centum cursim cruentus. Comis urbanus aegrotatio.
          Alioqui campana texo. Stultus caecus ea. Deleo surculus vir.
          Neque ascisco utpote constans aperio volutabrum odit. Antea arbitro ciminatio accommodo architecto. Demitto valeo cursus."
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600"
        >
          {/* Loop PostTag */}
          <Link href={`/tag/test`}>
            <Button size="sm" className="rounded-full" variant="secondary">
              {"Test"}
            </Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <Article
          userUrl="dikdns"
          userImage="https://avatars.githubusercontent.com/u/130320055?v=4"
          userName="Andika Eka Kurnia"
          published="Selasa, 20 Juli 2024"
          articleUrl="autus-adstringo-sono"
          title="Abbas debeo depono absque asperiores suasoria complectus ars verus trado."
          teaser="Paulatim uterque aurum vallum inflammatio cunae socius statua curtus. Attonbitus sol complectus centum cursim cruentus. Comis urbanus aegrotatio.
          Alioqui campana texo. Stultus caecus ea. Deleo surculus vir.
          Neque ascisco utpote constans aperio volutabrum odit. Antea arbitro ciminatio accommodo architecto. Demitto valeo cursus."
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600"
        >
          {/* Loop PostTag */}
          <Link href={`/tag/test`}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>
              {"Test"}
            </Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <Article
          userUrl="dikdns"
          userImage="https://avatars.githubusercontent.com/u/130320055?v=4"
          userName="Andika Eka Kurnia"
          published="Selasa, 20 Juli 2024"
          articleUrl="autus-adstringo-sono"
          title="Abbas debeo depono absque asperiores suasoria complectus ars verus trado."
          teaser="Paulatim uterque aurum vallum inflammatio cunae socius statua curtus. Attonbitus sol complectus centum cursim cruentus. Comis urbanus aegrotatio.
          Alioqui campana texo. Stultus caecus ea. Deleo surculus vir.
          Neque ascisco utpote constans aperio volutabrum odit. Antea arbitro ciminatio accommodo architecto. Demitto valeo cursus."
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600"
        >
          {/* Loop PostTag */}
          <Link href={`/tag/test`}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>
              {"Test"}
            </Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <Article
          userUrl="dikdns"
          userImage="https://avatars.githubusercontent.com/u/130320055?v=4"
          userName="Andika Eka Kurnia"
          published="Selasa, 20 Juli 2024"
          articleUrl="autus-adstringo-sono"
          title="Abbas debeo depono absque asperiores suasoria complectus ars verus trado."
          teaser="Paulatim uterque aurum vallum inflammatio cunae socius statua curtus. Attonbitus sol complectus centum cursim cruentus. Comis urbanus aegrotatio.
          Alioqui campana texo. Stultus caecus ea. Deleo surculus vir.
          Neque ascisco utpote constans aperio volutabrum odit. Antea arbitro ciminatio accommodo architecto. Demitto valeo cursus."
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600"
        >
          {/* Loop PostTag */}
          <Link href={`/tag/test`}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>
              {"Test"}
            </Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <Article
          userUrl="dikdns"
          userImage="https://avatars.githubusercontent.com/u/130320055?v=4"
          userName="Andika Eka Kurnia"
          published="Selasa, 20 Juli 2024"
          articleUrl="autus-adstringo-sono"
          title="Abbas debeo depono absque asperiores suasoria complectus ars verus trado."
          teaser="Paulatim uterque aurum vallum inflammatio cunae socius statua curtus. Attonbitus sol complectus centum cursim cruentus. Comis urbanus aegrotatio.
          Alioqui campana texo. Stultus caecus ea. Deleo surculus vir.
          Neque ascisco utpote constans aperio volutabrum odit. Antea arbitro ciminatio accommodo architecto. Demitto valeo cursus."
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600"
        >
          {/* Loop PostTag */}
          <Link href={`/tag/test`}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>
              {"Test"}
            </Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <Article
          userUrl="dikdns"
          userImage="https://avatars.githubusercontent.com/u/130320055?v=4"
          userName="Andika Eka Kurnia"
          published="Selasa, 20 Juli 2024"
          articleUrl="autus-adstringo-sono"
          title="Abbas debeo depono absque asperiores suasoria complectus ars verus trado."
          teaser="Paulatim uterque aurum vallum inflammatio cunae socius statua curtus. Attonbitus sol complectus centum cursim cruentus. Comis urbanus aegrotatio.
          Alioqui campana texo. Stultus caecus ea. Deleo surculus vir.
          Neque ascisco utpote constans aperio volutabrum odit. Antea arbitro ciminatio accommodo architecto. Demitto valeo cursus."
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600"
        >
          {/* Loop PostTag */}
          <Link href={`/tag/test`}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>
              {"Test"}
            </Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <Article
          userUrl="dikdns"
          userImage="https://avatars.githubusercontent.com/u/130320055?v=4"
          userName="Andika Eka Kurnia"
          published="Selasa, 20 Juli 2024"
          articleUrl="autus-adstringo-sono"
          title="Abbas debeo depono absque asperiores suasoria complectus ars verus trado."
          teaser="Paulatim uterque aurum vallum inflammatio cunae socius statua curtus. Attonbitus sol complectus centum cursim cruentus. Comis urbanus aegrotatio.
          Alioqui campana texo. Stultus caecus ea. Deleo surculus vir.
          Neque ascisco utpote constans aperio volutabrum odit. Antea arbitro ciminatio accommodo architecto. Demitto valeo cursus."
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600"
        >
          {/* Loop PostTag */}
          <Link href={`/tag/test`}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>
              {"Test"}
            </Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <Article
          userUrl="dikdns"
          userImage="https://avatars.githubusercontent.com/u/130320055?v=4"
          userName="Andika Eka Kurnia"
          published="Selasa, 20 Juli 2024"
          articleUrl="autus-adstringo-sono"
          title="Abbas debeo depono absque asperiores suasoria complectus ars verus trado."
          teaser="Paulatim uterque aurum vallum inflammatio cunae socius statua curtus. Attonbitus sol complectus centum cursim cruentus. Comis urbanus aegrotatio.
          Alioqui campana texo. Stultus caecus ea. Deleo surculus vir.
          Neque ascisco utpote constans aperio volutabrum odit. Antea arbitro ciminatio accommodo architecto. Demitto valeo cursus."
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600"
        >
          {/* Loop PostTag */}
          <Link href={`/tag/test`}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>
              {"Test"}
            </Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <Article
          userUrl="dikdns"
          userImage="https://avatars.githubusercontent.com/u/130320055?v=4"
          userName="Andika Eka Kurnia"
          published="Selasa, 20 Juli 2024"
          articleUrl="autus-adstringo-sono"
          title="Abbas debeo depono absque asperiores suasoria complectus ars verus trado."
          teaser="Paulatim uterque aurum vallum inflammatio cunae socius statua curtus. Attonbitus sol complectus centum cursim cruentus. Comis urbanus aegrotatio.
          Alioqui campana texo. Stultus caecus ea. Deleo surculus vir.
          Neque ascisco utpote constans aperio volutabrum odit. Antea arbitro ciminatio accommodo architecto. Demitto valeo cursus."
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600"
        >
          {/* Loop PostTag */}
          <Link href={`/tag/test`}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>
              {"Test"}
            </Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <Article
          userUrl="dikdns"
          userImage="https://avatars.githubusercontent.com/u/130320055?v=4"
          userName="Andika Eka Kurnia"
          published="Selasa, 20 Juli 2024"
          articleUrl="autus-adstringo-sono"
          title="Abbas debeo depono absque asperiores suasoria complectus ars verus trado."
          teaser="Paulatim uterque aurum vallum inflammatio cunae socius statua curtus. Attonbitus sol complectus centum cursim cruentus. Comis urbanus aegrotatio.
          Alioqui campana texo. Stultus caecus ea. Deleo surculus vir.
          Neque ascisco utpote constans aperio volutabrum odit. Antea arbitro ciminatio accommodo architecto. Demitto valeo cursus."
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600"
        >
          {/* Loop PostTag */}
          <Link href={`/tag/test`}>
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>
              {"Test"}
            </Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <div className="flex justify-center gap-2 md:gap-3 xl:gap-4">
          <LoaderCircle className="animate-spin" />
          <span>Tunggu sebentar</span>
        </div>
      </div>
    </>
  );
}
