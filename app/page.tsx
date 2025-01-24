'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import { BasicButton, TruckAnimation } from '@/components/common';

export default function Home() {
	const { user } = useAuth();
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const router = useRouter();

	const toggle = (index: number) => {
		setOpenIndex(index === openIndex ? null : index);
	};

	const faqs = [
		{
			question: 'What does "lifetime" access mean?',
			answer:
				"We're as tired of endless subscriptions as you. Lifetime access means you get access to all future premium components, examples, and early access content on the site.",
		},
		{
			question: 'How does the Team package work?',
			answer:
				'The Team package allows multiple users to collaborate under a single license with shared access to all premium features.',
		},
		{
			question: 'How do I get access to the private GitHub?',
			answer:
				"After purchasing, you'll receive an email with an invitation to our private GitHub repository where you can access all source code.",
		},
		{
			question: 'What is your refund policy?',
			answer:
				"We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact us for a full refund.",
		},
	];

	useEffect(() => {
		// GSAP Floating Animation
		gsap.to('.floating', {
			y: 20,
			repeat: -1,
			yoyo: true,
			duration: 3,
			ease: 'power1.inOut',
		});
	}, []);

	return (
		<main className="min-h-screen bg-white text-gray-800 font-sans relative overflow-hidden">
			{/* Header */}
			<header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 z-50">
				<div className="flex items-center">
					<Link href="/">
						<span className="text-xl font-bold text-gray-800">Expense Genius Logo</span>
					</Link>
				</div>
				<div className="flex items-center gap-4 sm:gap-4 sm:flex-row flex-col">
					{user ? (
						<BasicButton
							name="Dashboard"
							onClick={() => router.push('/dashboard')}
							theme="secondary"
						/>
					) : (
						<>
							<BasicButton
								name="Sign In"
								onClick={() => router.push('/sign-in')}
								theme="secondary"
							/>
							<BasicButton name="Sign Up" onClick={() => router.push('/sign-up')} />
						</>
					)}
				</div>
			</header>

			{/* Hero Section */}
			<section className="relative w-full h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
				{/* Glowing Elements */}
				<div className="absolute -top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-50 z-0"></div>
				<div className="absolute bottom-10 -right-10 w-96 h-96 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-3xl opacity-50 z-0"></div>

				{/* Hero Content */}
				<motion.h1
					className="text-6xl font-extrabold mb-6 z-10"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					Welcome to{' '}
					<span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
						Expense Genius
					</span>
				</motion.h1>
				<motion.p
					className="text-lg max-w-2xl mx-auto mb-8 text-gray-600 z-10"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
				>
					AI-powered insights to revolutionize your financial journey. Track spending, save smarter,
					and achieve your goals effortlessly.
				</motion.p>
				<motion.div
					className="flex gap-6 z-10"
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1, delay: 1 }}
				>
					<Link href="/sign-up">
						<button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-lg hover:scale-105 transition-transform">
							Get Started
						</button>
					</Link>
					<Link href="/features">
						<button className="px-8 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg shadow-lg hover:bg-gray-200">
							Learn More
						</button>
					</Link>
				</motion.div>
				<div className="absolute bottom-3 left-5 flex justify-center items-center gap-2 z-10">
					<TruckAnimation />
				</div>
			</section>
			{/* Features Section */}
			<section className="w-full bg-gray-50 py-20">
				<motion.div
					className="max-w-7xl mx-auto text-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1.35 }}
				>
					<h2 className="text-4xl font-bold text-gray-900 mb-6">
						Why Choose{' '}
						<span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
							Expense Genius
						</span>
						?
					</h2>
					<p className="text-lg text-gray-600 mb-12">
						Tools and insights to help you take control of your finances.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl"></div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
							<p className="text-gray-600">
								Monitor your expenses in real-time with visual insights.
							</p>
						</div>
						<div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl"></div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Driven Insights</h3>
							<p className="text-gray-600">
								Personalized financial tips powered by cutting-edge AI.
							</p>
						</div>
						<div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
							<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-2xl"></div>
							<h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Platform</h3>
							<p className="text-gray-600">
								Your data is encrypted with industry-leading standards.
							</p>
						</div>
					</div>
				</motion.div>
			</section>
			{/*Interactive Dashboard Preview*/}
			<section className="w-full bg-gray-100 py-20">
				<motion.div
					className="max-w-7xl mx-auto text-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1 }}
				>
					<h2 className="text-4xl font-bold text-gray-900 mb-6">See Expense Genius in Action</h2>
					<p className="text-lg text-gray-600 mb-12">
						Experience our intuitive and powerful financial tools.
					</p>
					{/* Add carousel or screenshots */}
					<div className="carousel">[Carousel component here]</div>
				</motion.div>
			</section>
			{/* Pricing Section */}
			<section className="w-full bg-white py-20">
				<div className="max-w-7xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-6">Affordable Plans for Everyone</h2>
					<p className="text-lg text-gray-600 mb-12">Choose the plan that fits your needs.</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div className="p-6 bg-gray-50 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">Free</h3>
							<p className="mb-6">Basic tools for personal finance management.</p>
							<button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
								Choose Free
							</button>
						</div>
						<div className="p-6 bg-white rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">Premium</h3>
							<p className="mb-6">Advanced tools and insights for serious users.</p>
							<button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
								Choose Premium
							</button>
						</div>
						<div className="p-6 bg-gray-50 rounded-lg shadow-lg">
							<h3 className="text-xl font-semibold mb-4">Enterprise</h3>
							<p className="mb-6">Custom solutions for businesses.</p>
							<button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg hover:scale-105 transition-transform">
								Contact Us
							</button>
						</div>
					</div>
				</div>
			</section>
			{/* Testimonials Section */}
			<section className="w-full bg-white py-20">
				<motion.div
					className="max-w-7xl mx-auto text-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1 }}
				>
					<h2 className="text-4xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
					<p className="text-lg text-gray-600 mb-12">
						Hear how Expense Genius has transformed the lives of our users.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="p-6 bg-gray-50 rounded-lg shadow-lg">
							<p className="text-gray-600 italic mb-4">
								"Expense Genius helped me save 20% more each month. It's a game changer!"
							</p>
							<h4 className="text-lg font-semibold text-gray-900">- Sarah T.</h4>
						</div>
						<div className="p-6 bg-gray-50 rounded-lg shadow-lg">
							<p className="text-gray-600 italic mb-4">
								"The insights are spot-on. I feel more in control of my finances than ever before."
							</p>
							<h4 className="text-lg font-semibold text-gray-900">- Michael B.</h4>
						</div>
						<div className="p-6 bg-gray-50 rounded-lg shadow-lg">
							<p className="text-gray-600 italic mb-4">
								"Tracking my expenses has never been this easy and intuitive!"
							</p>
							<h4 className="text-lg font-semibold text-gray-900">- Emily R.</h4>
						</div>
					</div>
				</motion.div>
			</section>
			{/* Newsletter Section */}
			<section className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-10 text-white text-center">
				<h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
				<p className="text-lg mb-6">
					Stay updated with the latest tips and tools from Expense Genius.
				</p>
				<input
					type="email"
					placeholder="Enter your email"
					className="px-3 py-2 rounded-lg text-white-800"
				/>
				<button className="ml-4 px-6 py-2 bg-white text-[#5A4E8E] rounded-lg">Subscribe</button>
			</section>
			<section className="w-full bg-gray-100 py-20">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h2>
					<div className="space-y-4">
						{faqs.map((faq, index) => (
							<div key={index} className="border border-gray-300 rounded-lg overflow-hidden">
								<button
									className="w-full text-left px-4 py-3 flex justify-between items-center text-gray-800 font-medium hover:bg-gray-200"
									onClick={() => toggle(index)}
								>
									{faq.question}
									<div
										className={`transform transition-transform duration-300 ${
											openIndex === index ? 'rotate-45' : 'rotate-0'
										}`}
									>
										{openIndex === index ? (
											<span>&#x2715;</span> // Close icon (x)
										) : (
											<span>&#x2795;</span> // Plus icon (+)
										)}
									</div>
								</button>
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={
										openIndex === index ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }
									}
									transition={{ duration: 0.3 }}
									className="overflow-hidden"
								>
									<div className="px-4 py-3 bg-gray-50 text-gray-600">{faq.answer}</div>
								</motion.div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className="w-full bg-gradient-to-r from-[#5A4E8E] via-[#A97192] to-[#F2B370] py-20 text-white">
				<motion.div
					className="max-w-7xl mx-auto text-center"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1 }}
				>
					<h2 className="text-4xl font-bold mb-6">Ready to Transform Your Financial Journey?</h2>
					<p className="text-lg mb-8">
						Join thousands of users who trust Expense Genius to achieve their financial goals.
					</p>
					<button className="px-10 py-4 bg-white text-[#5A4E8E] font-medium rounded-lg shadow-lg hover:scale-105 transition-transform">
						Get Started for Free
					</button>
				</motion.div>
			</section>
			{/* Call to Action Section */}
			<section className="w-full bg-gradient-to-r from-blue-500 to-purple-500 py-20">
				<motion.div
					className="max-w-7xl mx-auto text-center text-white"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 1 }}
				>
					<h2 className="text-4xl font-bold mb-6">Take Control of Your Finances Today</h2>
					<p className="text-lg mb-12">
						Join thousands of users who trust Expense Genius to manage their expenses smarter.
					</p>
					<Link href="/sign-up">
						<button className="px-10 py-4 bg-white text-blue-500 font-medium rounded-lg shadow-lg hover:scale-105 transition-transform">
							Get Started for Free
						</button>
					</Link>
				</motion.div>
			</section>
		</main>
	);
}
