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
									href={`/appointment/${notif.appointment._id}`}
									message={notif.providerMessage}
									currentStatus={notif.status}
									serviceName={
										notif.appointment.service.serviceName
									}
								client_image_url={notif.notifier.image_url}
									client_name={`${notif.notifier.fname} ${notif.notifier.lname}`}
									date="March 14, 2024"
								/>
							))}

						{todayNotif.length < 1 && (
							<div className="flexCenter py-4">
								<p>No notifications here.</p>
							</div>
						)}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2">
					<AccordionTrigger>Yesterday</AccordionTrigger>
					<AccordionContent>
						{yesterdayNotif.length > 0 &&
							yesterdayNotif.map((notif, idx) => (
								<NotificationCard
									key={idx}
									href={`/appointment/${notif.appointment._id}`}
									message={notif.message}
									currentStatus={notif.status}
									serviceName={
										notif.appointment.service.serviceName
									}
									client_image_url={notif.notifier.image_url}
									client_name={`${notif.notifier.fname} ${notif.notifier.lname}`}
									date="March 14, 2024"
								/>
							))}

						{yesterdayNotif.length < 1 && (
							<div className="flexCenter py-4">
								<p>No notifications here.</p>
							</div>
						)}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-3">
					<AccordionTrigger>Other Day</AccordionTrigger>
					<AccordionContent>
						{otherNotif.length > 0 &&
							otherNotif.map((notif, idx) => (
								<NotificationCard
									key={idx}
									href={`/appointment/${notif.appointment._id}`}
									message={notif.message}
									currentStatus={notif.status}
									serviceName={
										notif.appointment.service.serviceName
									}
									client_image_url={notif.notifier.image_url}
									client_name={`${notif.notifier.fname} ${notif.notifier.lname}`}
									date="March 14, 2024"
								/>
							))}

						{otherNotif.length < 1 && (
							<div className="flexCenter py-4">
								<p>No notifications here.</p>
							</div>
						)}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export default InboxAccordion;
