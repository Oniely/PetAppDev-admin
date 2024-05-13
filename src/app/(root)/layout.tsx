import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/shared/TopBar";
import LeftSideBar from "@/components/shared/LeftSideBar";
import BottomBar from "@/components/shared/BottomBar";
import Providers from "@/lib/contexts/Providers";
import { Toaster } from "@/components/ui/toaster";

const font = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Pet Care Services Application",
	description: "Next.js Application",
	icons: {
		icon: '/images/favicon.ico',
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<html lang="en" suppressHydrationWarning>
				<body className={font.className}>
					<TopBar />
					<main className="flex flex-row">
						<LeftSideBar />
						<section className="flex min-h-screen flex-1 flex-col px-6 pb-10 pt-28 max-md:mb-32 sm:px-10">
							{children}
						</section>
					</main>
					<BottomBar />
					<Toaster />
				</body>
			</html>
		</Providers>
	);
}
