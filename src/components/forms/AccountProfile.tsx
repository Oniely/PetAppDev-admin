"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/utils/uploadthing";
import { upsertUser } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";
import Loading from "../shared/Loading";
import { toast } from "../ui/use-toast";

interface Props {
	user: {
		userId: string;
		image_url: string;
		companyName: string;
		typeOfProvider: string;
		phoneNumber: string;
		experienceYears: string;
		hourlyRate: string;
		bio: string;
		startTime: string;
		endTime: string;
	};
}

const AccountProfile = ({ user }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing("media");

	const pathname = usePathname();

	const form = useForm({
		resolver: zodResolver(UserValidation),
		defaultValues: {
			image_url: user?.image_url || "",
			phoneNumber: "",
			companyName: "",
			typeOfProvider: "",
			bio: "",
			experienceYears: 0,
			hourlyRate: 0,
			startTime: "",
			endTime: "",
		},
	});

	function handleImage(
		e: ChangeEvent<HTMLInputElement>,
		fieldChange: (value: string) => void
	) {
		e.preventDefault();

		const fileReader = new FileReader();

		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];

			setFiles(Array.from(e.target.files));

			if (!file.type.includes("image")) return;

			fileReader.onload = async (e) => {
				const imageDataUrl = e.target?.result?.toString() || "";

				fieldChange(imageDataUrl!);
			};
			fileReader.readAsDataURL(file);
		}
	}

	async function onSubmit(values: z.infer<typeof UserValidation>) {
		setIsLoading(true);
		try {
			const imgRes = await startUpload(files);

			if (imgRes) {
				values.image_url = imgRes[0].url;
				console.log(imgRes[0].url);
			} else {
				setIsLoading(false);
				alert("Failed Image Upload");
				return;
			}

			const success = await upsertUser({
				userId: user.userId,
				image_url: values.image_url,
				companyName: values.companyName,
				typeOfProvider: values.typeOfProvider,
				phoneNumber: values.phoneNumber,
				experienceYears: values.experienceYears,
				hourlyRate: values.hourlyRate,
				bio: values.bio,
				onboarded: true,
				startTime: values.startTime,
				endTime: values.endTime,
				path: pathname,
			});

			if (!success) {
				alert("Company Already Exist");
			}
			setIsLoading(false);
		} catch (error: any) {
			toast({
				title: "Something went wrong...",
				description: `Error: ${error.message}`,
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<Loading loading={isLoading} />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid grid-cols-2 justify-start gap-8"
				>
					<FormField
						control={form.control}
						name="image_url"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full col-span-2">
								<FormLabel>Profile Image</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept="image/*"
										placeholder="Add profile photo"
										onChange={(e) =>
											handleImage(e, field.onChange)
										}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="companyName"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full col-span-2">
								<FormLabel>
									Company Name{" - "}
									<span className="text-dark-gray/70 font-light">
										{"(*Invidual: your name)"}
									</span>
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="typeOfProvider"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full col-span-2">
								<FormLabel>
									Type of Service{" - "}
									<span className="text-dark-gray/70 font-light">
										{"(*Veterinary, Onboarder, etc.)"}
									</span>
								</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full col-span-2">
								<FormLabel>Contact Number</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="experienceYears"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>
									Experience Years{" - "}
									<span className="text-dark-gray/70 font-light">
										{
											"*(In years, just use 1 if less than a year)"
										}
									</span>
								</FormLabel>
								<FormControl>
									<Input type="number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="hourlyRate"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>
									Hourly Rate{" - "}
									<span className="text-dark-gray/70 font-light">
										{
											"*(minimum/average price for your service)"
										}
									</span>
								</FormLabel>
								<FormControl>
									<div className="flex items-center gap-2 relative">
										<span className="absolute left-2 text-sm font-light">
											₱
										</span>
										<Input
											type="number"
											className="pl-6"
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="startTime"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>
									Start Time{" - "}
									<span className="text-dark-gray/70 font-light">
										{
											"*The time format should be (HH:mm AM/PM) - 09:00 AM"
										}
									</span>
								</FormLabel>
								<FormControl>
									<div className="flex items-center gap-2 relative">
										<Input type="text" {...field} />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="endTime"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>
									End Time{" - "}
									<span className="text-dark-gray/70 font-light">
										{
											"*The time format should be (HH:mm AM/PM) - 06:00 PM"
										}
									</span>
								</FormLabel>
								<FormControl>
									<div className="flex items-center gap-2 relative">
										<Input type="text" {...field} />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full col-span-2">
								<FormLabel>Bio</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="bg-dark-gray hover:bg-dark-gray/80 col-span-2"
					>
						Continue
					</Button>
				</form>
			</Form>
		</>
	);
};

export default AccountProfile;
