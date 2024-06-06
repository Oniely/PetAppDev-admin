"use server";

import { string } from "zod";
import { Appointment } from "../models/appointment.model";
import { PetOwner } from "../models/owner.model";
import { connectDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import { Notification } from "../models/notification.model";

export const fetchAppointments = async (providerId: string) => {
	try {
		connectDB();

		const appointments = await Appointment.find({
			provider: providerId,
			status: { $nin: ["Canceled", "Completed", "Reschedule"] },
		})
			.populate("service")
			.populate("petOwner")
			.sort({ date: "desc", time: "asc" })
			.exec();

		if (!appointments) {
			return [];
		}

		return appointments;
	} catch (error: any) {
		throw new Error(
			`Something went wrong while fetching appointments: ${error.message}`
		);
	}
};

export const filterAppointment = async ({
	providerId,
	status,
}: {
	providerId: string;
	status: string | null;
}) => {
	try {
		connectDB();

		let query: any = { provider: providerId };

		if (status !== null && status !== "All") {
			query.status = status;
		}

		const appointments = await Appointment.find(query)
			.populate("service")
			.populate("petOwner")
			.sort({ date: "desc", time: "asc" })
			.exec();

		if (!appointments) {
			return [];
		}

		return appointments;
	} catch (error: any) {
		throw new Error(
			`Something went wrong while fetching appointments: ${error.message}`
		);
	}
};

export const getAppointmentsCount = async (providerId: string) => {
	try {
		connectDB();

		return await Appointment.countDocuments({
			provider: providerId,
			status: { $nin: ["Canceled", "Completed", "Reschedule"] },
		});
	} catch (error: any) {
		throw new Error(
			`Something went wrong while fetching appointments: ${error.message}`
		);
	}
};

export const fetchUpcomingAppointments = async ({
	providerId,
	status = "",
}: {
	providerId: string;
	status?: string | string[];
}) => {
	try {
		connectDB();

		let query: any = { provider: providerId };

		if (status) {
			query.status = { $in: status };
		}

		const appointments = await Appointment.find(query)
			.limit(3)
			.populate("service")
			.populate("petOwner")
			.sort({ date: "desc", time: "asc" })
			.exec();

		if (!appointments) {
			return [];
		}

		return appointments;
	} catch (error: any) {
		throw new Error(
			`Something went wrong while fetching upcoming appointments: ${error.message}`
		);
	}
};

export const getAppointment = async (appointmentId: string) => {
	try {
		connectDB();

		const appointment = await Appointment.findOne({ _id: appointmentId })
			.populate("service")
			.populate("petOwner")
			.populate("pet")
			.exec();

		if (!appointment) {
			return false;
		}

		return appointment;
	} catch (error: any) {
		throw new Error(
			`Something went wrong while fetching an appointments: ${error.message}`
		);
	}
};

export const updateAppointmentStatus = async ({
	id,
	newStatus,
	path,
}: {
	id: string;
	newStatus: string;
	path: string;
}) => {
	try {
		connectDB();

		const appointment = await Appointment.findOneAndUpdate(
			{ _id: id },
			{ status: newStatus },
			{ new: true }
		).populate('service').exec();

		if (!appointment) {
			return false;
		}

		if (appointment.status === "Completed") {
			const priceAppointment = await Appointment.findOneAndUpdate({ _id: id }, { price: appointment.service.price }, { new: true }).exec();

			if (!priceAppointment) {
			return false;
		}
		}

		const newNotif = await Notification.findOneAndUpdate(
			{ appointment: appointment._id },
			{
				status: newStatus,
				ownerMessage: `Your Appointment status is now ${newStatus}!`,
				providerMessage: `Appointment has now been ${
					newStatus !== "Reschedule" ? newStatus : "Rescheduled"
				}!`,
			},
			{ upsert: true, new: true }
		).exec();

		if (!newNotif) {
			return false;
		}

		revalidatePath(path);

		return true;
	} catch (error: any) {
		throw new Error(
			`Something went wrong while updating appointment status: ${error.message}`
		);
	}
};

export const getEarnings = async (providerId: string) => {
	try {
		connectDB();

		const result = await Appointment.aggregate([
		    { $match: { provider: providerId, status: "Completed" } },
		    { $project: { price: 1 } },
		    { $group: { _id: null, total: { $sum: "$price" } } }
		]);

		const totalPrices = result.length > 0 ? result[0].total : 0;

		return totalPrices;
	} catch (error: any) {
		throw new Error(`Something went wrong while getting earnings data: ${error.message}`);
	}
}