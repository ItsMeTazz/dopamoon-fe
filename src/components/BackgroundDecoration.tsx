'use client'
import { motion } from "framer-motion";
import Image from "next/image";
import greenFlask from "@/src/statics/images/deadogre.png";

export default function BackgroundDecoration() {

  return (
    <div className="fixed top-0 left-0 h-screen w-screen z-10 overflow-hidden">
      {/* Top Right blurred effect */}
      <div className="animate-pulse absolute -bottom-16 -left-32 w-96 h-96 bg-moon/40 rounded-full blur-3xl z-0" />
      <div className="animate-pulse absolute -bottom-16 -right-32 w-96 h-96 bg-moon/40 rounded-full blur-3xl z-0" />

      <div className="remedy">DOPAMOON</div>
      <video
        autoPlay
        muted
        className="top-0 left-0 object-cover w-screen h-screen opacity-30"
      >
        <source src={"/videos/earth.mp4"} type="video/mp4" />
      </video>
    </div>
  );
}
