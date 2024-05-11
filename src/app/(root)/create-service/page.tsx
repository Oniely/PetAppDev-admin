import AddService from "@/components/forms/AddService";
import BreadCrumbs from "@/components/shared/BreadCrumbs";

const CreateService = () => {
	const breadCrumbs = [
		{
			name: "Add Service",
			href: "/create-service"
		}
	]

	return (
		<>
			<header className="header">
				<h1 className="head-text">Create Service</h1>
				<BreadCrumbs crumbs={breadCrumbs} />
			</header>
			<section className="flex items-center justify-center ">
				<AddService />
			</section>
		</>
	);
};

export default CreateService;
