"use client";
import Input from "./Input";
import Button from "./Button";
import Card from "./Card";
import { useRouter } from "next/navigation";
import { register, login } from "@/lib/api";
import { useCallback, useState } from "react";
import Link from "next/link";

const initial = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const LoginForm = () => {
  const [formState, setFormState] = useState({ ...initial });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        await login(formState);
        router.replace("/home");
      } catch (e) {
        setError(`Error logging in.`);
      } finally {
        setFormState({ ...initial });
      }
    },
    [formState, router]
  );

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">Sign In</h2>
          <p className="tex-lg text-black/25">
            Enter your credentials to access your account
          </p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link href="/register" className="text-blue-600 font-bold">
                  Don&apos;t have an account?
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" variant="secondary">
                Sign In
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default LoginForm;
