import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import NotificationCard from "./NotificationCard";

const InboxAccordion = () => {
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
						<NotificationCard
							href="/"
							message="Notification message goes here..."
							currentStatus="Confirmed"
							serviceName="F1 Service"
							client_image_url="https://utfs.io/f/2948740a-791d-482f-8a54-939e1aaf4763-jifsha.png"
							client_name="Oniel Gencaya"
							date="March 14, 2024"
						/>
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
