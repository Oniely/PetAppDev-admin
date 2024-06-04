import InboxAccordion from "@/components/cards/InboxAccordion";
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import { fetchNotifications } from "@/lib/actions/notification.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs/server";

const Inbox = async () => {
	const user = await currentUser();
	const userData = await fetchUser(user?.id!);

	const todayNotifications =
		(await fetchNotifications({
			providerId: userData._id!,
			date: "Today",
		})) || [];
	const yesterdayNotifications =
		(await fetchNotifications({
			providerId: userData._id!,
			date: "Yesterday",
		})) || [];
	const otherDaysNotifications =
		(await fetchNotifications({
			providerId: userData._id!,
			date: "Other Days",
		})) || [];

	const breadCrumbs = [
		{
			name: "Inbox",
			href: "/inbox",
		},
	];

	return (
		<>
			<header className="header">
				<h1 className="head-text">Inbox</h1>
				<BreadCrumbs crumbs={breadCrumbs} />
			</header>
			<section className="flex flex-col gap-8">
				<InboxAccordion
					todayNotif={todayNotifications}
					yesterdayNotif={yesterdayNotifications}
					otherNotif={otherDaysNotifications}
				/>
			</section>
		</>
	);
};

export default Inbox;
