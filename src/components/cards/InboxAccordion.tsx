import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import NotificationCard from "./NotificationCard";

interface Props {
	todayNotif: any[];
	yesterdayNotif: any[];
	otherNotif: any[];
}

const InboxAccordion = ({ todayNotif, yesterdayNotif, otherNotif }: Props) => {
	return (
		<>
			<header className="flex items-center justify-between gap-8 bg-[#f1f1f1] pr-20 text-sm -mb-8">
				<p>Status & Message</p>
				<div className="flex items-center gap-6">
					<p>Service</p>
					<span className="-mx-2">-</span>
					<p>Client</p>
					<p className="ml-24">Date</p>
				</div>
			</header>
			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="item-1">
					<AccordionTrigger>Today</AccordionTrigger>
					<AccordionContent>
						{todayNotif.length > 0 &&
							todayNotif.map((notif, idx) => (
								<NotificationCard
									key={idx}
									href={`/appointment`}
									message={notif.message}
									currentStatus={notif.status}
									serviceName={notif.appointment.service.serviceName}
									client_image_url={notif.notifier.image_url}
									client_name={`${notif.notifier.fname} ${notif.notifier.lname}`}
									date="March 14, 2024"
								/>
							))}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Yesterday</AccordionTrigger>
					<AccordionContent>
						Yes. It comes with default styles that matches the other
						components&apos; aesthetic.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Other Day</AccordionTrigger>
					<AccordionContent>
						Yes. It&apos;s animated by default, but you can disable
						it if you prefer.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export default InboxAccordion;
