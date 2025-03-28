"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/utils/auth";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = getUser();
    if (!loggedInUser) {
      router.push("/login");
    } else {
      setUser(loggedInUser);
    }
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl">Welcome, {user.email}!</h1>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          router.push("/login");
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
