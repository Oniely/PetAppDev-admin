import mongoose from "mongoose";

const PetOwnerSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	image_url: String,
	phoneNumber: String,
	fname: String,
	lname: String,
	pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
});

const PetSchema = new mongoose.Schema({
	petName: {
		type: String,
		required: true,
	},
	species: {
		type: String,
		enum: ["Dog", "Cat"],
		required: true,
	},
	breed: String,
	age: Number,
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "PetOwner",
	},
});

export const PetOwner = mongoose.models.PetOwner || mongoose.model("PetOwner", PetOwnerSchema);
export const Pet = mongoose.models.Pet || mongoose.model("Pet", PetSchema);
