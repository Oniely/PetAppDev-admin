import { z } from "zod";

export const ServiceTypes = {
    "Grooming": "GROOMING",
    "Veterinary": "VETERINARY",
    "Day Care": "DAY_CARE",
    "Pet Breeding": "PET_BREEDING",
    "Pet Checkup": "PET_CHECKUP",
    "Pet Training": "PET_TRAINING",
    "Pet Boarding": "PET_BOARDING",
    "Pet Sitting": "PET_SITTING",
    "Pet Walking": "PET_WALKING",
};

export const ServiceValidation = z.object({
    image_url: z.string().url().min(1),
    serviceName: z.string().min(1),
    typeOfService: z.nativeEnum(ServiceTypes, { message: "Please select the type of service" }),
    description: z.string().min(2).max(1000),
    duration: z.coerce.number().int().positive().min(1),
    price: z.coerce.number().int().positive().min(1)
})