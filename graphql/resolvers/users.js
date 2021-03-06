const User = require("../../models/User");
//use specific errors from apollo
const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const brypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config/config");

const generateToken = (user) => {
    return jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );
}
module.exports = {
  Mutation: {
    //validate login
    async login(_, { username, password }){
        const { errors, valid } = validateLoginInput (username,password);
        const user = await User.findOne({ username });
        if(!valid){
            throw new UserInputError('Errors', {errors});
        }

        if(!user){
            errors.general = 'User not found';
            throw new UserInputError('User not Found', {errors});
        }

        const match = await brypt.compare(password, user.password);
        if(!match){
            errors.general = 'User not found';
            throw new UserInputError('Wrong Credentials', {errors});
        }

        const token = generateToken(user);


        return{
            ...user._doc,
            id: user._id,
            token
        };
    },


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
      const { valid,errors } = validateRegisterInput( username, email, password, confirmPassword ); 
      if(!valid){
          throw new UserInputError('Errors',{ errors });
      }   
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
      const token = generateToken(res);
      return{
          ...res._doc,
          id: res._id,
          token
      };
    },
  },
};
