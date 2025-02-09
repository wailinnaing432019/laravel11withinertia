import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

import TaskTable from "@/Components/TaskTable";
export default function Index({
  errors,
  auth,
  tasks,
  queryParams = null,
  success,
}) {
  queryParams = queryParams || {};

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Task
          </h2>
          <Link
            href={route("task.create")}
            className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600"
          >
            Add New
          </Link>
        </div>
      }
    >
      <Head title="Task" />
      {success && (
        <div className="py-4 mx-2 px-4 bg-emerald-500   text-white rounded">
          <p>{success}</p>
        </div>
      )}
      {/* {JSON.stringify(tasks, undefined, 2)} */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TaskTable
                tasks={tasks}
                queryParams={queryParams}
                showProjectColumns={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
