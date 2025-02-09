import { Link } from "@inertiajs/react";

export default function Pagination({ links, queryParams }) {
  queryParams = queryParams || {};

  return (
    <nav className="text-center mt-4">
      {links.map((link) => {
        if (!link.url) {
          return (
            <span
              key={link.label}
              className="inline-block py-2 px-3 rounded-lg text-gray-500 text-xs cursor-not-allowed"
              dangerouslySetInnerHTML={{ __html: link.label }}
            ></span>
          );
        }

        // Ensure we preserve all query parameters correctly
        const url = new URL(link.url, window.location.origin);
        const params = new URLSearchParams(url.search);

        // Merge existing query parameters (filters)
        Object.keys(queryParams).forEach((key) => {
          if (queryParams[key] && key !== "page") {
            params.set(key, queryParams[key]);
          }
        });

        // Ensure "page" is always correctly set
        // if (!params.has("page")) {
        //   params.set("page", "1"); // Default to page 1
        // }

        const href = `${url.pathname}?${params.toString()}`;

        return (
          <Link
            preserveScroll
            preserveState
            href={href}
            key={link.label}
            className={
              "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs " +
              (link.active ? "bg-gray-950 " : " ") +
              "hover:bg-gray-950"
            }
            dangerouslySetInnerHTML={{ __html: link.label }}
          ></Link>
        );
      })}
    </nav>
  );
}
