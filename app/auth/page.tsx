"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Input from "@/app/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
      // .then((callback) => {
      //   if (callback?.ok) {
      //     console.log('logged in');

      //     toast.success("Loggred In");
      //     router.refresh();
      //     loginModal.onClose();
      //   }
      //   if (callback?.error) {
      //      toast.error(callback?.error);
      //   }
      // });
    } catch (err) {
      console.log(err);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <div className="px-12 py-5">
          <Image
            src={`/images/logo.png`}
            alt="Login"
            className="h-12"
            width="200"
            height="150"
          />
        </div>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  id="username"
                  onChange={(ev: any) =>
                    setUserName((ev.target as HTMLInputElement).value)
                  }
                  value={name}
                  type="text"
                />
              )}
              <Input
                label="Email"
                id="email"
                onChange={(ev: any) =>
                  setEmail((ev.target as HTMLInputElement).value)
                }
                value={email}
                type="text"
              />
              <Input
                label="Password"
                id="password"
                onChange={(ev: any) =>
                  setPassword((ev.target as HTMLInputElement).value)
                }
                value={password}
                type="password"
              />
            </div>

            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>

            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer
              hover:opacity-80 transition"   onClick={() => signIn('google',{ callbackUrl: "/",
            })}>
             <FcGoogle size={30} />
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer
              hover:opacity-80 transition">
             <AiFillGithub size={30}  onClick={() => signIn('github',{ callbackUrl: "/",
      })} />
              </div>
            </div>

            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account"}
              <span
                className="text-white ml-1 hover:underline cursor-pointer"
                onClick={toggleVariant}
              >
                {" "}
                {variant === "login" ? "Create an account" : "Login"}{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
