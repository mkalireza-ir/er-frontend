import React from "react";
import Link from "next/link";
import { IoArrowBackCircleSharp } from "react-icons/io5";
export default function BackBtn({ url }) {
  return (
    <Link
      href={url}
      className="absolute left-5 bottom-5 bg-black rounded-md text-white p-3 "
    >
      <IoArrowBackCircleSharp size={30} />
    </Link>
  );
}
