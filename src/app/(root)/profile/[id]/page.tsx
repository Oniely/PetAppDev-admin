import BreadCrumbs from "@/components/shared/BreadCrumbs";
import ProfileSideBar from "@/components/shared/ProfileSideBar";

const Profile = ({ params }: { params: { id: string } }) => {
	const breadCrumbs = [
		{
			name: "Profile",
			href: `/profile/${params.id}`,
		},
	];

	return (
		<section className="flex flex-row h-full">
			<ProfileSideBar active="Company Info" />
			<main className="flex flex-col px-6">
				<div>
					<h1 className="text-2xl font-semibold">
						Company Information
					</h1>
				</div>
				<div>
					{/* NEW CHANGES COMES HERE */}
				</div>
			</main>
		</section>
	);
};

export default Profile;
