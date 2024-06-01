import mongoose from "mongoose";
import { Pet, PetOwner } from "./owner.model";
import { Service } from "./service.model";
import { Provider } from "./user.model";

const AppointmentSchema = new mongoose.Schema({
	pet: { type: mongoose.Schema.Types.ObjectId, ref: Pet },
	petOwner: { type: mongoose.Schema.Types.ObjectId, ref: PetOwner },
	service: { type: mongoose.Schema.Types.ObjectId, ref: Service },
	provider: { type: mongoose.Schema.Types.ObjectId, ref: Provider },
	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: "Pending",
	},
});

export const Appointment =
	mongoose.models.Appointment ||
	mongoose.model("Appointment", AppointmentSchema);
