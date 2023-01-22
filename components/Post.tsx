import Link from "next/link";

import { urlFor } from "../sanity";

import { SanityPost } from "../typings";

interface Props {
	post: SanityPost;
}

export function Post({ post }: Props) {
	const { _id, title, description, author, mainImage, slug } = post;

	return (
		<Link key={_id} href={`/post/${slug.current}`}>
			<div className="group border rounded-lg overflow-hidden cursor-pointer ">
				<img
					className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
					src={urlFor(mainImage.asset._ref).url()}
					alt=""
				/>

				<div className="h-38 p-5 flex flex-col  bg-white">
					<div>
						<p className="h-14 py-1 leading-6 text-lg font-bold">
							{title}
						</p>
					</div>

					<div className="my-auto space-x-5 flex justify-start items-center">
						<div className="">
							<p className="my-1 text-sm text-gray-900">
								{description}
							</p>
							<p className="my-1 text-xs text-gray-500">
								by {author.name}
							</p>
						</div>

						<img
							className="w-12 h-12 rounded-full self-center"
							src={urlFor(author.image.asset._ref).url()}
							alt=""
						/>
					</div>
				</div>
			</div>
		</Link>
	);
}

export default Post;
