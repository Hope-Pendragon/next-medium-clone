function Banner() {
	return (
		<div className="flex justify-between items-center bg-yellow-400 border-y border-black p-10 lg:p-0">
			<div className="px-10 space-y-5">
				<h1 className="text-6xl max-w-xl font-serif">
					<span className="underline decoration-black decoration-4">
						Medium
					</span>{" "}
					is a place to read, write, and connect.
				</h1>
				<h2 className="max-w-xl">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua.
				</h2>
			</div>
			<img
				className="hidden md:inline-flex h-32 lg:h-full"
				src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
				alt=""
			/>
		</div>
	);
}

export default Banner;
