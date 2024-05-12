import BreadCrumbs from "@/components/shared/BreadCrumbs";

const Profile = ({ params } : { params: { id :string } }) => {
	const breadCrumbs = [
		{
			name: "Profile",
			href: `/profile/${params.id}`
		}
	]

	return (
		<>
			<header className="header">
				<h1 className="head-text">Profile</h1>
				<BreadCrumbs crumbs={breadCrumbs} />
			</header>
			<section>Profile</section>
		</>
	);
};

export default Profile;
