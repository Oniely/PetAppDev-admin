"use client";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { updateAppointmentStatus } from "@/lib/actions/appointment.action";
import { toast } from "../ui/use-toast";

interface Props {
	children: React.ReactNode;
	asChild: boolean;
	status: "Pending" | "Confirmed" | "Completed" | "Canceled" | "Reschedule" | "Done";
	id: string;
}

const AppointmentStatusDialog = ({
	children,
	asChild = false,
	status,
	id
}: Props) => {
	const pathname = usePathname();

	const handleClick = async () => {
		try {
			const result = await updateAppointmentStatus({
				id,
				newStatus: status,
				path: pathname
			})

			if (result) {
				toast({
					title: "Appointment Status Updated!",
					description: `Appointment status has been updated to ${status}!`,
				});
			} else {
				toast({
					title: "An unexpected error occur, Please try again...",
					description: `An error has occured while updating appointment status`,
					variant: "destructive",
				});	
			}
		} catch (error: any) {
			toast({
				title: "Something went wrong...",
				description: `Error: ${error.message}`,
				variant: "destructive",
			});
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>
						{`Please confirm your action to change status to ${status}`}
					</DialogDescription>
				</DialogHeader>
				<hr />
				<div className="grid grid-cols-2 gap-4">
					<Button variant="default" onClick={handleClick}>Yes</Button>

					<DialogClose asChild>
						<Button variant="outline">No</Button>
					</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default AppointmentStatusDialog;
