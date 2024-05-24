"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
	const [input, setInput] = useState("");
	const router = useRouter();

	const handleSubmit = (e: any) => {
		e.preventDefault();

		router.push(`/services?page=1&search=${input}`);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full border rounded-md flex items-center pl-3 mb-10 transition-all ease-in relative overflow-hidden bg-white"
		>
			<Search
				size={20}
				color="#807a84"
				className="bg-transparent shrink-0"
			/>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				className="h-10 flex-1 px-3 py-2 border-none outline-none text-sm disabled:opacity-50 peer"
				placeholder="Search..."
			/>
			<Button
				type="submit"
				className="invisible scale-50 peer-focus-visible:visible peer-focus-visible:scale-100 transition-all absolute right-0 rounded-md"
				variant="ghost"
				onMouseDown={handleSubmit}
			>
				Search
			</Button>
		</form>
	);
};

export default SearchBar;
