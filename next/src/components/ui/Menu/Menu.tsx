import Link from "next/link";
import { usePathname } from "next/navigation";
import { Arrow } from "../Arrow/Arrow";

export function Menu() {
  const router = usePathname();
  return (
    <ul className="p-4 flex flex-col gap-6">
      <li>
        <Link
          href={'/products'}
          className="pr-2 relative flex justify-between items-center text-gray-500 font-semibold text-lg transition group hover:text-black"
        >
          Товары
          <Arrow />
        </Link>
      </li>
      <li>
        <Link
          href={'/algorithms'}
          className="pr-2 relative flex justify-between items-center text-gray-500 font-semibold text-lg transition group hover:text-black"
        >
          Алгоритмы
          <Arrow />
        </Link>
      </li>
    </ul>
  );
};