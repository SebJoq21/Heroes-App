import { useSearchParams } from "react-router";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs";
import { useMemo } from "react";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero";

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") ?? "all";
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "6";
  const category = searchParams.get("category") ?? "all";

  const selectedTab = useMemo(() => {
    const validTabs = ["all", "favorites", "heroes", "villains"];
    return validTabs.includes(activeTab) ? activeTab : "all";
  }, [activeTab]);

  const { data: heroesResponse  } = usePaginatedHero(+page, +limit, category)
  const { data: summary } = useHeroSummary();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8 min-h-screen">
      {/* Header */}
      <CustomJumbotron
        title="Universo de superheroes"
        description="Descubre, explora y administra superheroes y villanos"
      />

      <CustomBreadCrumbs currentPage="Super Heroes" />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Tabs */}
      <Tabs value={selectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger
            value="all"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "all");
                prev.set("category", "all");
                prev.set("page", "1");
                return prev;
              })
            }
          >
            All Characters ({ summary?.totalHeroes })
          </TabsTrigger>

          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "favorites");
                return prev;
              })
            }
          >
            Favorites (3)
          </TabsTrigger>

          <TabsTrigger
            value="heroes"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "heroes");
                prev.set("category", "hero");
                prev.set("page", "1");
                return prev;
              })
            }
          >
            Heroes ({ summary?.heroCount})
          </TabsTrigger>

          <TabsTrigger
            value="villains"
            onClick={() =>
              setSearchParams((prev) => {
                prev.set("tab", "villains");
                prev.set("category", "villain");
                prev.set("page", "1");
                return prev;
              })
            }
          >
            Villains ({ summary?.villainCount })
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-2 w-full">
        {activeTab === "all" && (
          <div className="animate-in fade-in duration-500">
            <h1>Todos los Personajes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="animate-in fade-in duration-500">
            <h1>Favoritos</h1>
            <HeroGrid heroes={[]} />
          </div>
        )}

        {activeTab === "heroes" && (
          <div className="animate-in fade-in duration-500">
            <h1>Héroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </div>
        )}

        {activeTab === "villains" && (
          <div className="animate-in fade-in duration-500">
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </div>
        )}
      </div>

      {/* Pagination */}
      <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
    </div>
  );
};
