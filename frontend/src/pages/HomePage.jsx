// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import SearchFilters from "../components/ui/SearchFilters";
// import Cards from "../components/Cards";
// import TransactionForm from "../components/TransactionForm";

// import { MdLogout } from "react-icons/md";
// import toast from "react-hot-toast";
// import { useMutation, useQuery } from "@apollo/client";
// import { LOGOUT } from "../graphql/mutations/user.mutation";
// import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
// import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
// import { useEffect, useState } from "react";

// // const chartData = {
// // 	labels: ["Saving", "Expense", "Investment"],
// // 	datasets: [
// // 		{
// // 			label: "%",
// // 			data: [13, 8, 3],
// // 			backgroundColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235)"],
// // 			borderColor: ["rgba(75, 192, 192)", "rgba(255, 99, 132)", "rgba(54, 162, 235, 1)"],
// // 			borderWidth: 1,
// // 			borderRadius: 30,
// // 			spacing: 10,
// // 			cutout: 130,
// // 		},
// // 	],
// // };

// ChartJS.register(ArcElement, Tooltip, Legend);

// const HomePage = () => {
// 	const { data } = useQuery(GET_TRANSACTION_STATISTICS);
// 	const { data: authUserData } = useQuery(GET_AUTHENTICATED_USER);

// 	const [logout, { loading, client }] = useMutation(LOGOUT, {
// 		refetchQueries: ["GetAuthenticatedUser"],
// 	});

// 	const [chartData, setChartData] = useState({
// 		labels: [],
// 		datasets: [
// 			{
// 				label: "$",
// 				data: [],
// 				backgroundColor: [],
// 				borderColor: [],
// 				borderWidth: 1,
// 				borderRadius: 30,
// 				spacing: 10,
// 				cutout: 130,
// 			},
// 		],
// 	});

// 	useEffect(() => {
// 		if (data?.categoryStatistics) {
// 			const categories = data.categoryStatistics.map((stat) => stat.category);
// 			const totalAmounts = data.categoryStatistics.map((stat) => stat.totalAmount);

// 			const backgroundColors = [];
// 			const borderColors = [];

// 			categories.forEach((category) => {
// 				if (category === "saving") {
// 					backgroundColors.push("rgba(75, 192, 192)");
// 					borderColors.push("rgba(75, 192, 192)");
// 				} else if (category === "expense") {
// 					backgroundColors.push("rgba(255, 99, 132)");
// 					borderColors.push("rgba(255, 99, 132)");
// 				} else if (category === "investment") {
// 					backgroundColors.push("rgba(54, 162, 235)");
// 					borderColors.push("rgba(54, 162, 235)");
// 				}
// 			});

// 			setChartData((prev) => ({
// 				labels: categories,
// 				datasets: [
// 					{
// 						...prev.datasets[0],
// 						data: totalAmounts,
// 						backgroundColor: backgroundColors,
// 						borderColor: borderColors,
// 					},
// 				],
// 			}));
// 		}
// 	}, [data]);

// 	const handleLogout = async () => {
// 		try {
// 			await logout();
// 			// Clear the Apollo Client cache FROM THE DOCS
// 			// https://www.apollographql.com/docs/react/caching/advanced-topics/#:~:text=Resetting%20the%20cache,any%20of%20your%20active%20queries
// 			client.resetStore();
// 		} catch (error) {
// 			console.error("Error logging out:", error);
// 			toast.error(error.message);
// 		}
// 	};

// 	return (
// 		<>
// 			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
// 				<div className='flex items-center'>
// 					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
// 						Spend wisely, track wisely
// 					</p>
// 					<img
// 						src={authUserData?.authUser.profilePicture}
// 						className='w-11 h-11 rounded-full border cursor-pointer'
// 						alt='Avatar'
// 					/>
// 					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
// 					{/* loading spinner */}
// 					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
// 				</div>
// 				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
// 					{data?.categoryStatistics.length > 0 && (
// 						<div className='h-[330px] w-[330px] md:h-[360px] md:w-[360px]  '>
// 							<Doughnut data={chartData} />
// 						</div>
// 					)}

// 					<TransactionForm />
// 				</div>
// 				<Cards />
// 			</div>
// 		</>
// 	);
// };
// export default HomePage;

// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// import SearchFilters from "../components/ui/SearchFilters";
// import Cards from "../components/Cards";
// import TransactionForm from "../components/TransactionForm";

// import { MdLogout } from "react-icons/md";
// import toast from "react-hot-toast";

// import { useMutation, useQuery } from "@apollo/client";

// import { LOGOUT } from "../graphql/mutations/user.mutation";

// import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";

// import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

// import { useEffect, useState } from "react";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const HomePage = () => {
// 	const { data } = useQuery(GET_TRANSACTION_STATISTICS);

// 	const { data: authUserData } = useQuery(
// 		GET_AUTHENTICATED_USER
// 	);

// 	// FILTERS STATE
// 	const [filters, setFilters] = useState({
// 		search: "",
// 		category: "",
// 		type: "",
// 	});

// 	const [logout, { loading, client }] = useMutation(
// 		LOGOUT,
// 		{
// 			refetchQueries: ["GetAuthenticatedUser"],
// 		}
// 	);

// 	const [chartData, setChartData] = useState({
// 		labels: [],
// 		datasets: [
// 			{
// 				label: "$",
// 				data: [],
// 				backgroundColor: [],
// 				borderColor: [],
// 				borderWidth: 1,
// 				borderRadius: 30,
// 				spacing: 10,
// 				cutout: 130,
// 			},
// 		],
// 	});

// 	useEffect(() => {
// 		if (data?.categoryStatistics) {
// 			const categories =
// 				data.categoryStatistics.map(
// 					(stat) => stat.category
// 				);

// 			const totalAmounts =
// 				data.categoryStatistics.map(
// 					(stat) => stat.totalAmount
// 				);

// 			const backgroundColors = [];
// 			const borderColors = [];

// 			categories.forEach((category) => {
// 				if (category === "salary") {
// 					backgroundColors.push(
// 						"rgba(34,197,94)"
// 					);
// 					borderColors.push(
// 						"rgba(34,197,94)"
// 					);
// 				} else if (category === "food") {
// 					backgroundColors.push(
// 						"rgba(255,99,132)"
// 					);
// 					borderColors.push(
// 						"rgba(255,99,132)"
// 					);
// 				} else if (category === "investment") {
// 					backgroundColors.push(
// 						"rgba(59,130,246)"
// 					);
// 					borderColors.push(
// 						"rgba(59,130,246)"
// 					);
// 				} else {
// 					backgroundColors.push(
// 						"rgba(168,85,247)"
// 					);
// 					borderColors.push(
// 						"rgba(168,85,247)"
// 					);
// 				}
// 			});

// 			setChartData((prev) => ({
// 				labels: categories,
// 				datasets: [
// 					{
// 						...prev.datasets[0],
// 						data: totalAmounts,
// 						backgroundColor:
// 							backgroundColors,
// 						borderColor: borderColors,
// 					},
// 				],
// 			}));
// 		}
// 	}, [data]);

// 	const handleLogout = async () => {
// 		try {
// 			await logout();

// 			client.resetStore();
// 		} catch (error) {
// 			console.error(
// 				"Error logging out:",
// 				error
// 			);

// 			toast.error(error.message);
// 		}
// 	};

// 	return (
// 		<div className='min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-6 py-10'>
// 			{/* HEADER */}
// 			<div className='flex items-center justify-between mb-10'>
// 				<div>
// 					<h1 className='text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text'>
// 						Expense Tracker Dashboard
// 					</h1>

// 					<p className='text-zinc-400 mt-2'>
// 						Track your finances smarter
// 					</p>
// 				</div>

// 				<div className='flex items-center gap-4'>
// 					<img
// 						src={
// 							authUserData?.authUser
// 								.profilePicture
// 						}
// 						className='w-12 h-12 rounded-full border-2 border-pink-500'
// 						alt='Avatar'
// 					/>

// 					{!loading && (
// 						<MdLogout
// 							className='w-6 h-6 cursor-pointer hover:text-pink-500 transition'
// 							onClick={handleLogout}
// 						/>
// 					)}

// 					{loading && (
// 						<div className='w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin'></div>
// 					)}
// 				</div>
// 			</div>

// 			{/* STATS CARDS */}
// 			<div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-10'>
// 				<div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-800'>
// 					<p className='text-zinc-400'>
// 						Transactions
// 					</p>

// 					<h2 className='text-3xl font-bold mt-2'>
// 						{
// 							data?.categoryStatistics
// 								?.length
// 						}
// 					</h2>
// 				</div>

// 				<div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-800'>
// 					<p className='text-zinc-400'>
// 						Categories
// 					</p>

// 					<h2 className='text-3xl font-bold mt-2 text-pink-500'>
// 						{
// 							data?.categoryStatistics
// 								?.length
// 						}
// 					</h2>
// 				</div>

// 				<div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-800'>
// 					<p className='text-zinc-400'>
// 						Analytics
// 					</p>

// 					<h2 className='text-3xl font-bold mt-2 text-green-400'>
// 						Live
// 					</h2>
// 				</div>

// 				<div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-800'>
// 					<p className='text-zinc-400'>
// 						Status
// 					</p>

// 					<h2 className='text-3xl font-bold mt-2 text-blue-400'>
// 						Active
// 					</h2>
// 				</div>
// 			</div>

// 			{/* CHART + FORM */}
// 			<div className='flex flex-wrap justify-center items-center gap-10 mb-10'>
// 				{data?.categoryStatistics
// 					?.length > 0 && (
// 					<div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-800'>
// 						<div className='h-[330px] w-[330px]'>
// 							<Doughnut
// 								data={chartData}
// 							/>
// 						</div>
// 					</div>
// 				)}

// 				<div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-800'>
// 					<TransactionForm />
// 				</div>
// 			</div>

// 			{/* SEARCH + FILTERS */}
// 			<SearchFilters onFilter={setFilters} />

// 			{/* TRANSACTION CARDS */}
// 			<Cards filters={filters} />
// 		</div>
// 	);
// };

// export default HomePage;

// import { Doughnut } from "react-chartjs-2";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import AIInsights from "../components/AIInsights";
// import SearchFilters from "../components/ui/SearchFilters";
// import Cards from "../components/Cards";
// import TransactionForm from "../components/TransactionForm";
// import NotificationPanel from "../components/NotificationPanel";
// import { MdLogout } from "react-icons/md";
// import toast from "react-hot-toast";

// import { useMutation, useQuery } from "@apollo/client";

// import { LOGOUT } from "../graphql/mutations/user.mutation";

// // import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";
// import {
// 	GET_TRANSACTION_STATISTICS,
// 	GET_TRANSACTIONS,
// } from "../graphql/queries/transaction.query";

// import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

// import { useEffect, useState } from "react";

// ChartJS.register(ArcElement, Tooltip, Legend);

// const HomePage = () => {
// 	const { data } = useQuery(GET_TRANSACTION_STATISTICS);
// 	const { data: transactionData } =
// 	useQuery(GET_TRANSACTIONS);

// 	const { data: authUserData } = useQuery(
// 		GET_AUTHENTICATED_USER
// 	);

// 	// FILTERS STATE
// 	const [filters, setFilters] = useState({
// 		search: "",
// 		category: "",
// 		type: "",
// 	});

// 	const [logout, { loading, client }] = useMutation(
// 		LOGOUT,
// 		{
// 			refetchQueries: ["GetAuthenticatedUser"],
// 		}
// 	);

// 	const [chartData, setChartData] = useState({
// 		labels: [],
// 		datasets: [
// 			{
// 				label: "$",
// 				data: [],
// 				backgroundColor: [],
// 				borderColor: [],
// 				borderWidth: 1,
// 				borderRadius: 30,
// 				spacing: 10,
// 				cutout: 130,
// 			},
// 		],
// 	});

// 	useEffect(() => {
// 		if (data?.categoryStatistics) {
// 			const categories =
// 				data.categoryStatistics.map(
// 					(stat) => stat.category
// 				);

// 			const totalAmounts =
// 				data.categoryStatistics.map(
// 					(stat) => stat.totalAmount
// 				);

// 			const backgroundColors = [];
// 			const borderColors = [];

// 			categories.forEach((category) => {
// 				if (category === "salary") {
// 					backgroundColors.push(
// 						"rgba(34,197,94)"
// 					);
// 					borderColors.push(
// 						"rgba(34,197,94)"
// 					);
// 				} else if (category === "food") {
// 					backgroundColors.push(
// 						"rgba(255,99,132)"
// 					);
// 					borderColors.push(
// 						"rgba(255,99,132)"
// 					);
// 				} else if (category === "investment") {
// 					backgroundColors.push(
// 						"rgba(59,130,246)"
// 					);
// 					borderColors.push(
// 						"rgba(59,130,246)"
// 					);
// 				} else {
// 					backgroundColors.push(
// 						"rgba(168,85,247)"
// 					);
// 					borderColors.push(
// 						"rgba(168,85,247)"
// 					);
// 				}
// 			});

// 			setChartData((prev) => ({
// 				labels: categories,
// 				datasets: [
// 					{
// 						...prev.datasets[0],
// 						data: totalAmounts,
// 						backgroundColor:
// 							backgroundColors,
// 						borderColor: borderColors,
// 					},
// 				],
// 			}));
// 		}
// 	}, [data]);

// 	const handleLogout = async () => {
// 		try {
// 			await logout();

// 			client.resetStore();
// 		} catch (error) {
// 			console.error(
// 				"Error logging out:",
// 				error
// 			);

// 			toast.error(error.message);
// 		}
// 	};

// 	return (
// 		<div className='min-h-screen w-full bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-8 py-10 relative z-20 -mt-16 rounded-t-[40px] border-t border-zinc-800'>
// 			<div className='max-w-[1800px] mx-auto'>
// 				{/* HEADER */}
// 				<div className='flex items-center justify-between mb-12'>
// 					<div>
// 						<h1 className='text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text'>
// 							Expense Tracker Dashboard
// 						</h1>

// 						<p className='text-zinc-400 mt-3 text-lg'>
// 							Track your finances smarter
// 						</p>
// 					</div>

// 					<div className='flex items-center gap-5'>
// 						<img
// 							src={
// 								authUserData?.authUser
// 									.profilePicture
// 							}
// 							className='w-14 h-14 rounded-full border-2 border-pink-500 shadow-lg'
// 							alt='Avatar'
// 						/>

// 						{!loading && (
// 							<MdLogout
// 								className='w-7 h-7 cursor-pointer hover:text-pink-500 transition'
// 								onClick={
// 									handleLogout
// 								}
// 							/>
// 						)}

// 						{loading && (
// 							<div className='w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin'></div>
// 						)}
// 					</div>
// 				</div>

// 				{/* STATS CARDS */}
// 				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-14'>
// 					<div className='bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-2xl'>
// 						<p className='text-zinc-400 text-sm uppercase tracking-wide'>
// 							Transactions
// 						</p>

// 						<h2 className='text-4xl font-bold mt-3'>
// 							{
// 								data
// 									?.categoryStatistics
// 									?.length
// 							}
// 						</h2>
// 					</div>

// 					<div className='bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-2xl'>
// 						<p className='text-zinc-400 text-sm uppercase tracking-wide'>
// 							Categories
// 						</p>

// 						<h2 className='text-4xl font-bold mt-3 text-pink-500'>
// 							{
// 								data
// 									?.categoryStatistics
// 									?.length
// 							}
// 						</h2>
// 					</div>

// 					<div className='bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-2xl'>
// 						<p className='text-zinc-400 text-sm uppercase tracking-wide'>
// 							Analytics
// 						</p>

// 						<h2 className='text-4xl font-bold mt-3 text-green-400'>
// 							Live
// 						</h2>
// 					</div>

// 					<div className='bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-2xl'>
// 						<p className='text-zinc-400 text-sm uppercase tracking-wide'>
// 							Status
// 						</p>

// 						<h2 className='text-4xl font-bold mt-3 text-blue-400'>
// 							Active
// 						</h2>
// 					</div>
// 				</div>

// 				{/* ANALYTICS + FORM SECTION */}
// 				<div className='grid grid-cols-1 xl:grid-cols-3 gap-8 mb-14'>
// 					{/* LEFT ANALYTICS */}
// 					<div className='xl:col-span-2 bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl'>
// 						<div className='flex items-center justify-between mb-8'>
// 							<div>
// 								<h2 className='text-3xl font-bold'>
// 									Financial Analytics
// 								</h2>

// 								<p className='text-zinc-400 mt-2'>
// 									Visual overview
// 									of your
// 									spending
// 								</p>
// 							</div>

// 							<div className='bg-pink-500/20 text-pink-400 px-4 py-2 rounded-xl border border-pink-500/30'>
// 								Live Data
// 							</div>
// 						</div>

// 						<div className='flex justify-center items-center min-h-[450px]'>
// 							{data
// 								?.categoryStatistics
// 								?.length >
// 							0 ? (
// 								<div className='h-[420px] w-[420px]'>
// 									<Doughnut
// 										data={
// 											chartData
// 										}
// 									/>
// 								</div>
// 							) : (
// 								<div className='text-zinc-500 text-xl'>
// 									No analytics
// 									data yet
// 								</div>
// 							)}
// 						</div>
// 					</div>

// 					{/* RIGHT FORM */}
// 					<div className='bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl h-fit sticky top-10'>
// 						<TransactionForm />
// 					</div>
// 				</div>

// 				{/* SEARCH + FILTERS */}
// 				<SearchFilters
// 					onFilter={setFilters}
// 				/>

// 				{/* TRANSACTION CARDS */}
// 				<Cards filters={filters} />
// 				<AIInsights
// 					transactions={transactionData?.transactions}
// 				/>
// 			</div>
// 		</div>
// 	);
// };

// export default HomePage;

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import AIAdvisor from "../components/AIAdvisor";
import AIInsights from "../components/AIInsights";
import SearchFilters from "../components/ui/SearchFilters";
import Cards from "../components/Cards";
import TransactionForm from "../components/TransactionForm";
import NotificationPanel from "../components/NotificationPanel";

import { MdLogout } from "react-icons/md";

import toast from "react-hot-toast";

import { useMutation, useQuery } from "@apollo/client";

import { LOGOUT } from "../graphql/mutations/user.mutation";

import {
	GET_TRANSACTION_STATISTICS,
	GET_TRANSACTIONS,
} from "../graphql/queries/transaction.query";

import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";

import { useEffect, useState } from "react";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend
);

const HomePage = () => {
	const { data } = useQuery(
		GET_TRANSACTION_STATISTICS
	);

	const { data: transactionData } =
		useQuery(GET_TRANSACTIONS);

	const { data: authUserData } =
		useQuery(GET_AUTHENTICATED_USER);

	// FILTERS STATE
	const [filters, setFilters] = useState({
		search: "",
		category: "",
		type: "",
	});

	const [logout, { loading, client }] =
		useMutation(LOGOUT, {
			refetchQueries: [
				"GetAuthenticatedUser",
			],
		});

	const [chartData, setChartData] =
		useState({
			labels: [],
			datasets: [
				{
					label: "$",
					data: [],
					backgroundColor: [],
					borderColor: [],
					borderWidth: 1,
					borderRadius: 30,
					spacing: 10,
					cutout: 130,
				},
			],
		});

	useEffect(() => {
		if (data?.categoryStatistics) {
			const categories =
				data.categoryStatistics.map(
					(stat) => stat.category
				);

			const totalAmounts =
				data.categoryStatistics.map(
					(stat) => stat.totalAmount
				);

			const backgroundColors = [];
			const borderColors = [];

			categories.forEach((category) => {
				if (category === "salary") {
					backgroundColors.push(
						"rgba(34,197,94)"
					);
					borderColors.push(
						"rgba(34,197,94)"
					);
				} else if (
					category === "food"
				) {
					backgroundColors.push(
						"rgba(255,99,132)"
					);
					borderColors.push(
						"rgba(255,99,132)"
					);
				} else if (
					category ===
					"investment"
				) {
					backgroundColors.push(
						"rgba(59,130,246)"
					);
					borderColors.push(
						"rgba(59,130,246)"
					);
				} else {
					backgroundColors.push(
						"rgba(168,85,247)"
					);
					borderColors.push(
						"rgba(168,85,247)"
					);
				}
			});

			setChartData((prev) => ({
				labels: categories,
				datasets: [
					{
						...prev.datasets[0],
						data: totalAmounts,
						backgroundColor:
							backgroundColors,
						borderColor:
							borderColors,
					},
				],
			}));
		}
	}, [data]);

	const handleLogout = async () => {
		try {
			await logout();

			client.resetStore();
		} catch (error) {
			console.error(
				"Error logging out:",
				error
			);

			toast.error(error.message);
		}
	};

	return (
		<div className='min-h-screen w-full bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-8 py-10 relative z-20 -mt-16 rounded-t-[40px] border-t border-zinc-800'>
			<div className='max-w-[1800px] mx-auto'>
				{/* HEADER */}
				<div className='flex items-center justify-between mb-12'>
					<div>
						<h1 className='text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text'>
							Expense Tracker
							Dashboard
						</h1>

						<p className='text-zinc-400 mt-3 text-lg'>
							Track your finances
							smarter
						</p>
					</div>

					<div className='flex items-center gap-5'>
						{/* <img
							src={
								authUserData
									?.authUser
									.profilePicture
							}
							className='w-14 h-14 rounded-full border-2 border-pink-500 shadow-lg'
							alt='Avatar'
						/> */}

						{!loading && (
							<MdLogout
								className='w-7 h-7 cursor-pointer hover:text-pink-500 transition'
								onClick={
									handleLogout
								}
							/>
						)}

						{loading && (
							<div className='w-6 h-6 border-t-2 border-b-2 rounded-full animate-spin'></div>
						)}
					</div>
				</div>

				{/* STATS CARDS */}
				<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-14'>
					<div className='bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-2xl'>
						<p className='text-zinc-400 text-sm uppercase tracking-wide'>
							Transactions
						</p>

						<h2 className='text-4xl font-bold mt-3'>
							{
								data
									?.categoryStatistics
									?.length
							}
						</h2>
					</div>

					<div className='bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-2xl'>
						<p className='text-zinc-400 text-sm uppercase tracking-wide'>
							Categories
						</p>

						<h2 className='text-4xl font-bold mt-3 text-pink-500'>
							{
								data
									?.categoryStatistics
									?.length
							}
						</h2>
					</div>

					<div className='bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-2xl'>
						<p className='text-zinc-400 text-sm uppercase tracking-wide'>
							Analytics
						</p>

						<h2 className='text-4xl font-bold mt-3 text-green-400'>
							Live
						</h2>
					</div>

					<div className='bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-zinc-800 shadow-2xl'>
						<p className='text-zinc-400 text-sm uppercase tracking-wide'>
							Status
						</p>

						<h2 className='text-4xl font-bold mt-3 text-blue-400'>
							Active
						</h2>
					</div>
				</div>

				{/* ANALYTICS + FORM SECTION */}
				<div className='grid grid-cols-1 xl:grid-cols-3 gap-8 mb-14'>
					{/* LEFT ANALYTICS */}
					<div className='xl:col-span-2 bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl'>
						<div className='flex items-center justify-between mb-8'>
							<div>
								<h2 className='text-3xl font-bold'>
									Financial
									Analytics
								</h2>

								<p className='text-zinc-400 mt-2'>
									Visual overview
									of your
									spending
								</p>
							</div>

							<div className='bg-pink-500/20 text-pink-400 px-4 py-2 rounded-xl border border-pink-500/30'>
								Live Data
							</div>
						</div>

						<div className='flex justify-center items-center min-h-[450px]'>
							{data
								?.categoryStatistics
								?.length >
							0 ? (
								<div className='h-[420px] w-[420px]'>
									<Doughnut
										data={
											chartData
										}
									/>
								</div>
							) : (
								<div className='text-zinc-500 text-xl'>
									No analytics
									data yet
								</div>
							)}
						</div>
					</div>

					{/* RIGHT FORM */}
					<div className='bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl h-fit sticky top-10'>
						<TransactionForm />
					</div>
				</div>

				{/* SEARCH + FILTERS */}
				<SearchFilters
					onFilter={setFilters}
				/>

				{/* TRANSACTION CARDS */}
				<Cards filters={filters} />

				{/* AI INSIGHTS */}
				<AIInsights
					transactions={
						transactionData?.transactions
					}
				/>

				{/* SMART NOTIFICATIONS */}
				<NotificationPanel
					transactions={
						transactionData?.transactions
					}
				/>

				{/* AI ADVISOR */}
				<AIAdvisor
					transactions={
						transactionData?.transactions
					}
				/>
			</div>
		</div>
	);
};

export default HomePage;