import Select from "react-select";
import { useRouter } from "../../utils/router";
import TagSelect from "../tags/inputs/TagSelect";

interface UrlFilterQuery {
  search?: string;
  type?: string;
  category?: string;
}

export default function Filters({
  hasSearch = true,
  hasCategories = true,
  types = {},
}) {
  const router = useRouter();
  const { search, type, category }: UrlFilterQuery = router.query;

  const onFilterChange = (filterType: string, option: string) => {
    router.push({
      query: {
        ...router.query,
        [filterType]: option,
      },
    });
  };

  const typeOptions = Object.keys(types).map((typeName) => {
    return {
      value: typeName,
      label: types[typeName].label,
    };
  });

  return (
    <div>
      <div className="flex flex-col items-center space-x-0 mb-6 z-10 relative md:flex-row md:flex md:space-x-4 sm:grid sm:grid-cols-2 sm:space-x-0 sm:gap-4">

        {hasSearch && (
          <div className="relative ml-0 text-gray-600 focus-within:text-gray-400 sm:col-span-2">
            <span className="absolute inset-y-0 left-3 flex items-center ">
              {/* <button type="submit" class="p-1 focus:outline-none focus:shadow-outline"> */}
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              {/* </button> */}
            </span>

            <input
              onChange={(e) => onFilterChange("search", e.target.value)}
              value={search || ""}
              type="search"
              name="q"
              className="
                block
                pl-10
                rounded-md
                border-main/50
                shadow-sm
                focus:border-main focus:ring focus:ring-main/50"
              placeholder="Search..."
              autoComplete="off"
            />
          </div>
        )}
        {hasCategories && (
          <div className="relative ml-0 w-full mt-5 md:w-auto md:pr-0 sm:mt-0 ">
            <TagSelect selected={category} tagType={`category`} onSelect={(tag: any) => onFilterChange("category", tag?.id)} />
          </div>
        )}
        {!!typeOptions.length && (
          <div className="relative ml-0 w-full mt-5 md:w-auto md:mt-0 sm:mt-0">
            <Select
              name="types"
              className="absolute z-0"
              styles={{
                menu: (base) => ({
                  ...base,
                  width: "max-content",
                  minWidth: "100%",
                }),
              }}
              // defaultValue={category}resourceTypes[typeName].label
              value={type && { value: type, label: types[type].label }}
              onChange={(option) => onFilterChange("type", option?.value)}
              placeholder={"Select type..."}
              options={typeOptions}
              instanceId="type"
              classNamePrefix="select"
              isClearable
              isSearchable={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
