const { model, Schema } = require('mongoose');
//Although type, requiredment and unique is being already checked by the Graph QL. So, in next Schemas, we won't be doing that.
const userSchema = new Schema({
    username : {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required : true,
        unique: true
    },
    email : {
        type: String,
        required : true,
        unique: true
    },
    createdAt : {
        type: String,
        required : true,
        unique: true
    }
});
module.exports = model('User', userSchema);