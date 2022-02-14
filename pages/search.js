import { useRouter } from "next/router";
import Layout from "../components/Layout";
import InfoCard from "../components/InfoCard";
// import Mapbox from "../components/Mapbox";
import { format } from "date-fns";

function Search({searchResults}) {
	const router = useRouter();

	const { location, startDate, endDate, noOfGuests } = router.query;

	const formattedStartDate = format(new Date(startDate), "dd MMM yy");
	const formattedEndDate = format(new Date(endDate), "dd MMM yy");
	const range = `${formattedStartDate} - ${formattedEndDate}`;

	return (
		<Layout>
			<main className="flex">
				<section className="flex-grow px-6 pt-14">
					<p className="text-xs">
						300+ Stays - {range} - for {noOfGuests} guests
					</p>
					<h1 className="mt-2 mb-6 text-3xl font-semibold">
						Stays in {location}
					</h1>

					<div className="mb-5 hidden space-x-3 whitespace-nowrap text-gray-800 lg:inline-flex">
						<p className="button">Cancellation Flexibility</p>
						<p className="button">Type of place</p>
						<p className="button">Price</p>
						<p className="button">Rooms and Beds</p>
						<p className="button">More filters</p>
					</div>

					<div className="flex flex-col">
						{searchResults.map(
							({ img, location, title, description, star, price, total }) => (
								<InfoCard
									key={img}
									img={img}
									location={location}
									title={title}
									description={description}
									star={star}
									price={price}
									total={total}
								/>
							)
						)}
					</div>
				</section>

				{/* <section className='hidden xl:inline-flex xl:min-w-[600px]'>
					<Mapbox searchResults={searchResults} />
				</section> */}
			</main>
		</Layout>
	);
}

export default Search;

export async function getServerSideProps() {
	const searchResults = await fetch("https://links.papareact.com/isz").then(
		(res) => res.json()
	);

	return {
		props: {
			searchResults,
		},
	};
}
