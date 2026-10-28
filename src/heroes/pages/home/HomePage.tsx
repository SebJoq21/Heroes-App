import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { useState } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadCrumbs } from "@/components/custom/CustomBreadcrumbs"

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<
    'all' | 'favorites' | 'heroes' | 'villains'
  >('all')

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
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="all">All Characters (16)</TabsTrigger>
          
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            Favorites (3)
          </TabsTrigger>
          
          <TabsTrigger value="heroes">Heroes (12)</TabsTrigger>
          <TabsTrigger value="villains">Villains (2)</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-2 w-full">
        
        {activeTab === 'all' && (
          <div className="animate-in fade-in duration-500">
            <h1>Todos los Personajes</h1>
            <HeroGrid />
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="animate-in fade-in duration-500">
            <h1>Favoritos</h1>
            <HeroGrid />
          </div>
        )}

        {activeTab === 'heroes' && (
          <div className="animate-in fade-in duration-500">
            <h1>Héroes</h1>
            <HeroGrid />
          </div>
        )}

        {activeTab === 'villains' && (
          <div className="animate-in fade-in duration-500">
            <h1>Villanos</h1>
            <HeroGrid />
          </div>
        )}

      </div>

      {/* Pagination */}
      <CustomPagination totalPages={8}/>
      
    </div>
  )
}