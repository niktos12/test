import Link from "next/link";
import { usePathname } from "next/navigation";
import { Arrow } from "../Arrow/Arrow";

export function Menu (){
  const router = usePathname();
  return (
    <ul className="p-[10px] flex flex-col gap-4">
      <li>
        <Link
          href={'/products'}
          className="pr-1 relative flex justify-between items-center text-slate-800 font-medium text-xl transition group"
        >
          Товары
          <Arrow/>
        </Link>
      </li>
      <li>
        <Link
          href={'/algorithms'}
          className="pr-1 relative flex justify-between items-center text-slate-800 font-medium text-xl transition group"
        >
          Алгоритмы
          <Arrow/>
        </Link>
      </li>
    </ul>
  );
};