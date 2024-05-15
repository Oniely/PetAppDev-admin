import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.action";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Onboarding = async () => {
	const user = await currentUser();
	const userInfo = await fetchUser(user?.id!);

	if (userInfo?.onboarded) {
		redirect('/');
	}

	const userData = {
		userId: user?.id!,
		image_url: userInfo?.image_url! || user?.imageUrl || "",
		companyName: userInfo?.companyName || "",
		typeOfProvider: userInfo?.typeOfProvider || "",
		phoneNumber: userInfo?.phoneNumber || "",
		experienceYears: userInfo?.experienceYears || "",
		hourlyRate: userInfo?.hourlyRate || "",
		bio: userInfo?.bio || "",
	};

	return (
		<main className="mx-auto flex flex-col max-w-3xl px-10 py-20 w-full h-full self-start bg-low-orange/30 relative">
			<div className="absolute right-10">
				<SignOutButton redirectUrl="/sign-in" /> 
			</div>

			<h1 className="head-text">Onboarding</h1>
			<p>Complete your profile now to continue</p>

			<section className="mt-9">
				<AccountProfile user={userData} />
			</section>
		</main>
	);
};

export default Onboarding;
