import { z } from "zod";

const timeFormat12Hour = /^(0[1-9]|1[0-2]):([0-5][0-9]) ?([AaPp][Mm])$/;

export const UserValidation = z.object({
	image_url: z.string().url().min(1),
	companyName: z.string().min(1),
	typeOfProvider: z.string().min(1),
	phoneNumber: z.string().min(11),
	experienceYears: z.coerce.number().int().positive().min(1),
	hourlyRate: z.coerce.number().int().positive().min(1),
	bio: z.string().min(2).max(1000),
	startTime: z.string().regex(timeFormat12Hour, {
		message: "Start time must be in the format HH:mm AM/PM",
	}),
	endTime: z.string().regex(timeFormat12Hour, {
		message: "End time must be in the format HH:mm AM/PM",
	}),
});
