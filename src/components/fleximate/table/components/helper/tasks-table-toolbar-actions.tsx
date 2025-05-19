"use client";

import type { Table } from "@tanstack/react-table";
import { Download, Plus } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

import { DeleteTasksDialog } from "./delete-tasks-dialog";
import { UpdateTaskSheet } from "./update-task-sheet";
import { Task } from "../table";

interface TasksTableToolbarActionsProps<TTask extends Task> {
  table: Table<TTask>;
  createTask?: (task: Omit<TTask, "id">) => Promise<{ error: string | null }>;
  deleteAction?: (ids: string[]) => Promise<{ error?: string }>;
  FormComponent?: React.ComponentType<{
    task: TTask | null;
    onSubmit: (data: any) => void;
    isPending: boolean;
  }>;
  onExportTable?: (table: Table<TTask>) => void;
}

export function TasksTableToolbarActions<TTask extends Task>({
  table,
  createTask,
  deleteAction,
  FormComponent,
  onExportTable,
}: TasksTableToolbarActionsProps<TTask>) {
  const [isCreateSheetOpen, setIsCreateSheetOpen] = React.useState(false);
  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="flex items-center gap-2">
      {selectedRows.length > 0 ? (
        <DeleteTasksDialog
          ids={selectedRows.map((row) => row.original.id)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
          deleteAction={deleteAction}
        />
      ) : null}
      {createTask && FormComponent && (
        <Sheet open={isCreateSheetOpen} onOpenChange={setIsCreateSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="default" size="sm">
              <Plus className="mr-2 size-4" />
              Create Task
            </Button>
          </SheetTrigger>
          <UpdateTaskSheet<TTask>
            task={null}
            onSubmit={async (data) => {
              // Remove the id since we're creating a new task
              const { id, ...taskData } = data;
              return createTask(taskData as Omit<TTask, "id">);
            }}
            FormComponent={FormComponent}
            open={isCreateSheetOpen}
            onOpenChange={setIsCreateSheetOpen}
          />
        </Sheet>
      )}
      {onExportTable && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onExportTable(table)}
        >
          <Download className="mr-2 size-4" />
          Export
        </Button>
      )}
      {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
    </div>
  );
}
