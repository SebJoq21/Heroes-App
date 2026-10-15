import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron
        title="Búsqueda de Héroes"
        description="Descubre, explora y administra superheroes y villanos"
      />

      {/* Stats Dashboard */}
      <HeroStats/>
    </>
  )
}

export default SearchPage