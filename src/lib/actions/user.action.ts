"use server";

import { revalidatePath } from "next/cache";
import { Provider } from "../models/user.model";
import { connectDB } from "../mongoose";

export async function fetchUser(userId: string) {
	try {
		connectDB();

		return await Provider.findOne({ userId }).exec();
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
	path,
}: UserParams) {
	try {
		connectDB();

		const companyExist = await Provider.findOne({ companyName });

		if (!companyExist) {
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
				},
				{ upsert: true }
			);
		} else {
			return false;
		}

		revalidatePath(path);
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
