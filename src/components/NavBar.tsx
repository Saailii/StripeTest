"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import LoginButton from "./LoginButton";

export default function NavBar() {
  const session = useSession();

  console.log(session);

  console.log(session.status);

  return (
    <nav className="flex w-full justify-center items-center fixed top-10 ">
      <ul className="flex justify-center items-center gap-5 bg-black text-white py-3 px-7 rounded-full">
        <li className="">
          <a href="/">Accueil</a>
        </li>
        <li>
          <a href="">Terminal</a>
        </li>
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>
        {session.status === "unauthenticated" ? (
          <LoginButton />
        ) : (
          <button onClick={() => signOut()}>signOut</button>
        )}

        <li>
          {session.data?.user && (
            <img
              src={session.data?.user.image}
              className="rounded-full size-10"
              alt=""
            />
          )}
        </li>
      </ul>
    </nav>
  );
}
