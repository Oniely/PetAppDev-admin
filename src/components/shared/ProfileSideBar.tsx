import Link from "next/link";
import { Button } from "../ui/button";
import LogoutDialog from "./LogoutDialog";

const ProfileSideBar = ({ active }: { active: string }) => {
	return (
		<aside className="flex flex-col gap-2 w-[14rem] border-r border-r-gray-300 pr-4 max-md:border-r-0 max-md:mb-4">
			<div className="md:sticky top-20 left-0 h-fit">
				<div className="text-xl font-semibold leading-6 max-md:text-3xl max-md:whitespace-nowrap max-[400px]:whitespace-normal">
					User Profile Management
				</div>
				<div className="flex flex-col gap-3 py-4">
					<Link href="/">
						<Button
							variant="ghost"
							className={`w-full flex justify-start gap-2 ${
								active === "Company Info"
									? "text-dark-gray bg-[#f5f5f4]"
									: "text-gray-500"
							}`}
						>
							{/* prettier-ignore */}
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
							</svg>
							<span className="font-semibold">Company Info</span>
						</Button>
					</Link>
					<Link href="/">
						<Button
							variant="ghost"
							className={`w-full flex justify-start gap-2 ${
								active === "Email & Password"
									? "text-dark-gray bg-[#f5f5f4]"
									: "text-gray-500"
							}`}
						>
							{/* prettier-ignore */}
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
							</svg>
							<span className="font-semibold">
								Email & Password
							</span>
						</Button>
					</Link>
					<Link href="/inbox">
						<Button
							variant="ghost"
							className={`w-full flex justify-start gap-2 ${
								active === "Notifications"
									? "text-dark-gray bg-[#f5f5f4]"
									: "text-gray-500"
							}`}
						>
							{/* prettier-ignore */}
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
							</svg>
							<span className="font-semibold">Notifications</span>
						</Button>
					</Link>
					<LogoutDialog asChild>
						<Button
							variant="ghost"
							className={`w-full flex justify-start gap-2 ${
								active === "Logout"
									? "text-dark-gray bg-[#f5f5f4]"
									: "text-gray-500"
							}`}
						>
							{/* prettier-ignore */}
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
								</svg>
							<span className="font-semibold">Logout</span>
						</Button>
					</LogoutDialog>
				</div>
			</div>
		</aside>
	);
};

export default ProfileSideBar;
