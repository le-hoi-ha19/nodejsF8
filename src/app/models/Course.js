const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');




// schema giống với một cấu trúc bảng trong sql
const Course = new Schema({
    //required: true trường đó bắt buộc phải nhập
    name: {type: String ,maxLength:255,required:true},
    description: {type: String, maxLength:600 },
    image: {type: String, maxLength:255 },
    level: {type: String, maxLength:255 },
    videoid: {type: String, maxLength:255 },
    slug: { type: String, slug:'name' ,unique: true},
   
}, {
    timestamps: true,
});

mongoose.plugin(slug);
Course.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all'});

module.exports = mongoose.model('Course', Course)
// cái này dùng thư viện mongoose
// viết giống trong file này để định nghĩa 1 collection, nêú muốn lấy dữ liêụ trong csdl ra thì
// Course.find() hoặc Course.findOne() và nhớ import Course trước khi dùng nó.
