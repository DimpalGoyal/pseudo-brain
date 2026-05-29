import axios from "axios";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { useState } from "react";
import { useRef } from "react";
import { BACKEND_URL } from "../config";

interface modalProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

export function CreateContextModal({ title, open, onClose }: modalProps) {
  const [type, setType] = useState(ContentType.Youtube);

  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    await axios.post(
      `${BACKEND_URL}/content`,
      {
        title,
        link,
        type,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    );
    onClose()
  }

  return (
    <div>
      {open && (
        <div className="w-screen flex justify-center h-screen top-0 left-0 fixed bg-slate-500/60 ">
          <div className=" justify-center flex-col flex">
            <span className="opacity-100 bg-white p-10 rounded-2xl">
              <div className="flex justify-between opacity-100">
                <div className="font-semibold text-xl">{title}</div>
                <div
                  className="cursor-pointer flex justify-end"
                  onClick={onClose}
                >
                  <CrossIcon />
                </div>
              </div>
              <div className="pt-4">
                <InputBox placeholder="title" reference={titleRef} />
                <InputBox placeholder="link" reference={linkRef} />
              </div>
              <div className="mx-3 py-2 gap-2 grid grid-cols-2">
                <Button
                  text="youtube"
                  variant={
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }
                  onClick={() => setType(ContentType.Youtube)}
                />
                <Button
                  text="twitter"
                  variant={
                    type === ContentType.Twitter ? "primary" : "secondary"
                  }
                  onClick={() => setType(ContentType.Twitter)}
                />
              </div>
              <div className="flex justify-center pt-4">
                <Button variant="primary" text="submit" onClick={addContent} />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
