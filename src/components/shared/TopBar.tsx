"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const TopBar = () => {
	const { user } = useUser();

	return (
		<nav className="fixed top-0 z-30 w-full flexBetween bg-low-orange px-6 h-[4rem] border-b border-b-nav-gray">
			<Link href="/" className="flex items-center gap-2">
				<Image
					src="/images/logo.png"
					alt="logo"
					width={35}
					height={35}
				/>
				<p className="max-md:hidden ">Pet App</p>
			</Link>

			<div className="flexCenter gap-2">
				<Image src={user?.imageUrl!} alt="Profile Photo" width={35} height={35} className="rounded-full aspect-square" />
			</div>
		</nav>
	);
};

export default TopBar;
