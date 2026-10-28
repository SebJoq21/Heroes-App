import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "../ui/navigation-menu"
import { cn } from "cn"

export const CustomMenu = () => {
  const { pathname } = useLocation() // Mejor usar const aquí

  // CORRECCIÓN 1: Usar === para comparar la ruta actual
  const isActive = (path: string) => pathname === path

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/">Inicio</Link>}
            className={cn(
              isActive('/') && 'bg-slate-200', 'p-2 rounded-md', 
              navigationMenuTriggerStyle()
            )}
          >
          </NavigationMenuLink>
        </NavigationMenuItem> 

        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/search">Buscar SuperHéroes</Link>}
            className={cn(
              isActive('/search') && 'bg-slate-200', 'p-2 rounded-md', 
              navigationMenuTriggerStyle()
            )}
          >
          </NavigationMenuLink>
        </NavigationMenuItem> 

      </NavigationMenuList>   
    </NavigationMenu>
  )
}