"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Features() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header Section */}
      <header className="w-full py-12 bg-gradient-to-r from-[#5A4E8E] via-[#A97192] to-[#F2B370] text-white text-center">
        <motion.h1
          className="text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Discover the Power of Expense Genius
        </motion.h1>
        <motion.p
          className="text-lg max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Our platform is designed to revolutionize the way you manage your
          finances. Explore our features and see how Expense Genius empowers you
          to make smarter financial decisions.
        </motion.p>
      </header>

      {/* Features Grid Section */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow"
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-[#5A4E8E] via-[#A97192] to-[#F2B370] rounded-full flex items-center justify-center">
                {feature.icon()}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call-to-Action Section */}
      <section className="w-full bg-gradient-to-r from-[#5A4E8E] via-[#A97192] to-[#F2B370] py-20 text-white">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Financial Journey?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of users who trust Expense Genius to achieve their
            financial goals.
          </p>
          <button className="px-10 py-4 bg-white text-[#5A4E8E] font-medium rounded-lg shadow-lg hover:scale-105 transition-transform">
            Get Started for Free
          </button>
        </motion.div>
      </section>
    </main>
  );
}

const features = [
  {
    title: "Real-Time Expense Tracking",
    description:
      "Monitor your expenses instantly with easy-to-read charts and data visualizations.",
    icon: () => <i className="fas fa-chart-line text-xl text-white"></i>,
  },
  {
    title: "AI-Driven Insights",
    description:
      "Receive personalized tips and recommendations to optimize your savings.",
    icon: () => <i className="fas fa-robot text-xl text-white"></i>,
  },
  {
    title: "Custom Budgeting Tools",
    description: "Create and manage budgets tailored to your financial goals.",
    icon: () => <i className="fas fa-wallet text-xl text-white"></i>,
  },
  {
    title: "Secure Transactions",
    description:
      "Your data is protected with industry-leading encryption and security protocols.",
    icon: () => <i className="fas fa-lock text-xl text-white"></i>,
  },
  {
    title: "Multi-Account Management",
    description:
      "Sync and view all your accounts in one place for better visibility.",
    icon: () => <i className="fas fa-university text-xl text-white"></i>,
  },
  {
    title: "Goal Tracking",
    description:
      "Set financial goals and track your progress with intuitive tools.",
    icon: () => <i className="fas fa-bullseye text-xl text-white"></i>,
  },
];
