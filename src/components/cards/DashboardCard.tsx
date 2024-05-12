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
		<Link href={href} className="relative">
			<div
				className={`${className} flex items-center gap-3 px-4 max-lg:px-6 h-[10rem] max-lg:h-[8rem] min-w-fit rounded-xl cursor-pointer group shadow-sm`}
			>
				<div className="w-[4.5rem] h-[4.5rem] relative bg-black/10 rounded-full shrink-0">
					<Image
						src={image_url}
						alt="calendar"
						className="object-cover p-5"
						fill
					/>
				</div>
				<div className="flex flex-col leading-6">
					<h2 className="font-medium">{title}</h2>
					<p className="text-xl font-semibold">{data}</p>
					<p className="leading-normal"></p>
				</div>

				<div className="absolute w-8 h-8 overflow-hidden transition-all bg-white rounded-full top-3 right-3 ease">
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
