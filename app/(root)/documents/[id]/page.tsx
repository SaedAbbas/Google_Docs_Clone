import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import React from "react";

const Document = () => {
  return (
    <div className="">
      <Header>
        <div className="flex gap-2">
          <div className="flex w-fit items-center justify-center gap-2">
            <p className="document-title">Share</p>
          </div>
          <div className="flex justify-center items-center">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </Header>
      <Editor />
    </div>
  );
};

export default Document;
