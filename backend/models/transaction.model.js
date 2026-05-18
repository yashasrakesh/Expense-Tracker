// import mongoose from "mongoose";

// const transactionSchema = new mongoose.Schema({
// 	userId: {
// 		type: mongoose.Schema.Types.ObjectId,
// 		ref: "User",
// 		required: true,
// 	},
// 	description: {
// 		type: String,
// 		required: true,
// 	},
// 	paymentType: {
// 		type: String,
// 		enum: ["cash", "card"],
// 		required: true,
// 	},
// 	category: {
// 		type: String,
// 		enum: ["saving", "expense", "investment"],
// 		required: true,
// 	},
// 	amount: {
// 		type: Number,
// 		required: true,
// 	},
// 	location: {
// 		type: String,
// 		default: "Unknown",
// 	},
// 	date: {
// 		type: Date,
// 		required: true,
// 	},
// });

// const Transaction = mongoose.model("Transaction", transactionSchema);

// export default Transaction;

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		description: {
			type: String,
			required: true,
			trim: true,
		},

		paymentType: {
			type: String,
			enum: ["cash", "card"],
			required: true,
		},

		// NEW: Transaction type
		type: {
			type: String,
			enum: ["income", "expense"],
			required: true,
		},

		// UPDATED: Better finance categories
		category: {
			type: String,
			enum: [
				"salary",
				"food",
				"shopping",
				"rent",
				"travel",
				"investment",
				"entertainment",
				"bills",
				"health",
				"other",
			],
			required: true,
		},

		amount: {
			type: Number,
			required: true,
			min: 0,
		},

		location: {
			type: String,
			default: "Unknown",
		},

		date: {
			type: Date,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;