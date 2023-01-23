import { SanityComment } from "../typings";

interface Props {
	comments: SanityComment[];
}

function CommentsSection({ comments }: Props) {
	return (
		<div className="flex flex-col max-h-screen h-fit overflow-y-auto max-w-2xl mx-auto my-10 px-10 py-6 rounded bg-teal-500 shadow">
			<h2 className="text-3xl text-white font-bold">Comments</h2>

			<hr className="py-3 mt-4" />

			{comments.map((comment) => {
				return <Comment key={comment._id} {...comment} />;
			})}
		</div>
	);
}

export default CommentsSection;

export function Comment({ comment, name, _createdAt }: SanityComment) {
	const commentDate = new Date(_createdAt);
	const dateCommented = commentDate.toLocaleString();

	return (
		<div className="border p-5  bg-white border-white mb-5 rounded">
			<div className="pb-3 flex justify-between items-center">
				<div className="text-lg font-semibold truncate w-4/6">
					{name}
				</div>

				<div className="text-sm italic">{dateCommented}</div>
			</div>

			<div className="border bg-neutral-200 p-5 h-fit">{comment}</div>
		</div>
	);
}
