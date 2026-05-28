
interface inputProps {
  placeholder: string;
}

export function InputBox({ placeholder }: inputProps) {
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