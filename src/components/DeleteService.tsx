import { Button } from "./ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

interface Props {
    onConfirm: () => void;
}

const DeleteService = ({ onConfirm }: Props) => {

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					className="flex-1 py-3"
					size="lg"
					variant="destructive"
				>
					Delete
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you sure?</DialogTitle>
					<DialogDescription>
						Please confirm your action to delete this service.
					</DialogDescription>
				</DialogHeader>
				<hr />
				<div className="grid grid-cols-2 gap-3">
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
                    <Button onClick={onConfirm} variant="destructive">Confirm</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteService;
