const User = require("../../models/User");
//use specific errors from apollo
const { UserInputError } = require('apollo-server');
const brypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/config");
module.exports = {
  Mutation: {
    //register(parent, args, context, info) written as
    //parent - what was the input from the last steps. When data travels ans processed through many resolvers
    //args - used most of the times. It takes the input
    //context -
    //info - information in general about metadata that we don't need

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      //TODO:validate user data
      //Make sure that user doesn't already exist
      //Hash the passwords and create authentication

      const user = await User.findOne({username});
      if(user){
          throw new UserInputError('Username is taken',{
              errors:{
                  username: 'This username is taken'
              }
          })
      }

      password = await brypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
      return{
          ...res._doc,
          id: res.id,
          token
      };
    },
  },
};
