const mongoose = require('mongoose');
const mongooseBcryps = require('mongoose-bcrypt');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.post('save', function(user,next){
    User.count({}).then(count=>{
      if(count==1){
        // user.admin = true;
        // user.save().then(next);
        User.update({'_id':user._id},{admin:true}).then(result=>{
          next();
        });
      }else{
        next();
      }
    })
  })
  

userSchema.plugin(mongooseBcryps);

const User = mongoose.model('User', userSchema);

module.exports = User;