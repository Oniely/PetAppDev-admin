import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
	petOwner: { type: mongoose.Schema.Types.ObjectId, ref: "PetOwner" },
	provider: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
	status: {
		type: String,
		required: true
	},
	
}, {
	timestamps: true
})

export const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);