import Image from "next/image";
import Logo from "../images/logo.png";
import {
	SearchIcon,
	MenuIcon,
	UserCircleIcon,
	GlobeAltIcon,
	UsersIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";

const Header = () => {
	const [searchInput, setSearchInput] = useState("");
	const [startDate, setStartDate] = useState(new Date());
	const [endDate, setEndDate] = useState(new Date());
	const [noOfGuests, setNoOfGuests] = useState(1);
	const router = useRouter();

	const handleSelect = (ranges) => {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};

	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: "selection",
	};

	const resetInput = () => {
		setSearchInput("");
	};

	const search = () => {
		router.push({
			pathname: "/search",
			query: {
				location: searchInput,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				noOfGuests,
			},
		});
	};

	return (
		<header className="sticky top-0 z-50 grid grid-cols-3 bg-white p-5 shadow-md md:px-10">
			{/* left */}
			<div
				onClick={() => router.push("/")}
				className="relative my-auto flex h-10 cursor-pointer items-center">
				<Image
					src={Logo}
					layout="fill"
					objectFit="contain"
          objectPosition="left"
          priority
				/>
			</div>

			{/* Middle */}
			<div className="flex items-center rounded-full p-2 md:border-2 md:shadow-sm">
				<input
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					className="flex-grow bg-transparent pl-3 text-sm text-gray-600 placeholder-gray-400 outline-none"
					type="text"
					placeholder="Start your search"
				/>
				<SearchIcon className="hidden h-8 cursor-pointer rounded-full bg-red-400 p-2 text-white md:ml-2 md:inline-flex" />
			</div>

			{/* right */}
			<div className="flex items-center justify-end space-x-4 text-gray-500">
				<p className="hidden cursor-pointer md:inline">Become a host</p>
				<GlobeAltIcon className="h-6 cursor-pointer" />

				<div className="flex items-center space-x-2 rounded-full border-2">
					<MenuIcon className="h-6" />
					<UserCircleIcon className="h-6" />
				</div>
			</div>

			{searchInput && (
				<div className="col-span-3 mx-auto mt-2 flex flex-col">
					<DateRangePicker
						ranges={[selectionRange]}
						minDate={new Date()}
						rangeColors={["#fd5b61"]}
						onChange={handleSelect}
					/>

					<div className="mb-4 flex items-center border-b">
						<h2 className="flex-grow text-2xl font-semibold">
							Number of Guests
						</h2>

						<UsersIcon className="h-5" />
						<input
							value={noOfGuests}
							onChange={(e) => setNoOfGuests(e.target.value)}
							type="number"
							min={1}
							className="w-12 pl-2 text-lg text-red-400 outline-none"
						/>
					</div>

					<div className="flex">
						<button onClick={resetInput} className="flex-grow text-gray-500">
							Cancel
						</button>
						<button onClick={search} className="flex-grow text-red-400">
							Search
						</button>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
