import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import dynamic from "next/dynamic";
import Providers from "@/lib/contexts/Providers";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";

const TopBar = dynamic(() => import("@/components/shared/TopBar"));
const LeftSideBar = dynamic(() => import("@/components/shared/LeftSideBar"));
const BottomBar = dynamic(() => import("@/components/shared/BottomBar"));

const font = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Pet Care Services Application",
	description: "Next.js Application",
	icons: {
		icon: "/images/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<html lang="en" suppressHydrationWarning>
				<body className={`${font.className} bg-[#f1f1f1]`}>
					<Suspense fallback={<Loading loading />}>
						<TopBar />
						<main className="flex flex-row">
							<LeftSideBar />
							<section className="flex min-h-screen flex-1 flex-col px-4 pb-10 pt-28 max-md:mb-32 sm:px-10">
								{children}
							</section>
						</main>
						<BottomBar />
						<Toaster />
						<p className="fixed text-xs right-4 bottom-4 text-gray-600 font-medium">
							© Powered by PetCompanion
						</p>
					</Suspense>
				</body>
			</html>
		</Providers>
	);
}
