"use client";

import { cn } from "@/lib/utils";
import {
	ArrowUpCircle,
	CheckCircle2,
	Circle,
	HelpCircle,
	LucideIcon,
	XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import UpcomingCard from "../cards/UpcomingCard";
import { useState } from "react";

type Status = {
	value: string;
	label: string;
	icon: LucideIcon;
};

const statuses: Status[] = [
	{
		value: "All",
		label: "All",
		icon: Circle,
	},
	{
		value: "Pending",
		label: "Pending",
		icon: HelpCircle,
	},
	{
		value: "Confirmed",
		label: "Confirmed",
		icon: ArrowUpCircle,
	},
	{
		value: "Completed",
		label: "Completed",
		icon: CheckCircle2,
	},
	{
		value: "Canceled",
		label: "Canceled",
		icon: XCircle,
	},
];

interface Props {
	appointments: any[];
}

const AllAppointments = ({ appointments }: Props) => {
	const [open, setOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState<Status | null>(
		null
	);

	return (
		<div className="flex flex-col gap-2">
			<div className="flexBetween">
				<h1 className="font-medium ml-1">All Appointments</h1>
			</div>
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

				{appointments.length < 1 && (
					<div className="col-span-3 h-[10rem] flexCenter">
						<p>No appointments.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default AllAppointments;
