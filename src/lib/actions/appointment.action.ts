"use server";

import { Appointment } from "../models/appointment.model";
import { connectDB } from "../mongoose";

export const fetchAppointments = async (providerId: string) => {
	try {
		connectDB();

		const appointments = await Appointment.find({ provider: providerId })
			.populate("service")
			.sort({ date: "asc", time: "asc" });

		if (!appointments) {
			return false;
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

		return await Appointment.countDocuments({ provider: providerId });
	} catch (error: any) {
		throw new Error(
			`Something went wrong while fetching appointments: ${error.message}`
		);
	}
};

export const fetchUpcomingAppointments = async (providerId: string) => {
	try {
		connectDB();

		const appointments = await Appointment.find({ provider: providerId })
			.limit(3)
			.populate("service")
			.sort({ date: "asc", time: "asc" });

		if (!appointments) {
			return false;
		}
		console.log(appointments);
		return appointments;
	} catch (error: any) {
		throw new Error(
			`Something went wrong while fetching upcoming appointments: ${error.message}`
		);
	}
};
