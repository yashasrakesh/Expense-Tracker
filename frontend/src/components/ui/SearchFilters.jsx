import { useState } from "react";

const SearchFilters = ({ onFilter }) => {
	const [filters, setFilters] = useState({
		search: "",
		category: "",
		type: "",
	});

	const handleChange = (e) => {
		setFilters({
			...filters,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div className='flex flex-wrap gap-4 mb-8 w-full justify-center'>
			<input
				type='text'
				name='search'
				placeholder='Search transactions'
				className='p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700 w-64'
				onChange={handleChange}
			/>

			<select
				name='category'
				className='p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700'
				onChange={handleChange}
			>
				<option value=''>All Categories</option>
				<option value='salary'>Salary</option>
				<option value='food'>Food</option>
				<option value='shopping'>Shopping</option>
				<option value='rent'>Rent</option>
				<option value='travel'>Travel</option>
				<option value='investment'>Investment</option>
				<option value='entertainment'>Entertainment</option>
				<option value='bills'>Bills</option>
				<option value='health'>Health</option>
				<option value='other'>Other</option>
			</select>

			<select
				name='type'
				className='p-3 rounded-xl bg-zinc-900 text-white border border-zinc-700'
				onChange={handleChange}
			>
				<option value=''>All Types</option>
				<option value='income'>Income</option>
				<option value='expense'>Expense</option>
			</select>

			<button
				className='bg-pink-500 hover:bg-pink-600 transition px-5 py-3 rounded-xl text-white font-semibold'
				onClick={() => onFilter(filters)}
			>
				Apply Filters
			</button>
		</div>
	);
};

export default SearchFilters;