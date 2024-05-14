import DashboardCard from "@/components/cards/DashboardCard";
import UpcomingCard from "@/components/cards/UpcomingCard";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = async () => {
	const user = await currentUser();
	const userData = await fetchUser(user?.id!);

	if (!userData?.onboarded) {
		redirect("/onboarding");
	}

	return (
		<>
			<header className="header">
				<h1 className="head-text">
					<span className="font-light">Welcome to</span>{" "}
					{userData.companyName}
					<span className="font-light">'s Dashboard</span>
				</h1>
				<BreadCrumbs />
			</header>
			<hr className="mb-6 -mt-8" />
			<section className="flex flex-col gap-8">
				<div className="grid grid-cols-4 gap-2 max-lg:grid-cols-2">
					<DashboardCard
						className="bg-[#D6EDFF]"
						title="Appointments"
						image_url="/images/calendar.svg"
						data="10"
						href="/services"
					/>
					<DashboardCard
						className="bg-[#ACD7EC]"
						title="Active Services"
						image_url="/images/services.svg"
						data="10"
						href="/services"
					/>
					<DashboardCard
						className="bg-[#79B4A9]"
						title="Inbox"
						image_url="/images/inbox.svg"
						data="10"
						href="/services"
					/>
					<DashboardCard
						className="bg-[#84DCC6]"
						title="Earnings"
						image_url="/images/credit-card.svg"
						data="$100"
						href="/services"
					/>
				</div>
				<div>
					<div className="mb-4 flexBetween">
						<h2 className="font-semibold">Upcoming appointments</h2>
						<Link href="/" className="flex items-start gap-[2px]">
							See all <span className="text-sm">(14)</span>
						</Link>
					</div>
					<div className="grid grid-cols-3 gap-4">
						<UpcomingCard
							name="Service Name"
							type="Onboarding"
							date="Nov 09 2024"
							time="03:12"
							customer="Oniel Gencaya"
							status="Pending"
							href="/"
						/>
						<UpcomingCard
							name="Service Name"
							type="Pet Training"
							date="Nov 09 2024"
							time="03:12"
							customer="Oniel Gencaya"
							status="Confirmed"
							href="/"
						/>
						<UpcomingCard
							name="Service Name"
							type="Grooming"
							date="Nov 09 2024"
							time="03:12"
							customer="Oniel Gencaya"
							status="Confirmed"
							href="/"
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
