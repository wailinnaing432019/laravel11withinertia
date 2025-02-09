import Pagination from "@/Components/Pagination";

import { Link, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import TableHeading from "@/Components/TableHeading";
import {
  TASK_STATUS_CLASS_MAP,
  TASK_STATUS_TEXT_MAP,
  TASK_PRIORITY_CLASS_MAP,
  TASK_PRIORITY_TEXT_MAP,
} from "@/Pages/constant";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";
import Swal from "sweetalert2";
export default function TaskTable({
  tasks,
  queryParams,
  project_show = false,
  project_id = null,
  showProjectColumns = false,
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
    if (project_show && project_id) {
      router.get(route("project.show", [project_id, queryParams]));
    } else {
      router.get(route("task.index", queryParams));
    }
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

    if (project_show) {
      router.get(route("project.show", [project.id, queryParams]));
    } else {
      router.get(route("task.index", queryParams));
    }
  };
  const deleteTask = (task) => {
    Swal.fire({
      title: `<span style="font-family: 'Poppins', sans-serif; font-size: 22px; font-weight: bold; color: #333;">Are you sure you want to delete this task?</span>`,
      html: `<span style="font-family: 'Poppins', sans-serif; font-size: 18px; color: #555;">${task.name}</span>`,
      showDenyButton: true,
      confirmButtonText: "✅ Confirm Delete",
      denyButtonText: "❌ Cancel",
      icon: "warning",
      customClass: {
        popup: "swal2-popup-custom",
        title: "swal2-title-custom",
        confirmButton: "swal2-confirm-custom",
        denyButton: "swal2-deny-custom",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route("task.destroy", task.id));
      }
    });
  };

  return (
    <>
      <div className="overflow-auto rounded-lg">
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
              <th className="px-3 py-2">Image</th>
              {showProjectColumns && (
                <th className="px-3 py-2">Project Name</th>
              )}
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
                Status
              </TableHeading>
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Created At
              </TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Due Date
              </TableHeading>
              <th className="px-3 py-2">Created By</th>
              <th className="px-3 py-2 text-right">Action</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-2"></th>
              {showProjectColumns && <th className="px-3 py-2"></th>}
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2">
                <TextInput
                  defaultValue={queryParams.name}
                  className="w-full"
                  placeholder="Task Name"
                  onBlur={(e) => searchFieldChanged("name", e.target.value)}
                  onKeyPress={(e) => onKeyPress("name", e)}
                />
              </th>
              <th className="px-3 py-2">
                <SelectInput
                  defaultValue={queryParams.status}
                  className="w-full"
                  onChange={(e) => searchFieldChanged("status", e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-2"> </th>
              <th className="px-3 py-2"> </th>
              <th className="px-3 py-2"> </th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {tasks?.data?.length > 0 ? (
              tasks.data.map((task) => (
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
                  {showProjectColumns && <td>{task.project.name}</td>}
                  <td className="px-3 py-2 hover:underline">
                    <Link href={route("task.show", task.id)}>{task.name}</Link>
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
                  <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                  <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                  <td className="px-3 py-2">
                    {task.createdBy?.name || "Unknown"}
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
      <Pagination links={tasks.meta.links} queryParams={queryParams} />
    </>
  );
}
