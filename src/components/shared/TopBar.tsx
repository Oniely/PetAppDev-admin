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
import Logout from "./LogoutDialog";

import LogoutDialog from "./LogoutDialog";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { SignOutButton } from "@clerk/nextjs";
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
				{/* ------------------------------------------------------ */}
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<Image
								src={userData.image_url}
								alt="Profile Photo"
								width={30}
								height={30}
								className="rounded-full aspect-square border border-dark-gray"
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>Profile Menu</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<Link href={`/profile/${userData._id}/info`}>
									Your Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link href={`/inbox`}>Inbox</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<DialogTrigger>
									<p>Logout</p>
								</DialogTrigger>
							</DropdownMenuItem>
						</DropdownMenuContent>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Are you sure?</DialogTitle>
								<DialogDescription>
									Please confirm your action to logout
								</DialogDescription>
							</DialogHeader>
							<hr />
							<div className="grid grid-cols-2 gap-4">
								<DialogClose asChild>
									<Button variant="outline">No</Button>
								</DialogClose>
								<SignOutButton redirectUrl="/sign-in">
									<Button>Yes</Button>
								</SignOutButton>
							</div>
						</DialogContent>
					</DropdownMenu>
				</Dialog>
			</div>
		</nav>
	);
};

export default TopBar;
