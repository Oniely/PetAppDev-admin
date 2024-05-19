import { Search } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
	fn: () => void;
}

const SearchBar = () => {
	return (
		<div className="w-full border rounded-md flex items-center pl-3 mb-10 transition-all ease-in relative overflow-hidden bg-white">
			<Search size={20} color="#807a84" className="bg-transparent shrink-0" />
			<input
				className="h-10 flex-1 px-3 py-2 border-none outline-none text-sm disabled:opacity-50 peer"
				placeholder="Search..."
			/>
			<Button className="invisible scale-0 peer-focus-visible:visible peer-focus-visible:scale-100 transition-all absolute right-0 rounded-md" variant='ghost'>Search</Button>
		</div>
	);
};

export default SearchBar;
