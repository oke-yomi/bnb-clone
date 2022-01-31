import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SmallCard from "../components/SmallCard";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";

export default function Home({ exploreData, cardsData }) {
	return (
		<div className="">
			<Head>
				<title>Bnb Clone</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />
			<Hero />

			<main className="mx-auto max-w-7xl px-8 sm:px-16">
				<section className="pt-6">
					<h2 className="pb-5 text-4xl font-semibold">
						Explore Nearby Locations
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{exploreData?.map(({ img, location, distance }) => (
							<SmallCard
								key={img}
								image={img}
								location={location}
								distance={distance}
							/>
						))}
					</div>
				</section>

				<section>
					<h2 className="py-8 text-4xl font-semibold">Live Anywhere</h2>

					<div className="-ml-3 flex space-x-3 overflow-scroll p-3 scrollbar-hide">
						{cardsData?.map(({ img, title }) => (
							<MediumCard key={img} img={img} title={title} />
						))}
					</div>
				</section>

				<LargeCard
					img="https://links.papareact.com/4cj"
					title="The Greatest Outdoors"
					description="Wishlists Curated by Bnb Clone"
					buttonText="Get Inspired"
				/>
			</main>

      <Footer />
		</div>
	);
}

export async function getStaticProps() {
	const exploreData = await fetch("https://links.papareact.com/pyp").then(
		(res) => res.json()
	);

	const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
		res.json()
	);

	return {
		props: {
			exploreData,
			cardsData,
		},
	};
}
