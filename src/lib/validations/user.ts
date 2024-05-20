import { z } from "zod";

const timeFormat12Hour = /^(0[1-9]|1[0-2]):([0-5][0-9]) ?([AaPp][Mm])$/;
const phoneNumberFormat = /^(09|\+639)\d{9}$/;

export const UserValidation = z
	.object({
		image_url: z.string().url().min(1),
		companyName: z.string().min(1),
		typeOfProvider: z.string().min(1),
		phoneNumber: z.string().min(11).regex(phoneNumberFormat),
		experienceYears: z.coerce.number().int().positive().min(1),
		hourlyRate: z.coerce.number().int().positive().min(1),
		bio: z.string().min(2).max(1000),
		startTime: z.string().regex(timeFormat12Hour, {
			message: "Start time must be in the format HH:mm AM/PM",
		}),
		endTime: z.string().regex(timeFormat12Hour, {
			message: "End time must be in the format HH:mm AM/PM",
		}),
	})
	.refine(
		(data) => {
			const { startTime, endTime } = data;

			const startTimeDate = convertTo24HourDate(startTime);
			const endTimeDate = convertTo24HourDate(endTime);

			return endTimeDate > startTimeDate;
		},
		{
			message: "End time must be later than start time",
		}
	);

function convertTo24HourDate(timeStr: string) {
	const [time, modifier]: any = timeStr.split(" ");
	let [hours, minutes]: any = time.split(":");
	hours = parseInt(hours, 10);
	minutes = parseInt(minutes, 10);

	if (hours === 12) {
		hours = modifier.toUpperCase() === "AM" ? 0 : 12;
	} else {
		hours += modifier.toUpperCase() === "PM" ? 12 : 0;
	}

	return new Date().setHours(hours, minutes, 0, 0);
}
