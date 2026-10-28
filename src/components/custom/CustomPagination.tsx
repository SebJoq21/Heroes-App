import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"

interface Props {
    totalPages: number
}

export const CustomPagination = ({totalPages}: Props) => {

  const page = 1 as number
  
  return ( 
    <div className="flex items-center justify-center space-x-2 mt-4">
        <Button variant="outline" size="sm" disabled={page === 1}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Anterior
        </Button>

        {
          Array.from({ length: totalPages }).map((_, index) => (
            <Button key={index} variant={
                page === index + 1 ? 'default' : 'outline'
            } size="sm">
              {index + 1}
            </Button>
          ))
        }

        <Button variant="outline" size="sm"
            disabled={page === totalPages}
        >
          Siguiente
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
  )
}
