import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Link, router } from "@inertiajs/react";
import {
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
} from "@/Pages/constant";
export default function Dashboard({
  myPendingTasks,
  myProgressTask,
  myCompletedTask,
  totalPendingTasks,
  totalProgressTasks,
  totalCompletedTasks,
  myActiveTasks,
}) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid grid-cols-3 gap-2 ">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-amber-500 text-2xl font-semibold">
                Pending Tasks
              </h3>
              <p className="text-xl mt-4">
                <span className="mr-2">{myPendingTasks}</span>/
                <span className="ml-2">{totalPendingTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-blue-500 text-2xl font-semibold">
                Progress Tasks
              </h3>
              <p className="text-xl mt-4">
                <span className="mr-2">{myProgressTask}</span>/
                <span className="ml-2">{totalProgressTasks}</span>
              </p>
            </div>
          </div>
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <h3 className="text-green-500 text-2xl font-semibold">
                Completed Tasks
              </h3>
              <p className="text-xl mt-4">
                <span className="mr-2">{myCompletedTask}</span>/
                <span className="ml-2">{totalCompletedTasks}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-2">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 ">
          <h3 className="text-gray-100 text-2xl font-semibold">
            My Active Tasks
          </h3>
          <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                <tr className="text-nowrap">
                  <th className="px-3 py-2  ">ID</th>
                  <th className="px-3 py-2  ">Image</th>
                  <th className="px-3 py-2">Project Name</th>
                  <th className="px-3 py-2"> Name</th>
                  <th className="px-3 py-2">Due Date</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {/* <pre>{JSON.stringify(myActiveTasks,undefined,2)}</pre> */}
                {myActiveTasks?.data?.length > 0 ? (
                  myActiveTasks.data.map((task) => (
                    <tr
                      key={task.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th className="px-3 py-2">{task.id}</th>
                      <td className="px-3 py-2">
                        <img
                          src={task.image_path}
                          alt={`Task ${task.name}`}
                          className="w-16 h-16 object-cover"
                        />
                      </td>
                      <td className="px-3 py-2 hover:underline hover:text-gray-100">
                        <Link href={route("project.show", task.project.id)}>
                          {task.project.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2 hover:underline">
                        <Link href={route("task.show", task.id)}>
                          {task.name}
                        </Link>
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={
                            "px-2 py-1 rounded text-white " +
                            TASK_STATUS_CLASS_MAP[task.status]
                          }
                        >
                          {TASK_STATUS_TEXT_MAP[task.status]}
                        </span>
                      </td>

                      <td className="px-3 py-2">
                        <div className="flex">
                          <Link
                            href={route("task.edit", task.id)}
                            className="font-medium text-blue-500 dark:text-blue-500 hover:underline mx-1"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={(e) => deleteTask(task)}
                            className="font-medium text-red-500 dark:text-red-500 hover:underline mx-1"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-3 py-2 text-center">
                      No tasks available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
