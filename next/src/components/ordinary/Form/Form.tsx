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
        className="bg-slate-200 px-8 py-7 rounded-[10px] shadow-md w-[360px] flex flex-col gap-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-medium text-center text-zinc-900">
          Авторизация
        </h2>
        <div className="flex flex-col gap-9 pt-8 pb-[10px]">
          <div className="flex flex-col gap-1">
            <label className="block text-sm text text-zinc-900">Почта</label>
            <input
              placeholder="Почта"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-[#C9CFD8] placeholder:text-[#888F99] text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border 
                    focus:border-[#C9CFD8] focus:bg-transparent outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="block text-sm text text-zinc-900">Пароль</label>
            <input
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-[#C9CFD8] placeholder:text-[#888F99] text-sm text-zinc-900 pl-[10px] py-[6px] block w-full rounded-md border 
                    focus:border-[#C9CFD8] focus:bg-transparent outline-none"
            />
          </div>
        </div>
        <div className="block mx-auto">
          <button
            type="submit"
            className="px-6 py-2 rounded-md font-medium text-base transition duration-200 bg-slate-300 text-zinc-900 hover:bg-slate-400"
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
