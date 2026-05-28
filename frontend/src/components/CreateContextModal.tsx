import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

interface modalProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

export function CreateContextModal({ title, open, onClose }: modalProps) {
  return (
    <div>
      {open && (
        <div className="w-screen flex justify-center h-screen top-0 left-0 fixed bg-slate-400 opacity-60">
          <div className=" justify-center flex-col flex">
            <span className="opacity-100 bg-white p-10 rounded">
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
                <InputBox placeholder="title" />
                <InputBox placeholder="link" />
              </div>
              <div className="flex justify-center pt-4">
                <Button variant="primary" text="submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

interface inputProps {
  placeholder: string;
}

function InputBox({ placeholder }: inputProps) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        className="px-4 py-2 m-2 border rounded"
      />
    </div>
  );
}
