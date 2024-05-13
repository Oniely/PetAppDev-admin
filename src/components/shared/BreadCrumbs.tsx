import { Slash } from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

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
			<BreadcrumbList className="flex justify-end" key={1}>
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

				{crumbs.length > 0 &&
					crumbs.map((crumb, idx) => (
						<React.Fragment key={idx}>
							<BreadcrumbItem key={`crumb-${idx}`}>
								{idx !== crumbs.length - 1 ? (
									<BreadcrumbLink href={crumb.href}>
										{crumb.name}
									</BreadcrumbLink>
								) : (
									<BreadcrumbPage>
										{crumb.name}
									</BreadcrumbPage>
								)}
							</BreadcrumbItem>
							{idx !== crumbs.length - 1 && (
								<BreadcrumbSeparator key={`separator-${idx}`}>
									<Slash />
								</BreadcrumbSeparator>
							)}
						</React.Fragment>
					))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

export default BreadCrumbs;
