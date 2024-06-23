"use client";
import { useAuthStore } from "@/app/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Form = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAuthStore((state) => state.setUser);
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/login", {
        email,
        password,
      });
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      router.push("/products");
    } catch (error) {
      if (email === "" || password === "") {
        toast.error("Введите данные");
      } else {
        toast.error("Неверный пароль или электронная почта");
      }
    }
  };
  return (
    <>
      <form
        className="bg-gray-100 px-8 py-7 rounded-[12px] shadow-lg w-[380px] flex flex-col gap-8"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Авторизация
        </h2>
        <div className="flex flex-col gap-8 pt-6 pb-4">
          <div className="flex flex-col gap-1">
            <label className="block text-sm text-gray-800">Почта</label>
            <input
              placeholder="Почта"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-gray-200 placeholder:text-gray-600 text-sm text-gray-800 pl-4 py-2 block w-full rounded-md border 
                    focus:border-gray-300 focus:bg-transparent outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm text-gray-800">Пароль</label>
            <input
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              className="bg-gray-200 placeholder:text-gray-600 text-sm text-gray-800 pl-4 py-2 block w-full rounded-md border 
                    focus:border-gray-300 focus:bg-transparent outline-none"
            />
          </div>
        </div>
        <div className="block mx-auto">
          <button
            type="submit"
            className="px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Войти
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
};
export default Form;
