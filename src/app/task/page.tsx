import TaskForm from "./task-form";
import List from "./list";
import Link from "next/link";

export default function Task({ params }: { params: { id: string } }) {
  return (
    <>
      <Link href={`/`}>Home</Link>
      <TaskForm />
      <List />
    </>
  );
}
