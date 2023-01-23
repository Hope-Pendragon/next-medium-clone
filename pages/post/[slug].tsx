import Header from "../../components/Header";
import Form from "../../components/Form";
import CommentsSection from "../../components/CommentsSection";

import {
	getPostBySlug,
	getPostsPaths,
	getApprovedCommentsForOneArticle,
	sanityClient,
	urlFor,
} from "../../sanity";
import { PortableText } from "@portabletext/react";

import { SanityComment, SanityPost } from "../../typings";
import { ReactElement } from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

interface Props {
	post: SanityPost;
	comments: SanityComment[];
}

export async function getStaticPaths() {
	const query = getPostsPaths;

	const posts = await sanityClient.fetch(query);

	const paths = posts.map((post: SanityPost) => ({
		params: {
			slug: post.slug.current,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
}

export async function getStaticProps({ params }: Params) {
	const queries = [getPostBySlug, getApprovedCommentsForOneArticle];

	const post: SanityPost = await sanityClient.fetch(queries[0], {
		slug: params?.slug,
	});

	const comments: SanityComment[] = await sanityClient.fetch(queries[1], {
		_ref: post._id,
	});

	if (post && comments) {
		return {
			props: {
				post,
				comments,
			},
			revalidate: 3600 /*s*/,
		};
	} else if (post) {
		return {
			props: {
				post,
				comments: { notFound: true },
			},
			revalidate: 3600 /*s*/,
		};
	} else {
		return {
			notFound: true,
		};
	}
}

interface Props {
	post: SanityPost;
	comments: SanityComment[];
}

function PostPage({ post, comments }: Props) {
	const { title, description, mainImage } = post;

	return (
		<main>
			<Header />

			<img
				className="w-full h-40 object-cover "
				src={urlFor(mainImage.asset._ref).url()}
				alt=""
			/>

			<article className="max-w-3xl mx-auto p-5">
				<h1 className="text-3xl mt-10 mb-3">{title}</h1>

				<h2 className="text-xl font-light text-gray-500 mb-5">
					{description}
				</h2>

				<Author {...post} />

				<Body {...post} />
			</article>

			<hr className="mx-w-lg my-5 mx-auto border border-yellow-500" />

			<Form {...post} />

			<hr className="mx-w-lg my-5 mx-auto border border-yellow-500" />

			<CommentsSection comments={comments} />
		</main>
	);
}

export default PostPage;

export function Author({
	author,
	_createdAt,
	publishedAt,
}: SanityPost): ReactElement {
	const publishDate = getPublishDate(publishedAt, _createdAt);
	const publishTime = getPublishTime(publishedAt, _createdAt);

	return (
		<div className="flex items-center space-x-2">
			<img
				className="w-10 h-10 rounded-full"
				src={urlFor(author.image.asset._ref).url()}
				alt=""
			/>
			<p className="text-sm font-extralight">
				by <span className="text-green-600">{author.name}</span> —{" "}
				{`Published on ${publishDate} at ${publishTime}`}
			</p>
		</div>
	);
}

export function Body({ body }: SanityPost): ReactElement {
	return (
		<div className="mt-5 mb-3">
			<PortableText value={body} components={myPortableTextComponents} />
		</div>
	);
}

export const myPortableTextComponents = {
	block: {
		h1: ({ children }: any) => (
			<h1 className="text-2xl py-2">{children}</h1>
		),
		normal: ({ children }: any) => (
			<>
				<span className="">{children}</span>
				<br></br>
			</>
		),
		blockquote: ({ children }: any) => (
			<blockquote className="border-l-purple-500">{children}</blockquote>
		),
		customHeading: ({ children }: any) => (
			<h2 className="text-lg text-primary text-purple-700">{children}</h2>
		),
	},
};

export function getPublishDate(
	publishedAt: string,
	_createdAt: string
): string {
	return publishedAt
		? new Date(publishedAt).toLocaleDateString()
		: new Date(_createdAt).toLocaleDateString();
}

export function getPublishTime(
	publishedAt: string,
	_createdAt: string
): string {
	return publishedAt
		? new Date(publishedAt).toLocaleTimeString()
		: new Date(_createdAt).toLocaleTimeString();
}
