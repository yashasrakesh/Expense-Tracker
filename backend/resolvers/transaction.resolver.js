// import Transaction from "../models/transaction.model.js";
// import User from "../models/user.model.js";

// const transactionResolver = {
// 	Query: {
// 		transactions: async (_, __, context) => {
// 			try {
// 				if (!context.getUser()) throw new Error("Unauthorized");
// 				const userId = await context.getUser()._id;

// 				const transactions = await Transaction.find({ userId });
// 				return transactions;
// 			} catch (err) {
// 				console.error("Error getting transactions:", err);
// 				throw new Error("Error getting transactions");
// 			}
// 		},
// 		transaction: async (_, { transactionId }) => {
// 			try {
// 				const transaction = await Transaction.findById(transactionId);
// 				return transaction;
// 			} catch (err) {
// 				console.error("Error getting transaction:", err);
// 				throw new Error("Error getting transaction");
// 			}
// 		},
// 		categoryStatistics: async (_, __, context) => {
// 			if (!context.getUser()) throw new Error("Unauthorized");

// 			const userId = context.getUser()._id;
// 			const transactions = await Transaction.find({ userId });
// 			const categoryMap = {};

// 			// const transactions = [
// 			// 	{ category: "expense", amount: 50 },
// 			// 	{ category: "expense", amount: 75 },
// 			// 	{ category: "investment", amount: 100 },
// 			// 	{ category: "saving", amount: 30 },
// 			// 	{ category: "saving", amount: 20 }
// 			// ];

// 			transactions.forEach((transaction) => {
// 				if (!categoryMap[transaction.category]) {
// 					categoryMap[transaction.category] = 0;
// 				}
// 				categoryMap[transaction.category] += transaction.amount;
// 			});

// 			// categoryMap = { expense: 125, investment: 100, saving: 50 }

// 			return Object.entries(categoryMap).map(([category, totalAmount]) => ({ category, totalAmount }));
// 			// return [ { category: "expense", totalAmount: 125 }, { category: "investment", totalAmount: 100 }, { category: "saving", totalAmount: 50 } ]
// 		},
// 	},
// 	Mutation: {
// 		createTransaction: async (_, { input }, context) => {
// 			try {
// 				const newTransaction = new Transaction({
// 					...input,
// 					userId: context.getUser()._id,
// 				});
// 				await newTransaction.save();
// 				return newTransaction;
// 			} catch (err) {
// 				console.error("Error creating transaction:", err);
// 				throw new Error("Error creating transaction");
// 			}
// 		},
// 		updateTransaction: async (_, { input }) => {
// 			try {
// 				const updatedTransaction = await Transaction.findByIdAndUpdate(input.transactionId, input, {
// 					new: true,
// 				});
// 				return updatedTransaction;
// 			} catch (err) {
// 				console.error("Error updating transaction:", err);
// 				throw new Error("Error updating transaction");
// 			}
// 		},
// 		deleteTransaction: async (_, { transactionId }) => {
// 			try {
// 				const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
// 				return deletedTransaction;
// 			} catch (err) {
// 				console.error("Error deleting transaction:", err);
// 				throw new Error("Error deleting transaction");
// 			}
// 		},
// 	},
// 	Transaction: {
// 		user: async (parent) => {
// 			const userId = parent.userId;
// 			try {
// 				const user = await User.findById(userId);
// 				return user;
// 			} catch (err) {
// 				console.error("Error getting user:", err);
// 				throw new Error("Error getting user");
// 			}
// 		},
// 	},
// };

// export default transactionResolver;

import mongoose from "mongoose";
import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

const transactionResolver = {
	Query: {
		// GET ALL TRANSACTIONS WITH SEARCH + FILTERS
		transactions: async (_, args, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauthorized");

				const userId = context.getUser()._id;

				const filter = { userId };

				// SEARCH BY DESCRIPTION
				if (args.search) {
					filter.description = {
						$regex: args.search,
						$options: "i",
					};
				}

				// FILTER BY CATEGORY
				if (args.category) {
					filter.category = args.category;
				}

				// FILTER BY TYPE
				if (args.type) {
					filter.type = args.type;
				}

				// FILTER BY DATE RANGE
				if (args.startDate && args.endDate) {
					filter.date = {
						$gte: new Date(args.startDate),
						$lte: new Date(args.endDate),
					};
				}

				const transactions = await Transaction.find(filter).sort({
					date: -1,
				});

				return transactions;
			} catch (err) {
				console.error("Error getting transactions:", err);
				throw new Error("Error getting transactions");
			}
		},

		// GET SINGLE TRANSACTION
		transaction: async (_, { transactionId }) => {
			try {
				const transaction = await Transaction.findById(transactionId);

				return transaction;
			} catch (err) {
				console.error("Error getting transaction:", err);
				throw new Error("Error getting transaction");
			}
		},

		// CATEGORY ANALYTICS
		categoryStatistics: async (_, __, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauthorized");

				const userId = context.getUser()._id;

				const transactions = await Transaction.find({ userId });

				const categoryMap = {};

				transactions.forEach((transaction) => {
					if (!categoryMap[transaction.category]) {
						categoryMap[transaction.category] = 0;
					}

					categoryMap[transaction.category] += transaction.amount;
				});

				return Object.entries(categoryMap).map(
					([category, totalAmount]) => ({
						category,
						totalAmount,
					})
				);
			} catch (err) {
				console.error("Error getting category statistics:", err);
				throw new Error("Error getting category statistics");
			}
		},

		// MONTHLY ANALYTICS
		monthlyAnalytics: async (_, __, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauthorized");

				const userId = context.getUser()._id;

				const analytics = await Transaction.aggregate([
					{
						$match: {
							userId: new mongoose.Types.ObjectId(userId),
						},
					},
					{
						$group: {
							_id: {
								month: { $month: "$date" },
							},
							total: { $sum: "$amount" },
						},
					},
					{
						$sort: {
							"_id.month": 1,
						},
					},
				]);

				return analytics.map((item) => ({
					month: item._id.month,
					total: item.total,
				}));
			} catch (err) {
				console.error("Error getting monthly analytics:", err);
				throw new Error("Error getting monthly analytics");
			}
		},
	},

	Mutation: {
		// CREATE TRANSACTION
		createTransaction: async (_, { input }, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauthorized");

				const newTransaction = new Transaction({
					...input,
					userId: context.getUser()._id,
				});

				await newTransaction.save();

				return newTransaction;
			} catch (err) {
				console.error("Error creating transaction:", err);
				throw new Error("Error creating transaction");
			}
		},

		// UPDATE TRANSACTION
		updateTransaction: async (_, { input }, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauthorized");

				const updatedTransaction =
					await Transaction.findByIdAndUpdate(
						input.transactionId,
						input,
						{
							new: true,
						}
					);

				return updatedTransaction;
			} catch (err) {
				console.error("Error updating transaction:", err);
				throw new Error("Error updating transaction");
			}
		},

		// DELETE TRANSACTION
		deleteTransaction: async (_, { transactionId }, context) => {
			try {
				if (!context.getUser()) throw new Error("Unauthorized");

				const deletedTransaction =
					await Transaction.findByIdAndDelete(transactionId);

				return deletedTransaction;
			} catch (err) {
				console.error("Error deleting transaction:", err);
				throw new Error("Error deleting transaction");
			}
		},
	},

	Transaction: {
		user: async (parent) => {
			try {
				const user = await User.findById(parent.userId);

				return user;
			} catch (err) {
				console.error("Error getting user:", err);
				throw new Error("Error getting user");
			}
		},
	},
};

export default transactionResolver;