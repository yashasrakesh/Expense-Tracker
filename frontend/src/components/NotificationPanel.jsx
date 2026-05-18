const NotificationPanel = ({
	transactions,
}) => {
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

		categoryTotals[t.category] +=
			t.amount;
	});

	const notifications = [];

	// EXPENSE > INCOME
	if (expense > income) {
		notifications.push({
			type: "danger",
			message:
				"Your expenses are higher than your income.",
		});
	}

	// HIGH SPENDING
	if (expense > income * 0.8) {
		notifications.push({
			type: "warning",
			message:
				"You are spending more than 80% of your income.",
		});
	}

	// GOOD SAVINGS
	if (income - expense > income * 0.3) {
		notifications.push({
			type: "success",
			message:
				"Great savings performance this month.",
		});
	}

	// TOP CATEGORY
	const highestCategory =
		Object.entries(categoryTotals).sort(
			(a, b) => b[1] - a[1]
		)[0];

	if (highestCategory) {
		notifications.push({
			type: "info",
			message: `Highest spending category: ${highestCategory[0]}`,
		});
	}

	const getColor = (type) => {
		switch (type) {
			case "danger":
				return "border-red-500 bg-red-500/10 text-red-400";

			case "warning":
				return "border-yellow-500 bg-yellow-500/10 text-yellow-400";

			case "success":
				return "border-green-500 bg-green-500/10 text-green-400";

			default:
				return "border-blue-500 bg-blue-500/10 text-blue-400";
		}
	};

	return (
		<div className='bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 mt-12 shadow-2xl'>
			<div className='flex items-center justify-between mb-8'>
				<div>
					<h2 className='text-3xl font-bold'>
						Smart Notifications
					</h2>

					<p className='text-zinc-400 mt-2'>
						Financial activity alerts
					</p>
				</div>

				<div className='bg-pink-500/20 text-pink-400 px-4 py-2 rounded-xl border border-pink-500/30'>
					{
						notifications.length
					}{" "}
					Alerts
				</div>
			</div>

			<div className='space-y-5'>
				{notifications.map(
					(note, index) => (
						<div
							key={index}
							className={`p-5 rounded-2xl border ${getColor(
								note.type
							)}`}
						>
							<p className='font-medium text-lg'>
								{
									note.message
								}
							</p>
						</div>
					)
				)}

				{notifications.length ===
					0 && (
					<div className='text-zinc-500 text-center py-10'>
						No alerts right now
					</div>
				)}
			</div>
		</div>
	);
};

export default NotificationPanel;