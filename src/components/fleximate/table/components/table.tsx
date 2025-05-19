"use client";
"use no memo";

import type {
  DataTableAdvancedFilterField,
  DataTableFilterField,
  DataTableRowAction,
} from "../types";
import type { ColumnDef } from "@tanstack/react-table";
import { LucideIcon } from "lucide-react";
import * as React from "react";

import { DataTable } from "./data-table";
import { DataTableAdvancedToolbar } from "./data-table-advanced-toolbar";
import { DataTableToolbar } from "./data-table-toolbar";
import { useDataTable } from "../hooks/use-data-table";
import { toSentenceCase } from "../utils/utils";

import { TasksTableFloatingBar } from "./helper/tasks-table-floating-bar";
import { TasksTableToolbarActions } from "./helper/tasks-table-toolbar-actions";
import { UpdateTaskSheet } from "./helper/update-task-sheet";
import { DeleteTasksDialog } from "./helper/delete-tasks-dialog";

// Define task status and priority types
export const TaskStatus = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
} as const;

export const TaskPriority = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];
export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

// Define base task interface
export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
}

type ExtractString<T> = Extract<keyof T, string>;

interface TasksTableProps<TData extends Task> {
  columns: ColumnDef<TData>[];
  data: TData[];
  pageCount: number;
  statusCounts: Record<TaskStatus, number>;
  priorityCounts: Record<TaskPriority, number>;
}

interface FilterOption {
  label: string;
  value: string;
  icon?: LucideIcon;
  count?: number;
}

// Helper functions for icons (implement these based on your icon system)
const getStatusIcon = (status: TaskStatus): LucideIcon | undefined => {
  // Implement your icon logic here
  return undefined;
};

const getPriorityIcon = (priority: TaskPriority): LucideIcon | undefined => {
  // Implement your icon logic here
  return undefined;
};

const enableAdvancedTable = true;
const enableFloatingBar = true;

export function TasksTable<TData extends Task>({
  data,
  pageCount,
  statusCounts,
  priorityCounts,
  columns,
}: TasksTableProps<TData>) {
  const [rowAction, setRowAction] =
    React.useState<DataTableRowAction<TData> | null>(null);

  const statusOptions = Object.values(TaskStatus);
  const priorityOptions = Object.values(TaskPriority);

  const filterFields: DataTableFilterField<TData>[] = [
    {
      id: "title" as ExtractString<TData>,
      label: "Title",
    },
    {
      id: "status" as ExtractString<TData>,
      label: "Status",
      options: statusOptions.map((status) => ({
        label: toSentenceCase(status),
        value: status,
      })),
    },
  ];

  const advancedFilterFields: DataTableAdvancedFilterField<TData>[] = [
    {
      id: "title" as ExtractString<TData>,
      label: "Title",
      type: "text",
    },
    {
      id: "status" as ExtractString<TData>,
      label: "Status",
      type: "select",
      options: statusOptions.map((status) => ({
        label: toSentenceCase(status),
        value: status,
        icon: getStatusIcon(status),
        count: statusCounts[status],
      })) as FilterOption[],
    },
    {
      id: "priority" as ExtractString<TData>,
      label: "Priority",
      type: "multi-select",
      options: priorityOptions.map((priority) => ({
        label: toSentenceCase(priority),
        value: priority,
        icon: getPriorityIcon(priority),
        count: priorityCounts[priority],
      })) as FilterOption[],
    },
    {
      id: "createdAt" as ExtractString<TData>,
      label: "Created at",
      type: "date",
    },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount,
    enableAdvancedFilter: enableAdvancedTable,
    initialState: {
      sorting: [{ id: "createdAt" as ExtractString<TData>, desc: true }],
      columnPinning: { right: ["actions"] },
    },
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
  });

  return (
    <>
      <DataTable
        table={table}
        floatingBar={
          enableFloatingBar ? (
            <TasksTableFloatingBar<TData>
              table={table}
              statusOptions={statusOptions}
              priorityOptions={priorityOptions}
              updateTasks={async (ids, updates) => {
                // Implement your update logic here
                return { error: null };
              }}
              deleteTasks={async (ids) => {
                // Implement your delete logic here
                return { error: null };
              }}
              exportTableToCSV={(table, options) => {
                // Implement your export logic here
              }}
            />
          ) : null
        }
      >
        {enableAdvancedTable ? (
          <DataTableAdvancedToolbar
            table={table}
            filterFields={advancedFilterFields}
            shallow={false}
          >
            <TasksTableToolbarActions<TData>
              table={table}
              createTask={async (task) => {
                // Implement your create logic here
                return { error: null };
              }}
              deleteAction={async (ids) => {
                // Implement your delete logic here
                return { error: undefined };
              }}
              FormComponent={TaskForm}
              onExportTable={(table) => {
                // Implement your export logic here
              }}
            />
          </DataTableAdvancedToolbar>
        ) : (
          <DataTableToolbar table={table} filterFields={filterFields}>
            <TasksTableToolbarActions<TData>
              table={table}
              createTask={async (task) => {
                // Implement your create logic here
                return { error: null };
              }}
              deleteAction={async (ids) => {
                // Implement your delete logic here
                return { error: undefined };
              }}
              FormComponent={TaskForm}
              onExportTable={(table) => {
                // Implement your export logic here
              }}
            />
          </DataTableToolbar>
        )}
      </DataTable>
      <UpdateTaskSheet
        open={rowAction?.type === "update"}
        onOpenChange={() => setRowAction(null)}
        task={rowAction?.row.original ?? null}
        onSubmit={async (task) => {
          // Implement your update logic here
          return { error: null };
        }}
        FormComponent={TaskForm}
      />
      <DeleteTasksDialog
        open={rowAction?.type === "delete"}
        onOpenChange={() => setRowAction(null)}
        ids={rowAction?.row.original ? [rowAction?.row.original.id] : []}
        showTrigger={false}
        onSuccess={() => rowAction?.row.toggleSelected(false)}
      />
    </>
  );
}

function TaskForm() {
  return <div>TaskForm</div>;
}
