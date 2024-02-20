"use client";

import { api } from "~/trpc/react";
import Item from "./item";

export default function List() {
  const { data, isLoading, error } = api.todo.getTasks.useQuery();

  if (isLoading) {
    return <p>Loading task list...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <ul>
      {data.map((task) => (
        <Item
          key={task.id}
          taskId={task.id}
          title={task.title}
          body={task.body}
        />
      ))}
    </ul>
  );
}
