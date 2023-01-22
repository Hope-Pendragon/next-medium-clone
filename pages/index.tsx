import Head from "next/head";

import Header from "../components/Header";
import Banner from "../components/Banner";
import Posts from "../components/Posts";

import { getPostsData, sanityClient } from "../sanity";

import { SanityPost } from "../typings";

interface Props {
	posts: [SanityPost];
}

export async function getServerSideProps() {
	const query = getPostsData;

	const posts = await sanityClient.fetch(query);

	return {
		props: {
			posts,
		},
	};
}

export default function Home(props: Props) {
	return (
		<div className="max-w-7xl mx-auto">
			<Head>
				<title>Medium Blog</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header />

			<Banner />

			<Posts {...props} />
		</div>
	);
}
