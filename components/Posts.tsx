import Post from "./Post";

import { SanityPost } from "../typings";

interface Props {
	posts: [SanityPost];
}

function Posts({ posts }: Props) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 lg:p-6">
			{posts.map((post) => {
				return <Post post={post} />;
			})}
		</div>
	);
}

export default Posts;
