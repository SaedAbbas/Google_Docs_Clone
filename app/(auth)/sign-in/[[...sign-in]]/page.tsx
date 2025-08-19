import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return (
    <main className="auth-page">
      <SignIn />
          <p className="text-sm text-gray-300">
            ✨ Crafted with 💻 by{" "}
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Saed Abbas
            </span>
            ✨
          </p>
    </main>
  );
};

export default SignInPage;
