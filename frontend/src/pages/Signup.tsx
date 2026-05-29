import { useRef } from "react";
import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ButtonAlert } from "../components/ButtonAlert";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
const navigate = useNavigate()

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;
    await axios.post(`${BACKEND_URL}/signup`, {
        username,
        password,
        name,
    });
    navigate('/signin')
    alert("you have signed up");
  }

  return (
    <div className="w-screen flex justify-center items-center bg-gray-200 h-screen">
      <div className="border-gray-100 px-10 py-15 rounded-2xl bg-white shadow-xl">
        <h1 className="flex justify-center font-semibold text-2xl">SIGN UP</h1>
        <div className="pt-3">
          <InputBox placeholder="name" reference={nameRef} />
          <InputBox placeholder="username" reference={usernameRef} />
          <InputBox placeholder="password" reference={passwordRef} />
        </div>
        <div className="pt-5 flex justify-center">
          <Button variant="primary" text="sign up" onClick={signup} />
        </div>
        <div className="mt-5 font-semibold">
          <ButtonAlert to="/signin" title="signin" text="already have an account? " />
        </div>
      </div>
    </div>
  );
}
