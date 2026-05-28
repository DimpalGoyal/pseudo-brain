
interface inputProps {
  placeholder: string;
    reference?: any;
}

export function InputBox({ placeholder, reference}: inputProps) {
  return (
    <div>
      <input
        type="text"
        ref={reference}
        placeholder={placeholder}
        className="px-4 py-2 m-2 border rounded"
      />
    </div>
  );
}