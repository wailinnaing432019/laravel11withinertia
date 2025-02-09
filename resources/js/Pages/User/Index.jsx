import Pagination from "@/Components/Pagination";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
export default function Index({
  errors,
  auth,
  users,
  queryParams = null,
  success,
}) {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    // 🔥 When changing filters, always reset page to 1
    delete queryParams["page"];
    router.get(route("user.index", queryParams));
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  };

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("user.index", queryParams));
  };

  const deleteUser = (user) => {
    if (!window.confirm("Are you sure you want to delete this user")) {
      return;
    }
    router.delete(route("user.destroy", user.id));
  };
  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            User
          </h2>
          <Link
            href={route("user.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="User" />
      {success && (
        <div className="py-4 mx-2 px-4 bg-emerald-500   text-white rounded">
          <p>{success}</p>
        </div>
      )}
      {/* {JSON.stringify(users, undefined, 2)} */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <TableHeading
                        name="id"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        ID
                      </TableHeading>
                      <TableHeading
                        name="name"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Name
                      </TableHeading>
                      <TableHeading
                        name="status"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Email
                      </TableHeading>
                      <TableHeading
                        name="created_at"
                        sort_field={queryParams.sort_field}
                        sort_direction={queryParams.sort_direction}
                        sortChanged={sortChanged}
                      >
                        Created At
                      </TableHeading>

                      <th className="px-3 py-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                      <th className="px-3 py-2"></th>
                      <th className="px-3 py-2">
                        <TextInput
                          defaultValue={queryParams.name}
                          className="w-full"
                          placeholder="Search with name or email address"
                          onBlur={(e) =>
                            searchFieldChanged("name", e.target.value)
                          }
                          onKeyPress={(e) => onKeyPress("name", e)}
                        />
                      </th>

                      <th className="px-3 py-2"> </th>
                      <th className="px-3 py-2"> </th>
                      <th className="px-3 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.data?.length > 0 ? (
                      users.data.map((user) => (
                        <tr
                          key={user.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th className="px-3 py-2">{user.id}</th>

                          <td className="px-3 py-2 text-gray-100 text-nowrap">
                            {user.name}
                          </td>
                          <td className="px-3 py-2 text-gray-100 text-nowrap">
                            {user.email}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {user.created_at}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            <Link
                              href={route("user.edit", user.id)}
                              className="font-medium text-blue-500 dark:text-blue-500 hover:underline mx-1"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={(e) => deleteUser(user)}
                              className="font-medium text-red-500 dark:text-red-500 hover:underline mx-1"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="px-3 py-2 text-center">
                          No users available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <Pagination links={users.meta.links} queryParams={queryParams} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
