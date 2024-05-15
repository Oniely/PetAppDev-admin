"use client";

import { NAV_LINKS } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
	const pathname = usePathname();
	const { userId } = useAuth();

	return (
		<section className="fixed bottom-0 z-10 w-full  p-4 bg-low-orange xs:mx-7 md:hidden">
			<div className="flexBetween gap-3 xs:gap-5">
				{NAV_LINKS.map((link) => {
					const isActive =
						(pathname.includes(link.route) &&
							link.route.length > 1) ||
						pathname === link.route;

					if (link.route === "/profile") {
						link.route = `${link.route}/${userId}/info`;
					}

					return (
						<Link
							href={link.route}
							key={link.label}
							className={`flex flex-col items-center justify-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 relative ${isActive && "bg-main-orange"
								}`}
						>
							<Image
								src={link.img}
								alt={link.label}
								width={24}
								height={24}
							/>
							<p className="text-sm text-center max-sm:hidden">
								{link.label.split(' ')[0]}
							</p>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default BottomBar;
