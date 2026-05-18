// import { FaLocationDot } from "react-icons/fa6";
// import { BsCardText } from "react-icons/bs";
// import { MdOutlinePayments } from "react-icons/md";
// import { FaSackDollar } from "react-icons/fa6";
// import { FaTrash } from "react-icons/fa";
// import { HiPencilAlt } from "react-icons/hi";
// import { Link } from "react-router-dom";
// import { formatDate } from "../utils/formatDate";
// import toast from "react-hot-toast";
// import { useMutation } from "@apollo/client";
// import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";

// const categoryColorMap = {
// 	saving: "from-green-700 to-green-400",
// 	expense: "from-pink-800 to-pink-600",
// 	investment: "from-blue-700 to-blue-400",
// 	// Add more categories and corresponding color classes as needed
// };

// const Card = ({ transaction, authUser }) => {
// 	let { category, amount, location, date, paymentType, description } = transaction;
// 	const cardClass = categoryColorMap[category];
// 	const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
// 		refetchQueries: ["GetTransactions", "GetTransactionStatistics"],
// 	});

// 	// Capitalize the first letter of the description
// 	description = description[0]?.toUpperCase() + description.slice(1);
// 	category = category[0]?.toUpperCase() + category.slice(1);
// 	paymentType = paymentType[0]?.toUpperCase() + paymentType.slice(1);

// 	const formattedDate = formatDate(date);

// 	const handleDelete = async () => {
// 		try {
// 			await deleteTransaction({ variables: { transactionId: transaction._id } });
// 			toast.success("Transaction deleted successfully");
// 		} catch (error) {
// 			console.error("Error deleting transaction:", error);
// 			toast.error(error.message);
// 		}
// 	};

// 	return (
// 		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
// 			<div className='flex flex-col gap-3'>
// 				<div className='flex flex-row items-center justify-between'>
// 					<h2 className='text-lg font-bold text-white'>{category}</h2>
// 					<div className='flex items-center gap-2'>
// 						{!loading && <FaTrash className={"cursor-pointer"} onClick={handleDelete} />}
// 						{loading && <div className='w-6 h-6 border-t-2 border-b-2  rounded-full animate-spin'></div>}
// 						<Link to={`/transaction/${transaction._id}`}>
// 							<HiPencilAlt className='cursor-pointer' size={20} />
// 						</Link>
// 					</div>
// 				</div>
// 				<p className='text-white flex items-center gap-1'>
// 					<BsCardText />
// 					Description: {description}
// 				</p>
// 				<p className='text-white flex items-center gap-1'>
// 					<MdOutlinePayments />
// 					Payment Type: {paymentType}
// 				</p>
// 				<p className='text-white flex items-center gap-1'>
// 					<FaSackDollar />
// 					Amount: ${amount}
// 				</p>
// 				<p className='text-white flex items-center gap-1'>
// 					<FaLocationDot />
// 					Location: {location || "N/A"}
// 				</p>
// 				<div className='flex justify-between items-center'>
// 					<p className='text-xs text-black font-bold'>{formattedDate}</p>
// 					<img src={authUser?.profilePicture} className='h-8 w-8 border rounded-full' alt='' />
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
// export default Card;

import {
	FaLocationDot,
	FaSackDollar,
} from "react-icons/fa6";

import { BsCardText } from "react-icons/bs";

import { MdOutlinePayments } from "react-icons/md";

import { FaTrash } from "react-icons/fa";

import { HiPencilAlt } from "react-icons/hi";

import { Link } from "react-router-dom";

import { formatDate } from "../utils/formatDate";

import toast from "react-hot-toast";

import { useMutation } from "@apollo/client";

import { DELETE_TRANSACTION } from "../graphql/mutations/transaction.mutation";

const categoryColorMap = {
	salary: "from-green-700 to-green-500",

	food: "from-red-700 to-red-500",

	shopping: "from-pink-700 to-pink-500",

	rent: "from-yellow-700 to-yellow-500",

	travel: "from-blue-700 to-blue-500",

	investment: "from-indigo-700 to-indigo-500",

	entertainment: "from-purple-700 to-purple-500",

	bills: "from-orange-700 to-orange-500",

	health: "from-teal-700 to-teal-500",

	other: "from-zinc-700 to-zinc-500",
};

const Card = ({ transaction }) => {
	let {
		category,
		amount,
		location,
		date,
		paymentType,
		description,
		type,
	} = transaction;

	const cardClass =
		categoryColorMap[category] ||
		"from-zinc-700 to-zinc-500";

	const [deleteTransaction, { loading }] =
		useMutation(DELETE_TRANSACTION, {
			refetchQueries: [
				"GetTransactions",
				"GetTransactionStatistics",
			],
		});

	description =
		description[0]?.toUpperCase() +
		description.slice(1);

	category =
		category[0]?.toUpperCase() +
		category.slice(1);

	paymentType =
		paymentType[0]?.toUpperCase() +
		paymentType.slice(1);

	type =
		type[0]?.toUpperCase() + type.slice(1);

	const formattedDate = formatDate(date);

	const handleDelete = async () => {
		try {
			await deleteTransaction({
				variables: {
					transactionId:
						transaction._id,
				},
			});

			toast.success(
				"Transaction deleted successfully"
			);
		} catch (error) {
			console.error(
				"Error deleting transaction:",
				error
			);

			toast.error(error.message);
		}
	};

	return (
		<div
			className={`rounded-2xl p-6 bg-gradient-to-br ${cardClass} shadow-xl`}
		>
			<div className='flex flex-col gap-4'>
				{/* HEADER */}
				<div className='flex items-center justify-between'>
					<div>
						<h2 className='text-2xl font-bold text-white'>
							{category}
						</h2>

						<p className='text-sm text-zinc-200'>
							{type}
						</p>
					</div>

					<div className='flex items-center gap-3'>
						{!loading && (
							<FaTrash
								className='cursor-pointer text-white hover:scale-110 transition'
								onClick={
									handleDelete
								}
							/>
						)}

						{loading && (
							<div className='w-5 h-5 border-t-2 border-b-2 rounded-full animate-spin'></div>
						)}

						<Link
							to={`/transaction/${transaction._id}`}
						>
							<HiPencilAlt
								className='cursor-pointer text-white hover:scale-110 transition'
								size={20}
							/>
						</Link>
					</div>
				</div>

				{/* DESCRIPTION */}
				<p className='text-white flex items-center gap-2'>
					<BsCardText />

					<span>
						{description}
					</span>
				</p>

				{/* PAYMENT */}
				<p className='text-white flex items-center gap-2'>
					<MdOutlinePayments />

					<span>
						{paymentType}
					</span>
				</p>

				{/* AMOUNT */}
				<p className='text-white flex items-center gap-2 text-xl font-bold'>
					<FaSackDollar />

					<span>
						${amount}
					</span>
				</p>

				{/* LOCATION */}
				<p className='text-white flex items-center gap-2'>
					<FaLocationDot />

					<span>
						{location}
					</span>
				</p>

				{/* DATE */}
				<p className='text-zinc-100 text-sm'>
					{formattedDate}
				</p>
			</div>
		</div>
	);
};

export default Card;