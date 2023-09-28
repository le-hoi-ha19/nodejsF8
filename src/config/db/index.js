const mongoose = require('mongoose');

// hàm kết nối tới database cần cài đặt và import thư viện mongoose

async function connect(){
   try{
        await mongoose.connect('mongodb://127.0.0.1/f8_education_dev',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('connect successfully!!!');
   }catch(error){
    console.log('connect failly!!!');
   }
}

module.exports = {connect};