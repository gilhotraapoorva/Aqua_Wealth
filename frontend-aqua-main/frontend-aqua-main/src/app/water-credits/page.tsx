"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function WaterCreditsMain() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-900 via-blue-800 to-blue-600 p-10 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl rounded-3xl bg-blue-900/40 backdrop-blur-xl p-10 shadow-2xl border border-blue-400/20 relative z-10"
      >
        <div className="text-center">
          {/* Centered Image */}
          <Image 
            src="https://www.ecowatch.com/wp-content/uploads/2021/10/638792383-origin.jpg" 
            alt="Water Conservation" 
            width={400} 
            height={300} 
            className="mx-auto rounded shadow-md" 
          />
          {/* Motivational Message */}
          <h1 className="mt-6 text-4xl font-extrabold text-green-300 drop-shadow-lg tracking-wide">
            Conserve Water, Earn More Credits
          </h1>
          <p className="mt-4 text-lg text-white">
            Every drop counts! The less water you use, the more credits you earn.
            Save water, secure your future, and help conserve our most precious resource.
          </p>
          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/water-credits/meters">
              <button className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
                Meters
              </button>
            </Link>
            <Link href="/water-credits/usage">
              <button className="rounded bg-green-600 px-6 py-3 text-white hover:bg-green-700">
                Usage
              </button>
            </Link>
            <Link href="/water-credits/credits">
              <button className="rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
                Credits
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
