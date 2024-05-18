"use server";

import { revalidatePath } from "next/cache";
import { Service } from "../models/service.model";
import { connectDB } from "../mongoose";
import { fetchUser } from "./user.action";
import { Provider } from "../models/user.model";

interface ServiceParams {
	userId: string;
	image_url: string;
	serviceName: string;
	typeOfService: string;
	description: string;
	duration: number;
	price: number;
	path: string;
}

export const getService = async (serviceId: string) => {
	try {
		connectDB();

		return await Service.findById(serviceId).populate("provider");
	} catch (error: any) {
		throw new Error(
			`An error has occur while fetching a service: ${error.message}`
		);
	}
};

export const CreateService = async ({
	userId,
	image_url,
	serviceName,
	typeOfService,
	description,
	duration,
	price,
	path,
}: ServiceParams) => {
	try {
		connectDB();

		const user = await fetchUser(userId);

		if (!user) {
			return;
		}

		const service = new Service({
			provider: user._id,
			image_url,
			serviceName,
			typeOfService,
			description,
			duration,
			price,
		});

		const newService = await service.save();

		const updatedProvider = await Provider.findOneAndUpdate(
			{ _id: user._id },
			{ $push: { servicesOffered: newService._id } },
			{ new: true }
		);

		if (!updatedProvider) {
			throw new Error(`Provider not found or update has failed.`);
		}

		revalidatePath(path);
	} catch (error: any) {
		throw new Error(
			`An error has occur when creating service: ${error.message}`
		);
	}
};

export const fetchServices = async (providerId: string) => {
	try {
		connectDB();

		const services = await Service.find({ provider: providerId }).sort({ status: 'desc' }).exec();

		return services;
	} catch (error: any) {
		throw new Error(
			`An error has occur while fetching services: ${error.message}`
		);
	}
}

export const fetchServicesByUserId = async (userId: string) => {
	try {
		connectDB();

		const services = await Provider.findOne({ userId }).populate("servicesOffered");

		return services.servicesOffered;
	} catch (error: any) {
		throw new Error(
			`An error has occur while fetching services: ${error.message}`
		);
	}
};

interface UpdateServiceProps {
	serviceId: string;
	image_url?: string;
	serviceName: string;
	typeOfService: string;
	description: string;
	duration: number;
	price: number;
	path: string;
}

export const UpdateService = async ({
	serviceId,
	image_url,
	serviceName,
	typeOfService,
	description,
	duration,
	price,
	path,
}: UpdateServiceProps) => {
	try {
		connectDB();

		let newService: any = {
			serviceName,
			typeOfService,
			description,
			duration,
			price,
		};

		if (image_url) {
			newService.image_url = image_url;
		}

		await Service.findOneAndUpdate(
			{ _id: serviceId },
			{ $set: newService }
		);
		revalidatePath(path);
	} catch (error: any) {
		throw new Error(
			`An error has occur while updating service: ${error.message}`
		);
	}
};

export async function serviceStatusChange({
	serviceId,
	status,
	path,
}: {
	serviceId: string;
	status: boolean;
	path: string;
}) {
	try {
		connectDB();

		const service = await Service.findOneAndUpdate(
			{ _id: serviceId },
			{ status: status },
			{ new: true }
		).exec();

		revalidatePath(path);
		return service ? true : false;
	} catch (error: any) {
		throw new Error(
			`An error has occur while changing status of service: ${error.message}`
		);
	}
}

export const deleteService = async (serviceId: string) => {
	try {
		connectDB();

		const result = await Service.findOneAndDelete({ _id: serviceId });

		return result ? true : false;
	} catch (error: any) {
		throw new Error(`An error has occur while deleting service: ${error.message}`);
	}
}