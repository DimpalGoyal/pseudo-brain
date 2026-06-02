import { BinIcon } from "../icons/BinIcon";
import { NoteIcon } from "../icons/NoteIcon";
import { ShareIcon } from "../icons/PlusIcon";
import { WebIcon } from "../icons/WebIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface cardProps {
  title: string;
  link: string;
  type: "youtube" | "note" | "web";
  onClick?: () => void;
}

export function Card({ title, link, type, onClick }: cardProps) {
  return (
    <div>
      <div className="p-6 border  shadow-md max-w-70 rounded-md bg-white">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <div className="pr-2 ">
              {type == "youtube" && <YoutubeIcon />}
              {type == "note" && <NoteIcon />}
              {type == "web" && <WebIcon />}
            </div>
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div
            className="flex gap-2 justify-center items-center"
            onClick={onClick}
          >
            <div className="cursor-pointer flex justify-center items-center hover:bg-slate-200  rounded-full duration-200">
              <ShareIcon />
            </div>
            <div className="cursor-pointer hover:bg-slate-200  rounded-full duration-200">
              <BinIcon />
            </div>
          </div>
        </div>
        <div className="pt-4 flex justify-center items-center">
          {type === "youtube" && (
            <iframe
              className="w-full rounded-md"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          )}
          {type === "note" && (
            <div className="flex justify-start ml-2 w-64 flex-wrap mt-1">
              <div>{link}</div>
            </div>
          )}
          {type === "web" && (
            <div className="flex justify-start ml-2 w-64 flex-wrap mt-1">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-800 duration-150"
              >
                {link.split("/").pop()?.replaceAll("-", " ")}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
