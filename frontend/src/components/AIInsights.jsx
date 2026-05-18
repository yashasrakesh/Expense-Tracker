const AIInsights = ({ transactions }) => {
	if (!transactions?.length) return null;

	let income = 0;
	let expense = 0;

	const categoryTotals = {};

	transactions.forEach((t) => {
		if (t.type === "income") {
			income += t.amount;
		} else {
			expense += t.amount;
		}

		if (!categoryTotals[t.category]) {
			categoryTotals[t.category] = 0;
		}

		categoryTotals[t.category] += t.amount;
	});

	const savings = income - expense;

	const highestCategory = Object.entries(
		categoryTotals
	).sort((a, b) => b[1] - a[1])[0];

	return (
		<div className='bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl mt-10'>
			<h2 className='text-3xl font-bold mb-6'>
				AI Financial Insights
			</h2>

			<div className='space-y-4 text-zinc-300'>
				<p>
					💰 Total Income:
					<span className='text-green-400 font-bold ml-2'>
						₹{income}
					</span>
				</p>

				<p>
					💸 Total Expenses:
					<span className='text-red-400 font-bold ml-2'>
						₹{expense}
					</span>
				</p>

				<p>
					📈 Savings:
					<span className='text-blue-400 font-bold ml-2'>
						₹{savings}
					</span>
				</p>

				<p>
					🔥 Highest Spending Category:
					<span className='text-pink-400 font-bold ml-2 capitalize'>
						{
							highestCategory?.[0]
						}
					</span>
				</p>

				{savings < 0 && (
					<p className='text-red-400 font-semibold'>
						⚠️ Your expenses
						are higher than
						your income.
					</p>
				)}

				{savings > 0 && (
					<p className='text-green-400 font-semibold'>
						✅ Good job!
						You are saving
						money.
					</p>
				)}
			</div>
		</div>
	);
};

export default AIInsights;