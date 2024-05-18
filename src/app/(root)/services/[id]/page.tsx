import StatusDialog from "@/components/forms/StatusDialog";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getService } from "@/lib/actions/service.action";
import Image from "next/image";
import Link from "next/link";

const ServiceDetail = async ({ params }: { params: { id: string } }) => {
	const service = await getService(params.id);
	const { provider } = service;

	const breadCrumbs = [
		{
			name: "Services",
			href: "/services",
		},
		{
			name: "Details of Service",
			href: "/services",
		},
	];

	return (
		<>
			<header className="header">
				<h1 className="head-text">Service Details</h1>
				<BreadCrumbs crumbs={breadCrumbs} />
			</header>
			<section className="grid grid-cols-2 max-sm:grid-cols-1 relative">
				<div className="flex flex-col gap-3">
					<div className="h-[300px] relative border rounded-lg">
						<Image
							src={service.image_url}
							alt="Service Image"
							className="object-contain rounded-lg"
							draggable={false}
							fill
						/>
					</div>
				</div>
				<div className="flex flex-col justify-between sm:ml-12 max-sm:mt-4 h-[300px] max-sm:h-auto max-sm:gap-4">
					<div className="flex flex-col gap-1">
						<div className="flex items-center justify-between gap-2 mb-2 border-b border-b-neutral-500 py-1">
							<p className="text-xl font-semibold">
								{service.serviceName}
							</p>

							<StatusDialog serviceId={params.id} status={service.status} />
						</div>
						<p className="text-neutral-800 lowercase">
							<span className="capitalize">
								{service.typeOfService.split("_").join(" ")}
							</span>
						</p>
						<p className="text-neutral-700 font-light">
							Duration:{" "}
							<span className="font-medium">
								{service.duration}mins
							</span>
						</p>
						<p className="text-neutral-700 font-light">
							Price:{" "}
							<span className="font-medium">
								₱{service.price}
							</span>
						</p>
						<p className="text-neutral-700 font-light">
							Description:
						</p>
						<ScrollArea className="max-h-[120px]">
							<p className="text-neutral-700 font-light text-sm">
								{service.description}
							</p>
						</ScrollArea>
					</div>
					<div className="flex items-center gap-3">
						<Link
							href={`/services/edit/${service._id}`}
							className="flex-1"
						>
							<Button className="w-full">See Appointments</Button>
						</Link>
						<Link
							href={`/services/edit/${service._id}`}
							className="flex-1"
						>
							<Button className="w-full" variant="outline">
								Edit
							</Button>
						</Link>
					</div>
				</div>
			</section>
			<section className="mt-10">
				<h1 className="head-text">Extra Info</h1>
				<p>Maybe current history appointment numbers?</p>
				<p>Graphs?</p>
				<p>show here all current appointments?</p>
			</section>
		</>
	);
};

export default ServiceDetail;
