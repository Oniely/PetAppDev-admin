import { Search } from "lucide-react";
import { Button } from "../ui/button";

const SearchBar = () => {
	return (
		<div className="w-1/3 border rounded-md flex items-center pl-3 mb-10 transition-all ease-in relative">
			<Search size={20} color="#807a84" />
			<input
				className="h-10 flex-1 px-3 py-2 border-none outline-none text-sm disabled:opacity-50 peer"
				placeholder="Search..."
			/>
			<Button className="invisible scale-0 peer-focus-visible:visible peer-focus-visible:scale-100 transition-all absolute right-0 rounded-md" variant='ghost'>Search</Button>
		</div>
	);
};

export default SearchBar;
