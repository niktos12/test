"use client";
import React from "react";
import { Logo } from "@/components/ui/Logo/Logo";
import { Menu } from "@/components/ui/Menu/Menu";
import { User } from "../ui/User/User";
import { useAuth } from "@/app/hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="h-screen w-64 bg-white flex flex-col justify-between">
      <>
        <Logo />
        <Menu />
      </>
      <User
        fullname={user?.name}
        roles={
          user?.roles.length === 2
            ? ["Админ", "Пользователь"]
            : ["Пользователь"]
        }
      />
    </div>
  );
};

export default Sidebar;