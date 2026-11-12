import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadCrumbs"
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action"
import { useMemo } from "react"

export const HomePage = () => {
  const [ searchParams, setSearchParams ] = useSearchParams()

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains']
    return validTabs.includes(activeTab) ? activeTab : 'all'
  }, [activeTab])

  // const [activeTab, setActiveTab] = useState<
  //   'all' | 'favorites' | 'heroes' | 'villains'
  // >('all')

  const { data: heroesResponse } = useQuery({
    queryKey: ['heroes'],
    queryFn: () => getHeroesByPageAction(+page, +limit),
    staleTime: 1000 * 60 * 5
  })

  console.log({ heroesResponse })

  // useEffect(() => {
  //   getHeroesByPage().then()

  // }, [])

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-8 min-h-screen">
      
      {/* Header */}
      <CustomJumbotron
        title="Universo de superheroes"
        description="Descubre, explora y administra superheroes y villanos"
      />

      <CustomBreadCrumbs currentPage="Super Heroes"/>

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Tabs */}
      <Tabs value={selectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12">
          
          <TabsTrigger value="all" onClick={() => setSearchParams((prev) => {
            prev.set('tab', 'all')
            return prev
          })}>
            All Characters (16)
          </TabsTrigger>
          
          <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => setSearchParams((prev) => {
            prev.set('tab', 'favorites')
            return prev
          })}>
            Favorites (3)
          </TabsTrigger>
          
          <TabsTrigger value="heroes" onClick={() => setSearchParams((prev) => {
            prev.set('tab', 'heroes')
            return prev
          })}>
            Heroes (12)
          </TabsTrigger>

          <TabsTrigger value="villains" onClick={() => setSearchParams((prev) => {
            prev.set('tab', 'villains')
            return prev
          })}>
            Villains (2)
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-2 w-full">
        
        {activeTab === 'all' && (
          <div className="animate-in fade-in duration-500">
            <h1>Todos los Personajes</h1>
            <HeroGrid heroes={ heroesResponse?.heroes ?? [] } />
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="animate-in fade-in duration-500">
            <h1>Favoritos</h1>
            <HeroGrid heroes={[]} />
          </div>
        )}

        {activeTab === 'heroes' && (
          <div className="animate-in fade-in duration-500">
            <h1>Héroes</h1>
            <HeroGrid heroes={[]} />
          </div>
        )}

        {activeTab === 'villains' && (
          <div className="animate-in fade-in duration-500">
            <h1>Villanos</h1>
            <HeroGrid heroes={[]} />
          </div>
        )}

      </div>

      {/* Pagination */}
      <CustomPagination totalPages={8}/>
      
    </div>
  )
}