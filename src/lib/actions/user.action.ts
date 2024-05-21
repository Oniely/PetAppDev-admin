"use server";

import { revalidatePath } from "next/cache";
import { Provider } from "../models/user.model";
import { connectDB } from "../mongoose";

export async function fetchUser(userId: string) {
	try {
		connectDB();

		return await Provider.findOne({ userId });
	} catch (error: any) {
		throw new Error(`Failed to fetch user: ${error.message}`);
	}
}

interface UserParams {
	userId: string;
	phoneNumber: string;
	companyName: string;
	typeOfProvider: string;
	bio: string;
	image_url: string;
	experienceYears: number;
	hourlyRate: number;
	onboarded: boolean;
	operatingDays: string[];
	startTime: string;
	endTime: string;
	path: string;
}

export async function upsertUser({
	image_url,
	userId,
	phoneNumber,
	companyName,
	typeOfProvider,
	bio,
	experienceYears,
	hourlyRate,
	onboarded,
	operatingDays,
	startTime,
	endTime,
	path,
}: UserParams) {
	try {
		connectDB();

		const companyExist = await Provider.findOne({ companyName });

		if (companyExist && companyExist?.onboarded) {
			return false;
		}

		await Provider.findOneAndUpdate(
			{ userId },
			{
				image_url,
				phoneNumber,
				companyName,
				typeOfProvider,
				bio,
				experienceYears,
				hourlyRate,
				onboarded,
				operatingDays,
				operatingHours: {
					startTime,
					endTime,
				},
			},
			{ upsert: true }
		);
		revalidatePath(path);
		return true;
	} catch (error: any) {
		throw new Error(`Failed to insert/update user: ${error.message}`);
	}
}

interface UpdateUserParams {
	userId: string;
	image_url?: string;
	phoneNumber: string;
	companyName: string;
	typeOfProvider: string;
	bio: string;
	experienceYears: number;
	hourlyRate: number;
	operatingDays: string[];
	startTime: string;
	endTime: string;
	path: string;
}

export async function updateUser({
	image_url,
	userId,
	phoneNumber,
	companyName,
	typeOfProvider,
	bio,
	experienceYears,
	hourlyRate,
	operatingDays,
	startTime,
	endTime,
	path,
}: UpdateUserParams) {
	try {
		connectDB();

		let newUserData: any = {
			phoneNumber,
			typeOfProvider,
			bio,
			experienceYears,
			hourlyRate,
			operatingDays,
			operatingHours: {
				startTime,
				endTime,
			},
		};

		if (image_url) {
			newUserData.image_url = image_url;
		}

		const provider = await Provider.findOne({
			companyName: companyName,
			userId: { $ne: userId },
		}).exec();

		if (!provider) {
			newUserData.companyName = companyName;

			const updatedProvider = await Provider.findOneAndUpdate(
				{ userId },
				{ $set: newUserData },
				{ new: true }
			);

			if (updatedProvider) {
				revalidatePath(path);
				return true;
			}
		}

		return false;
	} catch (error: any) {
		throw new Error(
			`An error occur while updating profile info: ${error.message}`
		);
	}
}
