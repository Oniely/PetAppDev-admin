import DashboardCard from "@/components/cards/DashboardCard";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
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
					<br />
				</h1>
				<BreadCrumbs />
			</header>
			<hr className="-mt-8 mb-6" />
			<section className="flex flex-col gap-8">
				<div className="grid grid-cols-4 max-lg:grid-cols-2 gap-2">
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
						image_url="/images/calendar.svg"
						data="10"
						href="/services"
					/>
					<DashboardCard
						className="bg-[#84DCC6]"
						title="Earnings"
						image_url="/images/calendar.svg"
						data="$100"
						href="/services"
					/>
				</div>
				<div></div>
			</section>
		</>
	);
};

export default Home;
