import BreadCrumbs from "@/components/shared/BreadCrumbs";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
	const user = await currentUser();
	const userData = await fetchUser(user?.id!);

	if (!userData?.onboarded) {
		redirect('/onboarding');
	}

	return (
		<>
			<header className="header">
				<h1 className="head-text">Home</h1>
				<BreadCrumbs />
			</header>
			<section>Home</section>
		</>
	);
};

export default Home;
