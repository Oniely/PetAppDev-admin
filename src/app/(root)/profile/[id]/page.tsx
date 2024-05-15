import ProfileSideBar from "@/components/shared/ProfileSideBar";

const Profile = ({ params }: { params: { id: string } }) => {
	return (
		<section className="flex flex-row h-full max-md:flex-col">
			<ProfileSideBar active="Company Info" />
			<main className="flex-1 flex flex-col pl-6 max-md:pl-0">
				<div className="pb-3 border-b border-b-gray-300">
					<h1 className="text-3xl font-semibold">
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
