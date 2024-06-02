"use client";

import {
	ArrowUpCircle,
	CheckCircle2,
	ChevronsUpDown,
	Circle,
	HelpCircle,
	LucideIcon,
	XCircle,
	Clock
} from "lucide-react";

import { cn } from "@/lib/utils";
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
import { useState } from "react";
import { useRouter } from "next/navigation";

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

const StatusBox = ({ status }: { status: string | null }) => {
	const [open, setOpen] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
	const router = useRouter();

	return (
		<div className="flex items-center space-x-4">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						size="sm"
						className="w-[150px] justify-start"
					>
						{selectedStatus ? (
							<>
								<selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
								{selectedStatus.value}
							</>
						) : (
							<div className="w-full flexBetween">
								Set status
								<ChevronsUpDown size={15} />
							</div>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="p-0" side="right" align="start">
					<Command>
						<CommandInput placeholder="Change status..." />
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								{statuses.map((status) => (
									<CommandItem
										key={status.value}
										value={status.value}
										onSelect={(value: any) => {
											setSelectedStatus(
												statuses.find(
													(priority) =>
														priority.value === value
												) || null
											);
											router.push(`/appointment?status=${value}`);
											setOpen(false);
										}}
									>
										<status.icon
											className={cn(
												"mr-2 h-4 w-4",
												status.value ===
													selectedStatus?.value
													? "opacity-100"
													: "opacity-40"
											)}
										/>
										<span>{status.value}</span>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default StatusBox;
