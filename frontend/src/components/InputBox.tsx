interface inputProps {
  placeholder: string;
  reference?: any;
}

const linkBox = "px-4 py-2 m-2 border w-full rounded";
const NoteBox = "flex justify-center px-6 py-2 w-full min-h-40 m-2 border rounded-md";

export function InputBox({ placeholder, reference }: inputProps) {
  return (
    <div>
      <div className="ml-3">
        {placeholder}
      </div>
    <div>
      {placeholder == "note" ? (
        <textarea ref={reference} className={NoteBox} />
      ) : (
        <input ref={reference} className={linkBox} />
      )}
    </div>
    </div>
  );
}
