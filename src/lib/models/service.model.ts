import mongoose from "mongoose";

enum ServiceTypes {
	"GROOMING",
	"VETERINARY",
	"DAY_CARE",
	"PET_BREEDING",
	"PET_CHECKUP",
	"PET_TRAINING",
	"PET_BOARDING",
	"PET_SITTING",
	"PET_WALKING",
}

const ServiceSchema = new mongoose.Schema({
	provider: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
	image_url: {
		type: String,
		require: true,
	},
	serviceName: {
		type: String,
		required: true,
	},
	typeOfService: {
		type: String,
		enum: ServiceTypes,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	duration: {
		type: Number,
		require: true,
		min: 1, // in minutes
	},
	status: {
		type: Boolean,
		default: true,
	},
	price: { type: Number, require: true },
});

export const Service =
	mongoose.models.Service || mongoose.model("Service", ServiceSchema);
