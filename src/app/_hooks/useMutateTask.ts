"use client";

import { useStore } from "~/store";
import { api } from "~/trpc/react";

export const useMutateTask = () => {
  const reset = useStore((state) => state.resetEditedTask);
  const utils = api.useUtils();

  const createTaskMutation = api.todo.createTask.useMutation({
    onSuccess: (res) => {
      // キャッシュ取得
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        // キャッシュの先頭にデータを挿入して更新
        // 第一引数の意味をよくわかっていない
        utils.todo.getTasks.setData(undefined, [res, ...previousTodos]);
      }
      reset();
    },
  });

  const updateTaskMutation = api.todo.updateTask.useMutation({
    onSuccess: (res) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(
          undefined,
          previousTodos.map((task) => (task.id === res.id ? res : task)),
        );
      }
      reset();
    },
  });

  const deleteTaskMutation = api.todo.deleteTask.useMutation({
    onSuccess: (_, input) => {
      const previousTodos = utils.todo.getTasks.getData();
      if (previousTodos) {
        utils.todo.getTasks.setData(
          undefined,
          previousTodos.filter((task) => task.id !== input.taskId),
        );
      }
      reset();
    },
  });

  return { createTaskMutation, updateTaskMutation, deleteTaskMutation };
};
