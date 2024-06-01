"use server";

import { Appointment } from "../models/appointment.model";
import { PetOwner } from "../models/owner.model";
import { connectDB } from "../mongoose";

export const fetchAppointments = async (providerId: string) => {
	try {
		connectDB();

		const appointments = await Appointment.find({ provider: providerId })
			.populate("service")
			.populate("petOwner")
			.sort({ date: "asc", time: "asc" })
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

		return await Appointment.countDocuments({ provider: providerId });
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
	status?: string;
}) => {
	try {
		connectDB();

		let query: any = { provider: providerId };

		if (status) {
			query.status = status;
		}

		const appointments = await Appointment.find(query)
			.limit(3)
			.populate("service")
			.populate("petOwner")
			.sort({ date: "asc", time: "asc" })
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
			.populate('pet')
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
