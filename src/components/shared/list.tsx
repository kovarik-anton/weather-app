import { ReactNode } from "react";

interface Props<T> {
  data: T[];
  render: (item: T) => ReactNode;
}

export default function List<T>({ data, render }: Props<T>) {
  if (data.length === 0) return null;

  return (
    <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 2xl:grid-cols-8">
      {data.map(render)}
    </ul>
  );
}
