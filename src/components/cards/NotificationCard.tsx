import {
	ArrowUpCircle,
	CheckCircle2,
	Circle,
	Clock,
	HelpCircle,
	LucideIcon,
	XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Status = {
	value: string;
	icon: LucideIcon;
};

const statuses: Status[] = [
	{
		value: "All",
		icon: Circle,
	},
	{
		value: "Pending",
		icon: HelpCircle,
	},
	{
		value: "Confirmed",
		icon: ArrowUpCircle,
	},
	{
		value: "Completed",
		icon: CheckCircle2,
	},
	{
		value: "Canceled",
		icon: XCircle,
	},
	{
		value: "Reschedule",
		icon: Clock,
	},
];

interface Props {
	href: string;
	currentStatus: "Pending" | "Confirmed" | "Completed" | "Canceled" | "Reschedule";
	message: string;
	serviceName: string;
	client_image_url: string;
	client_name: string;
	date: string;
}

const NotificationCard = ({ href, currentStatus, message, serviceName, client_image_url, client_name, date }: Props) => {

	const findStatusByValue = (value: string) => {
		return statuses.find((status) => status.value === value);
	};

	const status = findStatusByValue(currentStatus)!;

	return (
		// @ts-ignore
		<Link href={href}>
			<div className="flex items-center justify-between gap-8 py-4 border-t bg-[#f1f1f1] hover:bg-[#f5f5f5] pl-2 pr-14">
				<div className="flex items-center">
					<status.icon className="mr-2 w-5 h-5 shrink-0" />
					<p className="md:truncate max-w-[22rem]">
						{message}
					</p>
				</div>
				<div className="flex items-center gap-6">
					<div className="flex items-center gap-2 max-w-32">
						<p className="md:truncate">{serviceName}</p>
					</div>
					<span className="-mx-2">-</span>
					<div className="flex items-center gap-2 max-w-32">
						<Image
							src={client_image_url}
							alt=""
							width={25}
							height={25}
							className="object-cover object-center rounded-full aspect-square"
							priority
						/>
						<p className="md:truncate">{client_name}</p>
					</div>
					<div className="flex items-center gap-2 max-w-32 ml-14">
						<p className="md:truncate">{date}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default NotificationCard;
