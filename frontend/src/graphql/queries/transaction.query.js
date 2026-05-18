// import { gql } from "@apollo/client";

// export const GET_TRANSACTIONS = gql`
// 	query GetTransactions {
// 		transactions {
// 			_id
// 			description
// 			paymentType
// 			category
// 			amount
// 			location
// 			date
// 		}
// 	}
// `;

// export const GET_TRANSACTION = gql`
// 	query GetTransaction($id: ID!) {
// 		transaction(transactionId: $id) {
// 			_id
// 			description
// 			paymentType
// 			category
// 			amount
// 			location
// 			date
// 			user {
// 				name
// 				username
// 				profilePicture
// 			}
// 		}
// 	}
// `;

// export const GET_TRANSACTION_STATISTICS = gql`
// 	query GetTransactionStatistics {
// 		categoryStatistics {
// 			category
// 			totalAmount
// 		}
// 	}
// `;

import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
	query GetTransactions(
		$search: String
		$category: String
		$type: String
	) {
		transactions(
			search: $search
			category: $category
			type: $type
		) {
			_id
			description
			paymentType
			type
			category
			amount
			location
			date
		}
	}
`;

export const GET_TRANSACTION = gql`
	query GetTransaction($id: ID!) {
		transaction(transactionId: $id) {
			_id
			description
			paymentType
			type
			category
			amount
			location
			date
		}
	}
`;

export const GET_TRANSACTION_STATISTICS = gql`
	query GetTransactionStatistics {
		categoryStatistics {
			category
			totalAmount
		}
	}
`;

export const GET_MONTHLY_ANALYTICS = gql`
	query GetMonthlyAnalytics {
		monthlyAnalytics {
			month
			total
		}
	}
`;