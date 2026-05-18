// import express from "express";

// import axios from "axios";

// const router = express.Router();

// router.post(
// 	"/analyze",
// 	async (req, res) => {
// 		try {
//             console.log("AI ROUTE HIT");
// 			const { transactions } =
// 				req.body;

// 			const prompt = `
// You are an AI finance advisor.

// Analyze these transactions.

// Give:
// - spending analysis
// - savings advice
// - budgeting suggestions
// - financial improvements

// Transactions:
// ${JSON.stringify(transactions)}
// `;

// 			const response =
// 				await axios.post(
// 					`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
// 					{
// 						contents: [
// 							{
// 								parts: [
// 									{
// 										text: prompt,
// 									},
// 								],
// 							},
// 						],
// 					}
// 				);

// 			const text =
// 				response.data.candidates[0]
// 					.content.parts[0]
// 					.text;

// 			res.json({ text });
// 		} catch (error) {
// 			console.log(error);

// 			res.status(500).json({
// 				error:
// 					"AI failed",
// 			});
// 		}
// 	}
// );

// export default router;

import express from "express";

import axios from "axios";

const router = express.Router();

router.post(
	"/analyze",
	async (req, res) => {
		try {
			console.log(
				"AI ROUTE HIT"
			);

			const {
				transactions,
			} = req.body;

			// SMALLER + BETTER PROMPT
			const formattedTransactions =
				transactions
					.map(
						(t) =>
							`${t.category} - ₹${t.amount}`
					)
					.join("\n");

			const prompt = `
You are an expert AI finance advisor.

Analyze these financial transactions.

Provide:
1. Spending analysis
2. Savings advice
3. Budget recommendations
4. Financial improvement suggestions

Keep response short, smart, and professional.

Transactions:
${formattedTransactions}
`;

			const response =
				await axios.post(
					`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
					{
						contents: [
							{
								parts: [
									{
										text: prompt,
									},
								],
							},
						],
					}
				);

			const text =
				response.data
					.candidates?.[0]
					?.content
					?.parts?.[0]
					?.text;

			if (!text) {
				return res
					.status(500)
					.json({
						error:
							"No AI response generated",
					});
			}

			res.json({
				text,
			});
		} catch (error) {
			console.log(
				"GEMINI ERROR:",
				error.response?.data ||
					error.message
			);

			res.status(500).json({
				error:
					"AI analysis failed",
			});
		}
	}
);

export default router;