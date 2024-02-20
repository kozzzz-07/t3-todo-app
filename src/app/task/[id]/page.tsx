"use client";

import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import Link from "next/link";
import { api } from "~/trpc/react";

export default function Task({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = api.todo.getSingleTask.useQuery({
    taskId: params.id,
  });

  if (isLoading) {
    return <p>Loading single task...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <p className="mb-3 text-xl font-bold text-blue-600">{data?.title}</p>
      <p>{data?.body}</p>
      <p className="my-1 text-sm">
        {data && format(new Date(data.createdAt), "yyyy-MM-dd HH:mm:ss")}
      </p>
      <p className="my-1 text-sm">
        {data && format(new Date(data.updatedAt), "yyyy-MM-dd HH:mm:ss")}
      </p>
      <Link href={`/task`}>
        <ArrowUturnLeftIcon className="mt-3 h-6 w-6 cursor-pointer text-blue-600" />
      </Link>
    </>
  );
}
