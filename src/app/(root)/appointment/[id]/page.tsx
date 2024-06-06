import AppointmentStatusDialog from "@/components/shared/AppointmentStatusDialog";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { getAppointment } from "@/lib/actions/appointment.action";
import { formatDateTime } from "@/utils/formatter";
import Image from "next/image";
import { redirect } from "next/navigation";

const AppointmentDetail = async ({ params }: { params: { id: string } }) => {
	const appointment = await getAppointment(params.id);

	if (!appointment) {
		redirect("/appointment");
	}

	const breadCrumbs = [
		{
			name: "Appointments",
			href: "/appointment",
		},
		{
			name: "Details of Appointment",
			href: "#",
		},
	];

	const datetime = formatDateTime(appointment.date, appointment.time);

	const leftStatus =
		appointment.status === "Pending"
			? "Confirmed"
			: appointment.status === "Confirmed"
			? "Completed"
			: "Done";
	const rightStatus =
		appointment.status === "Pending"
			? "Reschedule"
			: appointment.status === "Confirmed"
			? "Canceled"
			: "Done";

	return (
		<>
			<header className="header">
				<h1 className="head-text">Appointment Details</h1>
				<BreadCrumbs crumbs={breadCrumbs} />
			</header>
			<h1 className="text-2xl font-semibold mb-2">Service</h1>
			<section className="grid grid-cols-2 max-sm:grid-cols-1 relative">
				<div className="flex flex-col gap-3">
					<div className="h-[300px] relative rounded-lg">
						<Image
							src={appointment.service.image_url}
							alt="Service Image"
							className="object-cover rounded-lg"
							draggable={false}
							unoptimized
							fill
						/>
					</div>
				</div>
				<div className="flex flex-col justify-between sm:ml-12 max-sm:mt-4 h-[300px] max-sm:h-auto max-sm:gap-4">
					<div className="flex flex-col gap-1">
						<div className="flex items-center justify-between gap-2 mb-2 border-b border-b-neutral-500 py-1">
							<p className="text-xl font-semibold">
								{appointment.service.serviceName}
							</p>

							<div className="relative">
								<p>{appointment.status}</p>
								<div
									className={`${
										appointment.status === "Pending"
											? "bg-yellow-500"
											: appointment.status === "Canceled"
											? "bg-red-500"
											: "bg-green-500"
									} absolute top-0 -right-2.5 w-2 h-2 rounded-full animate-pulse`}
								></div>
							</div>
						</div>
						<p className="text-neutral-800 lowercase">
							<span className="capitalize">
								{appointment.service.typeOfService
									.split("_")
									.join(" ")}
							</span>
						</p>
						<p className="text-neutral-700 font-light">
							Duration:{" "}
							<span className="font-medium">
								{appointment.service.duration}mins
							</span>
						</p>
						<p className="text-neutral-700 font-light">
							Price:{" "}
							<span className="font-medium">
								₱{appointment.service.price}
							</span>
						</p>
						<p className="text-neutral-700 font-light">
							Date:{" "}
							<span className="font-medium">
								{datetime.split(",")[0]}
							</span>
						</p>
						<p className="text-neutral-700 font-light">
							Time:{" "}
							<span className="font-medium">
								{datetime.split(",")[1]}
							</span>
						</p>
					</div>
					<div className="flex items-center gap-3">
						{appointment.status !== "Reschedule" &&
							appointment.status !== "Done" &&
							appointment.status !== "Completed" && appointment.status !== "Canceled" && (
								<>
									<AppointmentStatusDialog
										id={params.id}
										status={leftStatus}
										asChild
									>
										<Button className="w-full">
											{leftStatus}
										</Button>
									</AppointmentStatusDialog>

									<AppointmentStatusDialog
										id={params.id}
										status={rightStatus}
										asChild
									>
										<Button
											className="w-full"
											variant="outline"
										>
											{rightStatus}
										</Button>
									</AppointmentStatusDialog>
								</>
							)}
					</div>
				</div>
			</section>
			{/* ------------------------------------------------ */}
			<h1 className="text-2xl font-semibold mt-6 mb-2">Client</h1>
			<section className="grid grid-cols-2 max-sm:grid-cols-1 relative">
				<div className="flex flex-col gap-3">
					<div className="h-[300px] relative rounded-lg">
						<Image
							src={appointment.petOwner.image_url}
							alt="Service Image"
							className="object-cover rounded-lg"
							draggable={false}
							fill
						/>
					</div>
				</div>
				<div className="flex flex-col justify-between sm:ml-12 max-sm:mt-4 h-[300px] max-sm:h-auto max-sm:gap-4">
					<div className="flex flex-col gap-1">
						<div className="flex items-center justify-between gap-2 mb-2 border-b border-b-neutral-500 py-1">
							<p className="text-xl font-semibold">
								{appointment.petOwner.fname}{" "}
								{appointment.petOwner.lname}
							</p>
						</div>
						<p className="text-neutral-700 font-light">
							Contact Number:{" "}
							<span className="font-medium">
								{appointment.petOwner.phoneNumber && "None"}
							</span>
						</p>
						<p className="text-neutral-700 font-light">
							Client Pet Name:{" "}
							<span className="font-medium">
								{appointment.pet.petName}
							</span>
						</p>
						<p className="text-neutral-700 font-light">
							Client Pet Species/Breed:{" "}
							<span className="font-medium">
								{appointment.pet.species} -{" "}
								{appointment.pet.breed}
							</span>
						</p>
						<p className="text-neutral-700 font-light">
							Client Pet Age:{" "}
							<span className="font-medium">
								{appointment.pet.age}{" "}
								{appointment.pet.age > 1
									? "years old"
									: "year old"}
							</span>
						</p>
					</div>
				</div>
			</section>
		</>
	);
};

export default AppointmentDetail;
