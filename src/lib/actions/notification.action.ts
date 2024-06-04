"use server";

import { Notification } from "../models/notification.model";
import { connectDB } from "../mongoose";

interface fetchNotification {
	providerId: string;
	date: "Today" | "Yesterday" | "Other Days";
}

export const fetchNotifications = async ({
	providerId,
	date,
}: fetchNotification) => {
	let today = new Date();
	today.setHours(0, 0, 0, 0);

	let yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	try {
		connectDB();

		let query: any = {
			recipientModel: "Provider",
			recipient: providerId,
		};

		if (date === "Today") {
			query.createdAt = { $gte: today };
		} else if (date === "Yesterday") {
			query.createdAt = { $gte: yesterday, $lt: today };
		} else if (date === "Other Days") {
			query.createdAt = { $lt: yesterday };
		}

		const notifications = await Notification.find(query)
			.populate("notifier")
			.populate({
				path: "appointment",
				populate: {
					path: 'service',
					model: "Service"
				}
			})
			.exec();

		return notifications;
	} catch (error: any) {
		throw new Error(
			`Something went wrong while fetching notifications: ${error.message}`
		);
	}
};
