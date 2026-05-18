// import { useQuery } from "@apollo/client";
// import Card from "./Card";
// import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
// import { GET_AUTHENTICATED_USER, GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";

// const Cards = () => {
// 	const { data, loading } = useQuery(GET_TRANSACTIONS);
// 	const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);

// 	const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
// 		variables: {
// 			userId: authUser?.authUser?._id,
// 		},
// 	});

// 	console.log("userAndTransactions:", userAndTransactions);

// 	console.log("cards:", data);

// 	// TODO => ADD RELATIONSHIPS
// 	return (
// 		<div className='w-full px-10 min-h-[40vh]'>
// 			<p className='text-5xl font-bold text-center my-10'>History</p>
// 			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
// 				{!loading &&
// 					data.transactions.map((transaction) => (
// 						<Card key={transaction._id} transaction={transaction} authUser={authUser.authUser} />
// 					))}
// 			</div>
// 			{!loading && data?.transactions?.length === 0 && (
// 				<p className='text-2xl font-bold text-center w-full'>No transaction history found.</p>
// 			)}
// 		</div>
// 	);
// };
// export default Cards;

// import { useQuery } from "@apollo/client";

// import Card from "./Card";

// import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

// const Cards = ({ filters }) => {
// 	const { data, loading } = useQuery(
// 		GET_TRANSACTIONS,
// 		{
// 			variables: {
// 				search: filters.search,
// 				category: filters.category,
// 				type: filters.type,
// 			},
// 		}
// 	);

// 	return (
// 		<div className='w-full min-h-[40vh]'>
// 			<h2 className='text-4xl font-bold text-center mb-10'>
// 				Transaction History
// 			</h2>

// 			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
// 				{!loading &&
// 					data?.transactions?.map(
// 						(transaction) => (
// 							<Card
// 								key={transaction._id}
// 								transaction={transaction}
// 							/>
// 						)
// 					)}
// 			</div>

// 			{!loading &&
// 				data?.transactions?.length ===
// 					0 && (
// 					<div className='flex justify-center mt-10'>
// 						<p className='text-2xl text-zinc-400'>
// 							No transactions found.
// 						</p>
// 					</div>
// 				)}
// 		</div>
// 	);
// };

// export default Cards;

import { useQuery } from "@apollo/client";

import Card from "./Card";

import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";

const Cards = ({ filters }) => {
	const { data, loading } = useQuery(
		GET_TRANSACTIONS,
		{
			variables: {
				search: filters.search,
				category: filters.category,
				type: filters.type,
			},
		}
	);

	return (
		<div className='w-full mt-16'>
			{/* OUTER CONTAINER */}
			<div className='bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-10 shadow-2xl'>
				{/* HEADER */}
				<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-12'>
					<div>
						<h2 className='text-5xl font-bold'>
							Transaction History
						</h2>

						<p className='text-zinc-400 mt-3 text-lg'>
							Manage and track all
							your transactions
						</p>
					</div>

					<div className='bg-pink-500/10 border border-pink-500/20 px-6 py-4 rounded-2xl'>
						<p className='text-zinc-400 text-sm'>
							Total Transactions
						</p>

						<h3 className='text-3xl font-bold text-pink-400'>
							{
								data?.transactions
									?.length
							}
						</h3>
					</div>
				</div>

				{/* GRID */}
				<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8'>
					{!loading &&
						data?.transactions?.map(
							(transaction) => (
								<Card
									key={
										transaction._id
									}
									transaction={
										transaction
									}
								/>
							)
						)}
				</div>

				{/* EMPTY */}
				{!loading &&
					data?.transactions
						?.length === 0 && (
						<div className='h-[300px] flex items-center justify-center'>
							<div className='text-center'>
								<h3 className='text-3xl font-bold text-zinc-500 mb-3'>
									No Transactions
								</h3>

								<p className='text-zinc-600'>
									Add your first
									transaction to
									get started
								</p>
							</div>
						</div>
					)}
			</div>
		</div>
	);
};

export default Cards;