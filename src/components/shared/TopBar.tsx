"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const TopBar = () => {
	const { user } = useUser();

	return (
		<nav className="fixed top-0 z-30 w-full flexBetween bg-low-orange px-6 h-[4rem] border-b border-b-dark-gray">
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
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant='link'>
							<Image src='/images/notification.svg' alt="notification" width={25} height={25} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[15rem]">
						<DropdownMenuLabel>Notifications</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Billing</DropdownMenuItem>
						<DropdownMenuItem>Team</DropdownMenuItem>
						<DropdownMenuItem>Subscription</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Image
					src={user?.imageUrl!}
					alt="Profile Photo"
					width={30}
					height={30}
					className="rounded-full aspect-square"
				/>
			</div>
		</nav>
	);
};

export default TopBar;
