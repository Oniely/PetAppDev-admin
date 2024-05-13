import Image from "next/image";
import Link from "next/link";

interface Props {
	title: string;
	image_url: string;
	data: string;
	className: string;
	href: string;
}

const DashboardCard = ({ title, image_url, data, className, href }: Props) => {
	return (
		<Link href={href}>
			<div
				className={`${className} flex gap-3 px-4 py-4 max-lg:px-6 h-[10rem] max-lg:h-[8rem] min-w-fit rounded-xl cursor-pointer group shadow-sm relative overflow-hidden`}
			>
				<div className="flex flex-col gap-4 leading-6">
					<h2 className="font-medium">{title}</h2>
					<p className="text-4xl font-semibold">{data}</p>
				</div>

				<Image src={image_url} alt={title} width={125} height={125} className="absolute -bottom-7 right-6" />

				<div className="absolute w-8 h-8 overflow-hidden transition-all bg-white rounded-full top-3 right-3 ease-in-out delay-500">
					<Image
						src="/images/arrow-right.svg"
						alt=">"
						className="object-cover p-1 transition -rotate-45 group-hover:translate-x-full group-hover:-translate-y-full"
						fill
					/>
					<Image
						src="/images/arrow-right.svg"
						alt=">"
						className="object-cover p-1 transition -translate-x-full group-hover:translate-x-0"
						fill
					/>
				</div>
			</div>
		</Link>
	);
};

export default DashboardCard;
