import ServiceCard from "@/components/cards/ServiceCard";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { fetchServices } from "@/lib/actions/service.action";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

const Services = async () => {
	const user = await currentUser();
	const services = await fetchServices(user?.id!);

	const breadCrumbs = [
		{
			name: "Services",
			href: "/services"
		},
	];

	if (!services) {
		return;
	}

	return (
		<>
			<header className="header">
				<h1 className="head-text">Services</h1>
				<BreadCrumbs crumbs={breadCrumbs} />
			</header>
			<div>
				<SearchBar />
			</div>
			<section className="">
				{services.length > 0 && (
					<div className="grid grid-cols-3 max-sm:grid-cols-2 gap-3">
						{services.map((service: any) => (
							<ServiceCard
								serviceId={service._id}
								image_url={service.image_url}
								name={service.serviceName}
								type={service.serviceType}
								price={service.price}
								status={service.status}
								key={service._id}
							/>
						))}
					</div>
				)}

				{services.length < 1 && (
					<div className="w-full h-[60vh] flex flex-col items-center justify-center gap-3">
						<p>You have no added services yet.</p>
						<Link href='/create-service'>
							<Button>
								Add New Service
							</Button>
						</Link>
					</div>
				)}
			</section>
		</>
	);
};

export default Services;
