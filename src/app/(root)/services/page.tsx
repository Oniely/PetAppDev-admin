import ServicesPagination from "@/components/ServicesPagination";
import ServiceCard from "@/components/cards/ServiceCard";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { fetchServicesPaginate } from "@/lib/actions/service.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

interface Props {
	searchParams: { [key: string]: string | undefined };
}

const Services = async ({ searchParams }: Props) => {
	const user = await currentUser();
	const userData = await fetchUser(user?.id!);

	const pageNumber = searchParams["page"];

	const { services, isNext, nextCount } = await fetchServicesPaginate({
		providerId: userData._id,
		pageNumber: parseInt(pageNumber!),
	});

	if (!services) {
		return;
	}

	const breadCrumbs = [
		{
			name: "Services",
			href: "/services",
		},
	];

	return (
		<>
			<header className="header">
				<h1 className="head-text">Services</h1>
				<BreadCrumbs crumbs={breadCrumbs} />
			</header>
			{services.length > 0 && (
				<div className="w-1/3 max-md:w-1/2">
					<SearchBar />
				</div>
			)}
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
						<p>You have no more services.</p>
						<Link href="/create-service">
							<Button>Add New Service</Button>
						</Link>
					</div>
				)}
			</section>
			<ServicesPagination
				href="/services"
				currentCount={Number(pageNumber)!}
				isNext={isNext}
				servicesCount={services.length}
			/>
		</>
	);
};

export default Services;
