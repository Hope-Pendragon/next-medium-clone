import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { SanityPost } from "../typings";
import { useState } from "react";

function Form(post: SanityPost) {
	const [submitted, setSubmitted] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		console.log(data);
		await fetch("/api/createComment", {
			method: "POST",
			body: JSON.stringify(data),
		})
			.then(() => {
				console.log(data);
				setSubmitted(true);
			})
			.catch((err) => {
				console.log(err);
				setSubmitted(false);
			});
	};

	return submitted ? (
		<div className="flex flex-col px-10 pt-4 pb-8 my-12 max-w-2xl mx-auto bg-neutral-900 text-white rounded border-2 border-neutral-900 shadow">
			<h3 className="text-3xl pt-2 font-bold">
				Your comment has been submitted!
			</h3>
			<p className="mt-4 -mx-10 px-10 text-base font-semibold italic bg-neutral-900">
				Once it has been approved your comment will show up in the
				comment section for this article.
			</p>
		</div>
	) : (
		<form
			className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
			<h4 className="text-3xl font-bold">Leave a comment below!</h4>

			<hr className="py-3 mt-2" />

			<input
				{...register("_id")}
				type="hidden"
				name="_id"
				value={post._id}
			/>
			<label className="block mb-5" htmlFor="name">
				<span className="text-gray-700">Name</span>
				<input
					{...register("name", { required: true })}
					className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
					type="text"
					name="name"
					id="name"
					placeholder=""
				/>
			</label>
			<label className="block mb-5" htmlFor="email">
				<span className="text-gray-700">Email</span>
				<input
					{...register("email", { required: true })}
					className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
					type="email"
					name="email"
					id="email"
					placeholder=""
				/>
			</label>
			<label className="block mb-5" htmlFor="comment">
				<span className="text-gray-700">Comment</span>
				<textarea
					{...register("comment", { required: true })}
					className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
					name="comment"
					id=""
					cols={30}
					rows={8}
				></textarea>
			</label>

			<div className="flex flex-col p-5">
				{errors.name && (
					<span className="text-red-500">
						The Name Field is required.
					</span>
				)}
				{errors.email && (
					<span className="text-red-500">
						The Email Field is required.
					</span>
				)}
				{errors.comment && (
					<span className="text-red-500">
						The Comment Field is required.
					</span>
				)}
			</div>

			<input
				className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
				type="submit"
				value="Submit"
			/>
		</form>
	);
}

export default Form;
