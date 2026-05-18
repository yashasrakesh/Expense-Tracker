// const transactionTypeDef = `#graphql
//   type Transaction {
//     _id: ID!
//     userId: ID!
//     description: String!
//     paymentType: String!
//     category: String!
//     amount: Float!
//     location: String
//     date: String!
//     user: User!
//   }

//   type Query {
//     transactions: [Transaction!]
//     transaction(transactionId:ID!): Transaction
//     categoryStatistics: [CategoryStatistics!]
//   }

//   type Mutation {
//     createTransaction(input: CreateTransactionInput!): Transaction!
//     updateTransaction(input: UpdateTransactionInput!): Transaction!
//     deleteTransaction(transactionId:ID!): Transaction!
//   }

//   type CategoryStatistics {
//     category: String!
//     totalAmount: Float!
//   }

//   input CreateTransactionInput {
//     description: String!
//     paymentType: String!
//     category: String!
//     amount: Float!
//     date: String!
//     location: String
//   }

//   input UpdateTransactionInput {
//     transactionId: ID!
//     description: String
//     paymentType: String
//     category: String
//     amount: Float
//     location: String
//     date: String
//   }
// `;

// export default transactionTypeDef;

const transactionTypeDef = `#graphql

  type Transaction {
    _id: ID!
    userId: ID!
    description: String!
    paymentType: String!
    type: String!
    category: String!
    amount: Float!
    location: String
    date: String!
    user: User!
  }

  type CategoryStatistics {
    category: String!
    totalAmount: Float!
  }

  type MonthlyAnalytics {
    month: Int!
    total: Float!
  }

  type Query {

    # ALL TRANSACTIONS WITH SEARCH + FILTERS
    transactions(
      search: String
      category: String
      type: String
      startDate: String
      endDate: String
    ): [Transaction!]

    transaction(transactionId: ID!): Transaction

    categoryStatistics: [CategoryStatistics!]

    monthlyAnalytics: [MonthlyAnalytics!]
  }

  type Mutation {

    createTransaction(input: CreateTransactionInput!): Transaction!

    updateTransaction(input: UpdateTransactionInput!): Transaction!

    deleteTransaction(transactionId: ID!): Transaction!
  }

  input CreateTransactionInput {
    description: String!
    paymentType: String!
    type: String!
    category: String!
    amount: Float!
    date: String!
    location: String
  }

  input UpdateTransactionInput {
    transactionId: ID!

    description: String

    paymentType: String

    type: String

    category: String

    amount: Float

    location: String

    date: String
  }
`;

export default transactionTypeDef;