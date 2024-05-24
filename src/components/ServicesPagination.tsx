import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
	href: string;
	currentCount: number;
	isNext: boolean;
	servicesCount: number;
}

const ServicesPagination = ({
	href,
	currentCount,
	isNext,
	servicesCount,
}: Props) => {
	return (
		<Pagination>
			<PaginationContent>
				{currentCount > 1 && servicesCount >= 1 && (
					<PaginationItem>
						<PaginationPrevious
							href={`${href}?page=${currentCount - 1}`}
						/>
					</PaginationItem>
				)}
				{isNext && (
					<PaginationItem>
						<PaginationNext
							href={`${href}?page=${currentCount + 1}`}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

export default ServicesPagination;
