import mongoose from "mongoose";

const ServiceProviderSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	userType: {
		type: String,
		enum: ["PetOwner", "ServiceProvider"],
		default: "ServiceProvider",
		required: true,
	},
	image_url: String,
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
	servicesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
	ratings: [{ rating: Number, comment: String }],
});

export const Provider =
	mongoose.models.Provider ||
	mongoose.model("Provider", ServiceProviderSchema);
