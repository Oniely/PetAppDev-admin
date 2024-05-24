import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { SignOutButton } from "@clerk/nextjs";

interface Props {
	children: React.ReactNode;
	asChild?: boolean;
}

const LogoutDialog = ({ children, asChild = false }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild={asChild}>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>
						Please confirm your action to logout.
					</DialogDescription>
				</DialogHeader>
				<hr />
				<div className="grid grid-cols-2 gap-4">
					<DialogClose asChild>
						<Button variant="outline">No</Button>
					</DialogClose>
					<SignOutButton redirectUrl="/sign-in">
						<Button>Yes</Button>
					</SignOutButton>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default LogoutDialog;
