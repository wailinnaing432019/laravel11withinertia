import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function ({
  children,
  name,
  sort_field,
  sortable = true,
  sort_direction,
  sortChanged = () => {},
}) {
  return (
    <th onClick={(e) => sortChanged(name)} className="px-3 py-2 cursor-pointer">
      <div className="px-3 py-3 flex items-center justify-between gap-1">
        {children}
        {sortable && (
          <div>
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name && sort_direction === "asc"
                  ? "text-red-500 "
                  : "")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-1 " +
                (sort_field === name && sort_direction === "desc"
                  ? "text-red-500 "
                  : "")
              }
            />
          </div>
        )}
      </div>
    </th>
  );
}
