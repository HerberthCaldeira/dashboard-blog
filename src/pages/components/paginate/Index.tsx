import { useLocation, useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Index({ data }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const prev = data?.links?.prev
    ? location.pathname + "?" + data?.links?.prev?.split("?")[1]
    : "";
  const next = data?.links?.next
    ? location.pathname + "?" + data?.links?.next?.split("?")[1]
    : "";

  return (
    <Pagination>
      <PaginationContent>
        {data?.meta?.links?.map((link, key) => {
          if (link?.label?.includes("&laquo;")) {
            return (
              <PaginationItem key={key}>
                <PaginationPrevious to={prev} />
              </PaginationItem>
            );
          }

          if (link?.label?.includes("&raquo;")) {
            return (
              <PaginationItem key={key}>
                <PaginationNext to={next} />
              </PaginationItem>
            );
          }

          if (!link?.url) {
            return <PaginationEllipsis />;
          }

          return (
            <PaginationItem key={key}>
              <PaginationLink
                isActive={link.active}
                to={location.pathname + "?" + link?.url?.split("?")[1]}
                onClick={() => {
                  searchParams.set("page", link.label);
                  setSearchParams(searchParams);
                }}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
}
