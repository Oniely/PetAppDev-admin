"use client";

import { ServiceValidation, ServiceTypes } from "@/lib/validations/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Loading from "../shared/Loading";
import { useUploadThing } from "@/utils/uploadthing";

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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { redirect, usePathname } from "next/navigation";
import { UpdateService } from "@/lib/actions/service.action";
import Image from "next/image";
import { toast } from "../ui/use-toast";

interface Props {
	serviceId: string;
	service: {
		image_url?: string,
		serviceName?: string,
		typeOfService?: string,
		description?: string,
		duration?: number,
		price?: number,
	}
}

const EditService = ({ serviceId, service }: Props) => {
	const [files, setFiles] = useState<File[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { startUpload } = useUploadThing("media");

	const pathname = usePathname();

	const form = useForm({
		resolver: zodResolver(ServiceValidation),
		defaultValues: {
			image_url: service.image_url || "",
			serviceName: service.serviceName || "",
			typeOfService: service.typeOfService || "",
			description: service.description || "",
			duration: service.duration || 0,
			price: service.price || 0,
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

	const onSubmit = async (values: z.infer<typeof ServiceValidation>) => {
		setIsLoading(true);

		let newService: any = {
			serviceId,
			serviceName: values.serviceName,
			typeOfService: values.typeOfService,
			description: values.description,
			duration: values.duration,
			price: values.price,
			path: pathname,
		}

		try {
			if (files.length > 0) {
				const imgRes = await startUpload(files);

				if (imgRes) {
					values.image_url = imgRes[0]?.url;
					newService.image_url = values.image_url;
				}

			}

			await UpdateService(newService);
			toast({
				variant: "default",
				title: "Service updated successfully.",
				description: `You've updated ${values.serviceName}`
			})
		} catch (error: any) {
			throw new Error(
				`Something occur while creating a service... ${error.message}`
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Loading loading={isLoading} />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-1 flex-col justify-start gap-8 max-w-3xl"
				>
					<FormField
						control={form.control}
						name="image_url"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>
									<div className="mb-3">
										<Image src={field.value} alt="image" width={400} height={400} className="object-cover mx-auto rounded-lg" />
									</div>
									Profile Image
								</FormLabel>
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
						name="serviceName"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>Service Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="typeOfService"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>Type Of Service</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select service type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectGroup>
											{Object.entries(ServiceTypes).map(
												([key, value]) => (
													<SelectItem
														key={value}
														value={value}
													>
														{key}
													</SelectItem>
												)
											)}
										</SelectGroup>
									</SelectContent>
								</Select>

								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="duration"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>
									Duration{" - "}
									<span className="text-dark-gray/70 font-light">
										{
											"(in minutes)"
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
						name="price"
						render={({ field }) => (
							<FormItem className="flex flex-col gap-3 w-full">
								<FormLabel>Price</FormLabel>
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
					<Button type="submit">Update Service</Button>
				</form>
			</Form>
		</>
	);
};

export default EditService;
