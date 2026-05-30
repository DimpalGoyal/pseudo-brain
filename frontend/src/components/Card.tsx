import { BinIcon } from "../icons/BinIcon";
import { ShareIcon } from "../icons/PlusIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

interface cardProps {
  title: string;
  link: string;
  type: "youtube" | "note" | "web";
}

export function Card({ title, link, type }: cardProps) {
  return (
    <div>
      <div className="p-6 border  shadow-md max-w-70 rounded-md bg-white">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <div className="pr-2 ">
              {type == "youtube" && <YoutubeIcon/>}
              {type == "note" && <BinIcon/>}
              {type == "web" && <BinIcon/>}
            </div>
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <ShareIcon />
            <BinIcon/>
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
        </div>
      </div>
    </div>
  );
}
