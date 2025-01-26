'use client';

import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useAuth } from '@/contexts/authContext';
import { EGLogo } from '@/components/common';

export default function Signup() {
	const { signup } = useAuth();
	return (
		<main className="relative min-h-screen bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 text-gray-800 flex items-center justify-center px-6 w-full overflow-hidden">
			<header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-50">
				<div className="flex items-center">
					<Link href="/">
						<EGLogo />
					</Link>
				</div>
			</header>
			{/* Background Visuals */}
			<div className="absolute inset-0 z-0">
				{/* Floating Circle */}
				<div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-float"></div>
				{/* Floating Rectangle */}
				<div className="absolute bottom-20 right-10 w-72 h-40 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg blur-2xl opacity-20 animate-slide"></div>
				{/* Horizontal Lines */}
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-1/4 left-0 w-full h-0.5 bg-gradient-to-r from-gray-300 via-transparent to-gray-300 opacity-30 animate-line"></div>
					<div className="absolute top-3/4 left-0 w-full h-0.5 bg-gradient-to-r from-gray-300 via-transparent to-gray-300 opacity-30 animate-line-reverse"></div>
				</div>
				{/* Diagonal Lines */}
				<div className="absolute top-0 left-0 w-full h-full">
					<div className="absolute top-0 left-10 w-0.5 h-full bg-gradient-to-b from-blue-500 via-transparent to-purple-500 opacity-20 animate-line-diagonal"></div>
					<div className="absolute top-0 right-20 w-0.5 h-full bg-gradient-to-b from-pink-500 via-transparent to-red-500 opacity-20 animate-line-diagonal-reverse"></div>
				</div>
			</div>

			{/* Signup Form */}
			<div className="w-full max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg z-10">
				<h1 className="text-4xl font-extrabold text-center mb-6">
					Create Your Account at{' '}
					<span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
						Expense Genius
					</span>
				</h1>
				<form className="flex flex-col gap-4" action={signup}>
					{/* First Name & Last Name */}
					<div className="flex flex-col md:flex-row gap-4">
						{/* First Name */}
						<div className="flex-1">
							<Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
								First Name
							</Label>
							<Input
								id="firstName"
								name="firstName"
								type="text"
								className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>
						{/* Last Name */}
						<div className="flex-1">
							<Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
								Last Name
							</Label>
							<Input
								id="lastName"
								name="lastName"
								type="text"
								className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
								required
							/>
						</div>
					</div>

					{/* Email */}
					<div>
						<Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
							Email
						</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="you@example.com"
							className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>

					{/* Password */}
					<div>
						<Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
							Password
						</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="Your password"
							className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
							minLength={6}
							required
						/>
					</div>

					{/* Confirm Password */}
					<div>
						<Label
							htmlFor="confirmPassword"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Confirm Password
						</Label>
						<Input
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							placeholder="Confirm your password"
							className="w-full p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
							minLength={6}
							required
						/>
					</div>

					<SubmitButton
						formAction={signup}
						pendingText="Signing up..."
						className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-lg hover:scale-105 transition-transform"
					>
						Sign Up
					</SubmitButton>

					<p className="text-center text-gray-600">
						Already have an account?{' '}
						<Link
							className="text-blue-500 font-medium underline hover:text-blue-700"
							href="/sign-in"
						>
							Sign in
						</Link>
					</p>
				</form>
			</div>

			{/* Floating Animation Keyframes */}
			<style jsx>{`
				@keyframes float {
					0% {
						transform: translateY(0px);
					}
					25% {
						transform: translateY(-10px);
					}
					50% {
						transform: translateY(-20px);
					}
					75% {
						transform: translateY(-10px);
					}
					100% {
						transform: translateY(0px);
					}
				}
				@keyframes slide {
					0% {
						transform: translateX(0px);
					}
					25% {
						transform: translateX(-5px);
					}
					50% {
						transform: translateX(-15px);
					}
					75% {
						transform: translateX(-5px);
					}
					100% {
						transform: translateX(0px);
					}
				}
				@keyframes line {
					0% {
						opacity: 0.3;
						transform: translateY(-10px);
					}
					25% {
						opacity: 0.5;
						transform: translateY(-5px);
					}
					50% {
						opacity: 0.6;
						transform: translateY(0px);
					}
					75% {
						opacity: 0.5;
						transform: translateY(-5px);
					}
					100% {
						opacity: 0.3;
						transform: translateY(-10px);
					}
				}
				.animate-float {
					animation: float 6s ease-in-out infinite;
				}
				.animate-slide {
					animation: slide 4s ease-in-out infinite;
				}
				.animate-line {
					animation: line 8s ease-in-out infinite;
				}
				.animate-line-reverse {
					animation: line 8s ease-in-out infinite reverse;
				}
				.animate-line-diagonal {
					animation: line 10s linear infinite;
				}
				.animate-line-diagonal-reverse {
					animation: line 10s linear infinite reverse;
				}
			`}</style>
		</main>
	);
}
