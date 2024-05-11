import { Slash } from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadCrumb {
	name: string;
	href: string;
}

export interface BreadCrumbProps {
	crumbs?: BreadCrumb[];
}

const BreadCrumbs = ({ crumbs = [] }: BreadCrumbProps) => {
	return (
		<Breadcrumb>
			<BreadcrumbList className="flex justify-end">
				<BreadcrumbItem>
					{crumbs.length === 0 ? (
						<BreadcrumbPage>Home</BreadcrumbPage>
					) : (
						<BreadcrumbLink href="/">Home</BreadcrumbLink>
					)}
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<Slash />
				</BreadcrumbSeparator>

				{crumbs!.length > 0 &&
					crumbs!.map((crumb, i) => (
						<>
							<BreadcrumbItem key={i}>
								{i !== crumbs!.length - 1 ? (
									<BreadcrumbLink href={crumb.href}>
										{crumb.name}
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage>
										{crumb.name}
									</BreadcrumbPage>
								)}
							</BreadcrumbItem>
							{i !== crumbs!.length - 1 && (
								<BreadcrumbSeparator key={`sep-${i}`}>
									<Slash />
								</BreadcrumbSeparator>
							)}
						</>
					))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default BreadCrumbs;
