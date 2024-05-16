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
import { updateUser } from "@/lib/actions/user.action";
import { usePathname } from "next/navigation";
import Loading from "../shared/Loading";
import Image from "next/image";
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
	};
}

const ProfileInfo = ({ user }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [files, setFiles] = useState<File[]>([]);
	const { startUpload } = useUploadThing("media");

	const pathname = usePathname();

	const form = useForm({
		resolver: zodResolver(UserValidation),
		defaultValues: {
			image_url: user?.image_url || "",
			phoneNumber: user.phoneNumber || "",
			companyName: user.companyName || "",
			typeOfProvider: user.typeOfProvider || "",
			bio: user.bio || "",
			experienceYears: parseInt(user.experienceYears) || 0,
			hourlyRate: parseInt(user.hourlyRate) || 0,
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

		let newUserData: any = {
			userId: user.userId,
			companyName: values.companyName,
			typeOfProvider: values.typeOfProvider,
			phoneNumber: values.phoneNumber,
			experienceYears: values.experienceYears,
			hourlyRate: values.hourlyRate,
			bio: values.bio,
			path: pathname
		};

		try {
			if (files.length > 0) {
				const imgRes = await startUpload(files);

				if (imgRes) {
					values.image_url = imgRes[0]?.url;
					newUserData.image_url = values.image_url;
				}

			}

			const result = await updateUser(newUserData);

			if (!result) {
				toast({
					title: "Something went wrong...",
					description: "Company already exists",
					variant: "destructive",
				});
			} else {
				toast({
					title: "Successfully updated profile",
					description: "You have updated your company's profile.",
				});
			}
		} catch (error: any) {
			throw new Error(
				`Something went wrong registering ${error.message}`
			);
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
					className="grid grid-cols-2 gap-4"
				>
					<FormField
						control={form.control}
						name="image_url"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full col-span-2 border-b border-b-gray-300 pb-6">
								<FormLabel className="self-start rounded-full">
									<div className="w-44 h-44 relative rounded-full overflow-hidden cursor-pointer hover:opacity-90 border">
										{field.value && (
											<>
												<Image
													src={field.value}
													alt="photo"
													fill
												/>
												<div className="w-full h-[2rem] bg-black/70 absolute bottom-0 grid place-content-center">
													{/* prettier-ignore */}
													<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#FFFFFF" className="w-6 h-6">
														<path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
														<path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
													</svg>
												</div>
											</>
										)}
									</div>
								</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept="image/*"
										placeholder="Add profile photo"
										onChange={(e) =>
											handleImage(e, field.onChange)
										}
										className="hidden"
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
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>Company Name</FormLabel>
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
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>Type of Service</FormLabel>
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
							<FormItem className="flex flex-col gap-3 w-full">
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
								<FormLabel>Experience Years</FormLabel>
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
								<FormLabel>Hourly Rate</FormLabel>
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
						name="bio"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full col-span-2">
								<FormLabel>Bio</FormLabel>
								<FormControl>
									<Textarea rows={5} {...field} />
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

export default ProfileInfo;
