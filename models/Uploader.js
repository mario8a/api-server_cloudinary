const cloudinary = require('cloudinary');

const secrets = require('../config/secret');

cloudinary.config(secrets.cloudinary);

module.exports = function(imagePath){
  return new Promise((resolve,reject)=>{
    cloudinary.uploader.upload(imagePath,function(result){
      console.log(result);
      if(result.secure_url) return resolve(result.secure_url);

      reject(new Error('Error with cloudinary'));
    })
  })
}

// var cloudinary = require('cloudinary').v2;

// const secrets = require('../config/secret');

// cloudinary.config(secrets.cloudinary);

// module.exports = function(imagePath) {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(imagePath, function(result) {
//             console.log(result);
//             // if(result.photo) return resolve(result.photo);
//             return resolve(result);

//             // reject(new Error('Error con cloudinary'))
//         })
//     })
// }