import ProfileInfo from "@/components/forms/ProfileInfo";
import ProfileSideBar from "@/components/shared/ProfileSideBar";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";

const Profile = async ({ params }: { params: { id: string } }) => {
	const user = await currentUser();
	const userInfo = await fetchUser(user?.id!);

	const userData = {
		userId: user?.id!,
		image_url: userInfo?.image_url! || user?.imageUrl || "",
		companyName: userInfo?.companyName || "",
		typeOfProvider: userInfo?.typeOfProvider || "",
		phoneNumber: userInfo?.phoneNumber || "",
		experienceYears: userInfo?.experienceYears || "",
		hourlyRate: userInfo?.hourlyRate || "",
		bio: userInfo?.bio || "",
		operatingDays: userInfo?.operatingDays || [],
		startTime: userInfo.operatingHours?.startTime || "",
		endTime: userInfo.operatingHours?.endTime || "",
	};

	return (
		<section className="flex flex-row h-full max-md:flex-col">
			<ProfileSideBar active="Company Info" />
			<main className="flex-1 flex flex-col pl-6 max-md:pl-0">
				<div className="pb-3 border-b border-b-gray-300">
					<h1 className="text-3xl font-semibold">
						Company Information
					</h1>
				</div>
				<section className="flex flex-col pt-6">
					<ProfileInfo user={userData} />
				</section>
			</main>
		</section>
	);
};

export default Profile;
