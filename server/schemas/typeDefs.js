const typeDefs =`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]!
    workouts: [Workout]!
    goals: [Goal]!
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Workout {
    workoutId: ID!
    date: String!
    type: String!
    duration: Int!
    caloriesBurned: Int
  }

  type Goal {
    goalId: ID!
    description: String!
    targetDate: String!
    achieved: Boolean!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    workouts: [Workout]
    goals: [Goal]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookId: ID!, authors: [String], description: String, title: String!, image: String, link: String!): User
    removeBook(bookId: ID!): User
    addWorkout(date: String!, type: String!, duration: Int!, caloriesBurned: Int): Workout
    removeWorkout(workoutId: ID!): Workout
    addGoal(description: String!, targetDate: String!): Goal
    removeGoal(goalId: ID!): Goal
  }
`;

module.exports = typeDefs;
