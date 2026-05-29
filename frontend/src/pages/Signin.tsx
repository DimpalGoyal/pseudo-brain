import { Button } from "../components/Button";
import { InputBox } from "../components/InputBox";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ButtonAlert } from "../components/ButtonAlert";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/signin`, {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
    navigate("/");
  }
  return (
    <div className="w-screen flex justify-center items-center bg-gray-200 h-screen">
      <div className="border-gray-100 px-10 py-15 rounded-2xl bg-white shadow-xl">
        <h1 className="flex justify-center font-semibold text-2xl">SIGN IN</h1>
        <div className="pt-3">
          <InputBox reference={usernameRef} placeholder="username" />
          <InputBox reference={passwordRef} placeholder="password" />
        </div>
        <div className="pt-5 flex justify-center">
          <Button variant="primary" text="sign in" onClick={signin} />
        </div>
        <div className="mt-5 font-semibold">
          <ButtonAlert to="/signup" title=" signup" text="don't have an account? " />
        </div>
      </div>
    </div>
  );
}
