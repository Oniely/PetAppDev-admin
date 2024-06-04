"use server";

import { Notification } from "../models/notification.model";
import { connectDB } from "../mongoose";

export const fetchNotifications = async (providerId: string) => {
	try {
		connectDB();

		const notifications = await Notification.find({ notifyee:  })
	} catch (error: any) {
		throw new Error(`Something went wrong while fetching notifications: ${error.message}`);
	}
}