"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
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
import Loading from "../shared/Loading";
import { FormEvent, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { serviceStatusChange } from "@/lib/actions/service.action";
import { toast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
	serviceId: string;
	status: boolean;
}

const StatusDialog = ({ serviceId, status }: Props) => {
	const [loading, setLoading] = useState(false);
	const statusValue = status ? "Available" : "Not Available";
	const pathname = usePathname();
	const btnRef = useRef<HTMLButtonElement>(null);

	const FormSchema = z.object({
		status: z.string().min(1),
	});

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			status: statusValue
		}
	});

	async function onSubmit(values: z.infer<typeof FormSchema>) {
		setLoading(true);
		try {
			const result = await serviceStatusChange({
				serviceId,
				status: values.status === "Available" ? true : false,
				path: pathname,
			});

			if (!result) {
				toast({
					title: "Failed to update service status",
					description:
						"An error has occured while updating the status of your service.",
					variant: "destructive",
				});
			}
			toast({
				title: "Status Changed",
				description:
					"You have successfully updated the status of your service.",
			});
		} catch (error: any) {
			throw new Error(
				`Something went wrong while updating service status: ${error.message}`
			);
		} finally {
			setLoading(false);
			btnRef.current!.click();
		}
	}

	return (
		<>
			<Loading loading={loading} />
			<Dialog>
				<DialogTrigger asChild>
					<Button variant="outline">
						<span
							className={`text-neutral-700 relative after:content-[''] after:w-2 after:h-2 after:absolute after:top-0.5 after:ml-0.5 after:animate-pulse after:rounded-full ${
								status
									? "after:bg-green-400"
									: "after:bg-yellow-400"
							}`}
						>
							{status ? "Available" : "Not Available"}
						</span>
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Status Change</DialogTitle>
						<DialogDescription>
							Changing the status will immediately be in effect
							and will show up in your manage services.
						</DialogDescription>
					</DialogHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-3"
						>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select a status" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="Available">
														Available
													</SelectItem>
													<SelectItem value="Not Available">
														Not Available
													</SelectItem>
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-2 gap-3">
								<DialogClose asChild>
									<Button type="button" variant="outline" ref={btnRef}>
										Cancel
									</Button>
								</DialogClose>
								<Button type="submit">Update</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default StatusDialog;
