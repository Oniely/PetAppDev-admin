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
import { fetchNotifications } from "@/lib/actions/notification.action";

const TopBar = async () => {
	const user = await currentUser();
	const userData = await fetchUser(user?.id!);

	const todayNotifications =
		(await fetchNotifications({
			providerId: userData._id!,
			date: "Today",
		})) || [];

	return (
		<nav className="fixed top-0 z-30 w-full flexBetween bg-low-orange px-6 h-[4rem] border-b border-b-dark-gray">
			<Link href="/" className="flex items-center gap-2">
				<Image
					src="/images/logo.png"
					alt="logo"
					width={35}
					height={35}
				/>
				<p className="max-md:hidden ">{userData.companyName}</p>
			</Link>

			<div className="flexCenter gap-1">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="link" size="icon">
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
							{todayNotifications.length > 0 && todayNotifications.map((notif: any, idx: any) => (
								<DropdownMenuItem key={idx}>
									<Link href={`/appointment/${notif.appointment._id}`} className="flexCenter">
										<div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2" />
										<p>{`${notif.notifier.fname} ${notif.notifier.lname}`} has requested an appointment!</p>
									</Link>
								</DropdownMenuItem>
							))}


							{todayNotifications.length < 1 && (
								<p className="p-2 px-3 text-sm">No Notification Today!</p>
							)}
					</DropdownMenuContent>
				</DropdownMenu>
				{/* ------------------------------------------------------ */}
				<Dialog>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="link" size="icon">
								<Image
									src={userData.image_url}
									alt="Profile Photo"
									width={25}
									height={25}
									className="object-cover object-center rounded-full aspect-square border border-dark-gray"
								/>
							</Button>
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
								<Link href={`/appointment`}>Appointments</Link>
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
