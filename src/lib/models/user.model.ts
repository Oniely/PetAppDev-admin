import mongoose from "mongoose";

const timeFormat12Hour = /^(0[1-9]|1[0-2]):([0-5][0-9]) ?([AaPp][Mm])$/;

const AvailabilitySchema = new mongoose.Schema(
	{
		startTime: {
			type: String,
			required: true,
			match: [
				timeFormat12Hour,
				"Start time must be in the format HH:mm AM/PM",
			],
		},
		endTime: {
			type: String,
			required: true,
			match: [
				timeFormat12Hour,
				"End time must be in the format HH:mm AM/PM",
			],
		},
	},
	{ _id: false }
);

const ServiceProviderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	image_url: {
		type: String,
		required: true,
	},
	phoneNumber: String,
	companyName: {
		type: String,
		required: true,
	},
	typeOfProvider: {
		type: String,
		required: true,
	},
	bio: String,
	experienceYears: Number,
	hourlyRate: {
		type: Number,
		required: true,
	},
	onboarded: {
		type: Boolean,
		default: false,
	},
	operatingHours: {
		type: AvailabilitySchema,
		required: true,
	},
	servicesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
	ratings: [{ rating: Number, comment: String }],
});

export const Provider =
	mongoose.models.Provider ||
	mongoose.model("Provider", ServiceProviderSchema);
