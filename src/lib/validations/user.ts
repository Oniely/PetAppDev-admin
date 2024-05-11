import { z } from "zod";

export const UserValidation = z.object({
    image_url: z.string().url().min(1),
    companyName: z.string().min(1),
    typeOfProvider: z.string().min(1),
    phoneNumber: z.string().min(11),
    experienceYears: z.coerce.number().int().positive().min(1),
    hourlyRate: z.coerce.number().int().positive().min(1),
    bio: z.string().min(2).max(1000),
})