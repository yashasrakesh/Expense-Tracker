import axios from "axios";

import { useState } from "react";

const AIAdvisor = ({
	transactions,
}) => {
	const [loading, setLoading] =
		useState(false);

	const [response, setResponse] =
		useState("");

	// const handleAnalyze = async () => {
        // const handleAnalyze = async () => {
        //     alert("BUTTON WORKING");
        const handleAnalyze = async () => {
	try {
		setLoading(true);

		console.log("Sending request");

		const res = await axios.post(
			"https://expense-tracker-api-production-2e87.up.railway.app/api/ai/analyze",
			{
				transactions,
			}
		);

		console.log(res.data);

		setResponse(res.data.text);
	} catch (error) {
		console.log(
			"FULL ERROR:",
			error
		);

		alert(
			"Gemini quota exceeded. Try again in a few minutes"
		);
	} finally {
		setLoading(false);
	}

		// try {
		// 	setLoading(true);

		// 	// const res = await axios.post(
		// 	// 	"/api/ai/analyze",
		// 	// 	{
		// 	// 		transactions,
		// 	// 	}
		// 	// );

		// 	setResponse(res.data.text);
		// } catch (error) {
		// 	console.log(error);
		// } finally {
		// 	setLoading(false);
		// }
	};

	return (
		<div className='bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 mt-12'>
			<h2 className='text-3xl font-bold mb-4'>
				AI Financial Advisor
			</h2>

			<button
				onClick={handleAnalyze}
				className='bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4 rounded-2xl font-bold'
			>
				{loading
					? "Analyzing..."
					: "Analyze My Finances"}
			</button>

			{response && (
				<div className='mt-8 whitespace-pre-wrap text-zinc-300 leading-8'>
					{response}
				</div>
			)}
		</div>
	);
};

export default AIAdvisor;