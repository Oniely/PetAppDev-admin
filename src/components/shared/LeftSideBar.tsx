"use client";

import { NAV_LINKS } from "@/constants";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutDialog from "./LogoutDialog";

const LeftSideBar = () => {
	const pathname = usePathname();

	const { userId } = useAuth();

	return (
		<aside className="sticky top-0 left-0 z-20 flex flex-col justify-between h-screen pb-5 overflow-auto w-fit bg-low-orange pt-28 max-md:hidden">
			<div className="flex flex-col flex-1 w-full gap-4 px-6">
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
							className={`relative flex justify-start gap-4 rounded-lg p-4 ${
								isActive
									? "bg-main-orange"
									: "hover:bg-main-orange/20"
							}`}
						>
							<Image
								src={link.img}
								alt={link.label}
								width={24}
								height={24}
							/>
							<p className="max-lg:hidden">{link.label}</p>
						</Link>
					);
				})}
			</div>
			<SignedIn>
				<LogoutDialog>
					<div className="px-6 mt-10">
						<div className="flex gap-4 p-4 rounded-lg cursor-pointer hover:bg-main-orange/20">
							<Image
								src="/images/logout.svg"
								alt="logout"
								width={24}
								height={24}
							/>
							<p className="max-lg:hidden">Logout</p>
						</div>
					</div>
				</LogoutDialog>
			</SignedIn>
		</aside>
	);
};

export default LeftSideBar;
