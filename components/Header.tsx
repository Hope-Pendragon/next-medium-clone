import Link from "next/link";

function Header() {
	const styles = ["items-center space-x-5"];
	return (
		<header className="flex justify-between p-5 max-w-7xl mx-auto">
			<div className={`flex ${styles[0]}`}>
				<Link href="/">
					<img
						className="w-44 object-contain cursor-pointer"
						src="https://links.papareact.com/yvf"
					></img>
				</Link>
				<div className={`hidden md:inline-flex ${styles[0]}`}>
					<h3>About</h3>
					<h3>Contact</h3>
					<h3 className="text-white bg-green-600 px-4 py-1 rounded-full">
						Follow
					</h3>
				</div>
			</div>
			<div className="flex items-center space-x-5 text-green-600">
				<h3>Sign-in</h3>
				<h3 className="border px-4 py-1 rounded-full border-green-600">
					Get Started
				</h3>
			</div>
		</header>
	);
}

export default Header;
