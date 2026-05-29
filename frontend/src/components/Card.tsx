import { ShareIcon } from "../icons/PlusIcon";

interface cardProps {
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

export function Card({ title, link, type }: cardProps) {
  return (
    <div>
      <div className="p-6 border  shadow-md max-w-70 rounded-md bg-white">
        <div className="flex items-center justify-between ">
          <div className="flex items-center">
            <div className="pr-2">
              <ShareIcon />
            </div>
            <span className="text-xl font-semibold">{title}</span>
          </div>
          <div className="flex gap-2">
            <ShareIcon />
            <ShareIcon />
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
          {type === "twitter" && (
            <div className="w-full rounded-md items-center justify-center">
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
              ></script>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
