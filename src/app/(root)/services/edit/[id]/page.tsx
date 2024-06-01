import EditService from "@/components/forms/EditService";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import { getService } from "@/lib/actions/service.action";

const ServiceEdit = async ({ params }: { params: { id: string } }) => {
	const service = await getService(params.id);

	const serviceData = {
		id: params.id,
		image_url: service.image_url,
		serviceName: service.serviceName,
		typeOfService: service.typeOfService,
		description: service.description,
		duration: service.duration,
		price: service.price,
	}

	const breadCrumbs = [
		{
			name: "Services",
			href: "/services"
		},
		{
			name: "Edit Service",
			href: "#"
		},
	];

	return (
		<>
			<header className="header">
				<h1 className="head-text">Edit Service</h1>
				<BreadCrumbs crumbs={breadCrumbs} />
			</header>
			<section className="flex items-center justify-center">
				<EditService serviceId={params.id} service={serviceData} />
			</section>
		</>
	);
};

export default ServiceEdit;
