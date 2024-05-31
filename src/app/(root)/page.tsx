import DashboardCard from "@/components/cards/DashboardCard";
import UpcomingCard from "@/components/cards/UpcomingCard";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import { fetchUpcomingAppointments, getAppointmentsCount } from "@/lib/actions/appointment.action";
import { fetchServices } from "@/lib/actions/service.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = async () => {
	const user = await currentUser();
	const userData = await fetchUser(user?.id!);

	if (!userData || !userData?.onboarded) {
		redirect("/onboarding");
	}

	const services = await fetchServices(userData._id);
	const activeServices = services.filter((service: any) => service.status);

	const appointments = await fetchUpcomingAppointments(userData._id!) || [];
	const appointmentsCount = await getAppointmentsCount(userData._id!);

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
						data={`${appointmentsCount}`}
						href="/appointment"
					/>
					<DashboardCard
						className="bg-[#ACD7EC]"
						title="Active Services"
						image_url="/images/services.svg"
						data={activeServices.length.toString()}
						href="/services"
					/>
					<DashboardCard
						className="bg-[#79B4A9]"
						title="Inbox"
						image_url="/images/inbox.svg"
						data="0"
						href="/services"
					/>
					<DashboardCard
						className="bg-[#84DCC6]"
						title="Earnings"
						image_url="/images/credit-card.svg"
						data="₱0"
						href="/services"
					/>
				</div>
				<div>
					<div className="mb-4 flexBetween">
						<h2 className="font-semibold">Upcoming appointments</h2>
						<Link href="/" className="flex items-start gap-[2px]">
							See all <span className="text-sm">({appointmentsCount})</span>
						</Link>
					</div>
					<div className="grid grid-cols-3 gap-4">
						{appointments.length > 0 &&
							appointments.map((appointment: any) => (
								<UpcomingCard
									key={appointment._id}
									name={appointment.service.serviceName}
									type={appointment.service.typeOfService.split('_').join(" ")}
									date={appointment.date}
									time={appointment.time}
									customer="Oniel Gencaya"
									status={appointment.status}
									href={`/appointment/${appointment._id}`}
								/>
							))}
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
