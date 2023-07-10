import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const RecoveryPw = () => {
  return (
    <div className="grid h-screen w-full place-items-center">
      <form
        action=""
        method="POST"
        className="flex flex-col w-full px-2.5 space-y-3 md:w-1/3"
      >
        <h1 className=" cs-font-32 font-extrabold leading-tight text-black">
          Reset your password
        </h1>
        <p className="mt-2 text-lg text-gray-600 ">
          If the account exists, we'll email you instructions to reset the
          password.
        </p>
        <label htmlFor="email" className="text-base font-semibold text-black">
          Email:
        </label>
        <input
          className="flex h-10 w-full rounded-md border border-gray-500 bg-transparent px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-yellow-900 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="email"
          name="email"
          placeholder="Email"
        ></input>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-lg bg-yellow-800 py-1.5 font-semibold leading-7 text-white hover:bg-yellow-950"
        >
          Reset password
        </button>
        <Link
          to="/"
          className="inline-flex self-center text-base font-semibold text-cyan-700  hover:underline"
        >
          <ArrowLeft className="ml-1  self-center" size={16} />
          Return to login
        </Link>
      </form>
    </div>
  );
};

export default RecoveryPw;
