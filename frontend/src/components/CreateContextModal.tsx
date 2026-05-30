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
  Note = "note",
  Web = "web",
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
    onClose();
  }

  return (
    <div>
      {open && (
        <div className="w-screen flex justify-center h-screen top-0 left-0 fixed bg-slate-500/60 ">
          <div className=" justify-center flex-col flex">
            <span className="opacity-100 bg-white p-10 rounded-2xl">
              <div className="flex justify-between opacity-100 mx-2">
                <div className="font-semibold text-2xl">{title}</div>
                <div
                  className="cursor-pointer flex justify-end"
                  onClick={onClose}
                >
                  <CrossIcon />
                </div>
              </div>
              <div className="pt-4 ">
                <InputBox placeholder="title" reference={titleRef} />
                {type === ContentType.Note ? (
                  <InputBox placeholder="note" reference={linkRef} />
                ) : (
                  <InputBox placeholder="link" reference={linkRef} />
                )}
              </div>
              <div className="mx-3 py-2 gap-2 grid grid-cols-3">
                <Button
                  text="youtube"
                  variant={
                    type === ContentType.Youtube ? "primary" : "secondary"
                  }
                  onClick={() => setType(ContentType.Youtube)}
                />
                <Button
                  text="web"
                  variant={type === ContentType.Web ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Web)}
                />
                <Button
                  text="note"
                  variant={type === ContentType.Note ? "primary" : "secondary"}
                  onClick={() => setType(ContentType.Note)}
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
