"use client";

import { useAuth } from "@/contexts/authContext";
import RedirectHandler from "@/components/common/RedirectHandler";

export default function DashboardPage() {
  const { user, signOut, signingOut } = useAuth();

  if (!user && !signingOut) {
    // Show redirect handler if user is not authenticated
    // and not in the process of signing out
    return (
      <RedirectHandler
        redirectTo="/sign-in"
        redirectPageName="the sign-in page"
      />
    );
  }

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
              Your email: <span className="font-medium">{user?.email}</span>
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
