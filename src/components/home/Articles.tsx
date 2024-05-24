"use client";

import Link from "next/link";
import { LoaderCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react"

import Article from "../common/article";

// topic and user is nullable
export default function Articles({ topic, user }: { topic: string | null, user: string | null }) {
  const popularTag = api.postTag.popular.useQuery();
  if (user != null) {
    // get post by user
  }

  return (
    <>
      {user != null && <div className="flex gap-2 pb-2 mb-2 overflow-x-scroll">
        {popularTag.isLoading ?
          <Button className="rounded-full" variant={"outline"}>
            <LoaderCircle className="animate-spin" /></Button> :
          <Link href={`/`}>
            <Button className="rounded-full" variant={topic == null ? "default" : "outline"}>All</Button>
          </Link>}

        {popularTag.data?.slice(0, 5).map((tag) => (
          <Link key={tag.id} href={`/?topic=${tag.slug}`}>
            <Button className="rounded-full" variant={topic == tag.slug ? "default" : "outline"}>{tag.title}</Button>
          </Link>
        ))}
      </div>}

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
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600">
          {/* Loop PostTag */}
          <Link href={`/tag/test`} >
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{"Test"}</Button>
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
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600">
          {/* Loop PostTag */}
          <Link href={`/tag/test`} >
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{"Test"}</Button>
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
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600">
          {/* Loop PostTag */}
          <Link href={`/tag/test`} >
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{"Test"}</Button>
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
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600">
          {/* Loop PostTag */}
          <Link href={`/tag/test`} >
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{"Test"}</Button>
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
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600">
          {/* Loop PostTag */}
          <Link href={`/tag/test`} >
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{"Test"}</Button>
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
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600">
          {/* Loop PostTag */}
          <Link href={`/tag/test`} >
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{"Test"}</Button>
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
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600">
          {/* Loop PostTag */}
          <Link href={`/tag/test`} >
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{"Test"}</Button>
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
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600">
          {/* Loop PostTag */}
          <Link href={`/tag/test`} >
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{"Test"}</Button>
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
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600">
          {/* Loop PostTag */}
          <Link href={`/tag/test`} >
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{"Test"}</Button>
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
          articleImage="https://images.unsplash.com/photo-1709403337893-594bcbdb735e?crop=entropy&amp;cs=tinysrgb&amp;fit=crop&amp;fm=jpg&amp;h=900&amp;ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcxMzIyNDg0NQ&amp;ixlib=rb-4.0.3&amp;q=80&amp;w=1600">
          {/* Loop PostTag */}
          <Link href={`/tag/test`} >
            <Button className="rounded-full" variant={"secondary"} size={"sm"}>{"Test"}</Button>
          </Link>
          {/* End loop PostTag */}
        </Article>
        <div className="flex justify-center gap-2 md:gap-3 xl:gap-4">
          <LoaderCircle className="animate-spin" />
          <span>Tunggu sebentar</span>
        </div>
      </div>
    </>
  )
}