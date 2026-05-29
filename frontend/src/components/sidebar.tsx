import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./sidebarItem";

export function Sidebar() {
  return (
    <div className="left-0 top-0 fixed bg-white h-screen w-70 border-r">
      <div className="flex items-center gap-3 ml-1">
        <div className="ml-8 mt-4">
        <Logo/>
        </div>
        <div className="pt-4 text-3xl flex font-semibold font-mono">
            PSEUDO BRAIN
        </div>
      </div>
      <div className="pt-8">
        <SidebarItem text="YouTube" icon={<YoutubeIcon />} />
        <SidebarItem text="Twitter" icon={<TwitterIcon/>} />
      </div>
    </div>
  );
}
