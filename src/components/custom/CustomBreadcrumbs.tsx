import { Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

interface BreadCrumb {
  label: string;
  to: string;
}

interface Props {
  currentPage: string;
  breadCrumbs?: BreadCrumb[];
}

export const CustomBreadcrumbs = ({ currentPage, breadCrumbs = [] }: Props) => {
  return (
    <Breadcrumb className="my-5">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link to="/" />}>Inicio</BreadcrumbLink>
        </BreadcrumbItem>

        {breadCrumbs.map((crumb) => (
          <div className="flex itemcenter">
            <BreadcrumbItem>
            <BreadcrumbSeparator />
              <BreadcrumbLink render={<Link to={crumb.to} />}>
                {crumb.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink className="text-black">{currentPage}</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
