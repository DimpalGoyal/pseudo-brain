import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";

export function Signin() {
  return (
    <div className="w-screen flex justify-center items-center bg-gray-200 h-screen">
      <div className="border-gray-100 px-10 py-15 rounded-2xl bg-white shadow-xl">
        <h1 className="flex justify-center font-semibold text-2xl">SIGN IN</h1>
        <div className="pt-3">
          <InputBox placeholder="username" />
          <InputBox placeholder="password" />
        </div>
        <div className="pt-5 flex justify-center">
          <Button variant="primary" text="sign in" />
        </div>
      </div>
    </div>
  );
}
