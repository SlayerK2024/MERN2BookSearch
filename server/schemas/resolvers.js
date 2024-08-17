const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.User) {
        return await User.findById({ _id: context.User._id });
      }
      throw new AuthenticationError('Not authenticated');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    saveBook: async (parent, { bookId, authors, description, title, image, link }, context) => {
      if (context.User) {
        return User.findOneAndUpdate(
          { _id: context.User._id },
          {
            $addToSet: { 
              savedBooks: {
                bookId, authors, description, title, image, link
              },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError('Not authenticated');
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.User) {
        return User.findByIdAndUpdate(
          { _id: context.User._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('Not authenticated');
    },
  },
};

module.exports = resolvers;