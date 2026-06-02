import { HomeIcon } from "../icons/HomeIcon";
import { Logo } from "../icons/Logo";
import { NoteIcon } from "../icons/NoteIcon";
import { WebIcon } from "../icons/WebIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./sidebarItem";

export function Sidebar({
  noteFilter,
  home,
  youtubeBtn,
  webBtn,
}: {
  noteFilter?: () => void;
  home?: () => void;
  youtubeBtn?: () => void;
  webBtn?: () => void;
}) {
  return (
    <div className="left-0 top-0 fixed bg-white h-screen w-64 border-r">
      <div className="flex items-center gap-3 ml-1">
        <div className="ml-5 mt-4">
          <Logo />
        </div>
        <div className="pt-4 text-3xl flex font-semibold font-mono">
          PSEUDO BRAIN
        </div>
      </div>
      <div className="pt-8">
        <div onClick={home}>
          <SidebarItem text="home" icon={<HomeIcon/>} />
        </div>
        <div onClick={youtubeBtn} >
          <SidebarItem text="YouTube" icon={<YoutubeIcon />} />
        </div>
        <div onClick={noteFilter}>
          <SidebarItem text="Note" icon={<NoteIcon />} />
        </div>
        <div onClick={webBtn}>
          <SidebarItem text="Web" icon={<WebIcon />} />
        </div>
      </div>
    </div>
  );
}
