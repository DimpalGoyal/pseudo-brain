import type { ReactElement } from "react";

export function SidebarItem({
  text,
  icon,
}: {
  text: string;
  icon?: ReactElement;
}) {
  return (
    <div className="flex items-center pt-2 pl-10 cursor-pointer hover:bg-slate-200 rounded mx-6 py-2">
      <div className="pr-2 pt-2">{icon}</div>
      <div className="text-2xl pl-1 pt-1">{text}</div>
    </div>
  );
}
