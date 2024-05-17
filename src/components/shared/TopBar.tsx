import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "@/lib/actions/user.action";

const TopBar = async () => {
	const user = await currentUser();
	const userData = await fetchUser(user?.id!);

	return (
		<nav className="fixed top-0 z-30 w-full flexBetween bg-low-orange px-6 h-[4rem] border-b border-b-dark-gray">
			<Link href="/" className="flex items-center gap-2">
				<Image
					src="/images/logo.png"
					alt="logo"
					width={35}
					height={35}
				/>
				<p className="max-md:hidden ">PetCompanion</p>
			</Link>

			<div className="flexCenter gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="link">
							<Image
								src="/images/notification.svg"
								alt="notification"
								width={25}
								height={25}
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>Notifications</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Notif Item</DropdownMenuItem>
						<DropdownMenuItem>Notif Item</DropdownMenuItem>
						<DropdownMenuItem>Notif Item</DropdownMenuItem>
						<DropdownMenuItem>Notif Item</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Image
					src={userData.image_url}
					alt="Profile Photo"
					width={30}
					height={30}
					className="rounded-full aspect-square border border-dark-gray"
				/>
			</div>
		</nav>
	);
};

export default TopBar;
