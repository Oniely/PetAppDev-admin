import BreadCrumbs from "@/components/shared/BreadCrumbs";

const Inbox = () => {
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
			<section>Inbox</section>
		</>
	);
};

export default Inbox;
