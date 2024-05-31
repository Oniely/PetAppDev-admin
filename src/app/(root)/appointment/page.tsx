import UpcomingCard from "@/components/cards/UpcomingCard";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import {
	fetchAppointments,
	getAppointmentsCount,
} from "@/lib/actions/appointment.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Appointments = async () => {
	const user = await currentUser();
	const userData = await fetchUser(user?.id!);

	if (!userData || !userData?.onboarded) {
		redirect("/onboarding");
	}

	const appointments = (await fetchAppointments(userData._id!)) || [];
	const appointmentsCount = await getAppointmentsCount(userData._id!);

	const breadCrumbs = [
		{
			name: "Appointments",
			href: "/appointment",
		},
	];

	return (
		<>
			<header className="header">
				<h1 className="head-text relative">
					Appointments{" "}
					<span className="font-normal text-sm absolute top-0">
						({appointmentsCount})
					</span>
				</h1>
				<BreadCrumbs crumbs={breadCrumbs} />
			</header>
			<section className="flex flex-col gap-8">
				<div className="grid grid-cols-3 gap-4">
					{appointments.length > 0 &&
						appointments.map((appointment: any) => (
							<UpcomingCard
								key={appointment._id}
								name={appointment.service.serviceName}
								type={appointment.service.typeOfService
									.split("_")
									.join(" ")}
								date={appointment.date}
								time={appointment.time}
								customer="Oniel Gencaya"
								status={appointment.status}
								href={`/appointment/${appointment._id}`}
							/>
						))}
				</div>
			</section>
		</>
	);
};

export default Appointments;
