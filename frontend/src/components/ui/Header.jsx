// import { Link } from "react-router-dom";
// import { MdDarkMode, MdLightMode } from "react-icons/md";
// import { useTheme } from "../../context/ThemeContext";
// const Header = () => {
// 	return (
// 		<div className='mb-10'>
// 			<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center relative z-50 text-white pt-6'>
// 				Expense <Link to='/'>Tracker</Link>
// 			</h1>
// 			<div className='relative mb-10 w-1/2 mx-auto hidden md:block'>
// 				{/* Gradients */}
// 				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />
// 				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />
// 				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />
// 				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
// 			</div>
// 		</div>
// 	);
// };
// export default Header;

// import { Link } from "react-router-dom";




// const Header = () => {
// 	const { darkMode, setDarkMode } =
// 		useTheme();

// 	return (
// 		<div className='mb-4 relative'>
// 			{/* THEME BUTTON */}
// 			<div className='absolute right-8 top-4 z-50'>
// 				<button
// 					onClick={() =>
// 						setDarkMode(!darkMode)
// 					}
// 					className='bg-zinc-800 hover:bg-zinc-700 transition p-3 rounded-full text-white shadow-lg border border-zinc-700'
// 				>
// 					{darkMode ? (
// 						<MdLightMode size={22} />
// 					) : (
// 						<MdDarkMode size={22} />
// 					)}
// 				</button>
// 			</div>

// 			{/* TITLE */}
// 			<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center relative z-50 text-white pt-6'>
// 				Expense{" "}
// 				<Link
// 					to='/'
// 					className='text-pink-500'
// 				>
// 					Tracker
// 				</Link>
// 			</h1>

// 			{/* GLOW LINES */}
// 			<div className='relative mb-4 w-1/3 mx-auto hidden md:block'>
// 				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />

// 				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />

// 				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />

// 				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
// 			</div>
// 		</div>
// 	);
// };

// export default Header;

import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className='mb-4 relative'>
			{/* TITLE */}
			<h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-center relative z-50 text-white pt-6'>
				Expense{" "}
				<Link
					to='/'
					className='text-pink-500'
				>
					Tracker
				</Link>
			</h1>

			{/* GLOW LINES */}
			<div className='relative mb-4 w-1/3 mx-auto hidden md:block'>
				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm' />

				<div className='absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4' />

				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm' />

				<div className='absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4' />
			</div>
		</div>
	);
};

export default Header;