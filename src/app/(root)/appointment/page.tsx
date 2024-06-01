import UpcomingCard from "@/components/cards/UpcomingCard";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import {
	fetchAppointments,
	fetchUpcomingAppointments,
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
	const upcomingAppointments = await fetchUpcomingAppointments({ providerId: userData._id!, status: "Confirmed" }) || [];
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
			<section className="flex flex-col gap-10">
				<div className="flex flex-col gap-2">
					<h1 className="font-medium ml-1">Upcoming Confirmed Appointments</h1>
					<div className="grid grid-cols-3 gap-4">
						{upcomingAppointments.length > 0 &&
							upcomingAppointments.map((appointment: any) => (
								<UpcomingCard
									key={appointment._id}
									name={appointment.service.serviceName}
									type={appointment.service.typeOfService
										.split("_")
										.join(" ")}
									date={appointment.date}
									time={appointment.time}
									customer={`${
										appointment.petOwner.fname.split(" ")[0]
									} ${appointment.petOwner.lname}`}
									status={appointment.status}
									href={`/appointment/${appointment._id}`}
								/>
							))}
					</div>
				</div>
				<div className="flex flex-col gap-2">
					<h1 className="font-medium ml-1">All Appointments</h1>
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
									customer={`${
										appointment.petOwner.fname.split(" ")[0]
									} ${appointment.petOwner.lname}`}
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

export default Appointments;
