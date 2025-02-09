import TableHeading from "@/Components/TableHeading";
import TaskTable from "@/Components/TaskTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

export default function Show({
  errors,
  auth,
  user,
  tasks,
  queryParams = null,
}) {
  queryParams = queryParams || {};

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          User - {user.name}
        </h2>
      }
    >
      <Head title={`User -"${user.name}"`} />
      {/* <pre>{JSON.stringify(user, undefined, 2)}</pre> */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div>
                <img
                  src={user.image_path}
                  alt=""
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="grid gap-1 grid-cols-2 ">
                <div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">User ID</label>
                    <p className="mt-1">{user.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">User Name</label>
                    <p className="mt-1">{user.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">User Status</label>
                    <p className="mt-1">{user.status}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">{user.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Due Date</label>
                    <p className="mt-1">{user.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Created Date</label>
                    <p className="mt-1">{user.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Updated Date</label>
                    <p className="mt-1">{user.updatedBy.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="font-bold text-lg">Description</label>
                <p className="mt-1">{user.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TaskTable
                tasks={tasks}
                queryParams={queryParams}
                user_show="true"
                user_id={user.id}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
