import Link from "next/link";

interface Props {
	name: string;
	type: string;
	date: string;
	time: string;
	customer: string;
	status: "Pending" | "Confirmed";
	href: string;
}

const UpcomingCard = ({ name, type, date, time, customer, status, href }: Props) => {
	return (
		<Link href={href}>
            <div className="bg-white h-[12rem] rounded-xl shadow-md p-4 flex flex-col justify-between overflow-hidden">
                <div className="space-y-3">
                    <div
                        className={`px-2 border-l-2 max-sm:px-1 ${
                            status === "Confirmed"
                                ? "border-l-green-400"
                                : "border-l-main-orange"
                        }`}
                    >
                        <h1 className="max-md:text-lg text-2xl font-semibold truncate w-[90%]">
                            {name}
                        </h1>
                        <div className="flex justify-start">
                            <div className="px-3 py-1 text-xs text-center bg-gray-200 rounded-full max-sm:px-1 max-sm:scale-90 font-medium w-[6rem] truncate">
                                {type}
                            </div>
                        </div>
                    </div>
                    <div className="text-sm font-medium">
                        <p className="text-gray-600 ">Date & Time</p>
                        <p className="font-semibold">
                            {date}, {time}
                        </p>
                    </div>
                </div>
                <div className="flexBetween max-sm:items-start max-sm:flex-col">
                    <div className="text-sm font-medium truncate w-[90%]">
                        {customer}
                    </div>
                    <div
                        className={`px-3 py-1 text-xs font-medium text-center rounded-full ${
                            status === "Confirmed"
                                ? "bg-green-400"
                                : "bg-main-orange"
                        }`}
                    >
                        {status}
                    </div>
                </div>
            </div>
        </Link>
	);
};

export default UpcomingCard;
