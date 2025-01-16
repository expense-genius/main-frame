"use client";

import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("User not found, redirecting to sign-in page");
      router.push("/sign-in");
    }
  }, [user, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // return (
  //   <div className="flex flex-col items-center justify-center min-h-screen">
  //     <h1 className="text-3xl font-bold">Welcome, {user.email}!</h1>
  //     <button
  //       onClick={signOut}
  //       className="mt-4 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
  //     >
  //       Sign Out
  //     </button>
  //   </div>
  // );
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="md:col-span-2 bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
            <p className="text-lg text-gray-700">
              Your email: <span className="font-medium">{user.email}</span>
            </p>
          </div>

          {/* Right Section */}
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <ul className="space-y-3">
              <li>
                <button className="w-full text-left px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
                  View Profile
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
                  Settings
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
                  Notifications
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
