const { mutipleMongooseToObject } = require("../../util/mongooses");
const Product = require("../models/Product");
const jwt = require('jsonwebtoken');



class ProductController {
  
   phantrang(req, res,next) {
      var page = req.query.page;

      if (page) {
        //getbyPage
        const PAGE_SIZE = 2;
        page = parseInt(page);
        if (page < 1) {
          page = 1;
        }
        var skip = (page - 1) * PAGE_SIZE;
  
        async function getByPage(PAGE_SIZE, skip) {
          try {
            const data = await Product.find({})
              .skip(skip) // bỏ qua bao nhiêu phần tử
              .limit(PAGE_SIZE); // lây tối đa bao nhiêu phần tử
              res.json(data)
          } catch {
            res.status(500).json("lôĩ server1");
          }
        }
        getByPage(PAGE_SIZE, skip);
      } else {
        //get all
        async function getAllProduct() {
          try {
            const data = await Product.find({});
            if (data) {
              res.json(data);
            } else {
              res.status(300).json("Trang không có dữ liệu");
            }
          } catch {
            res.status(500).json("lôĩ server2");
          }
        }
        getAllProduct();
      }
    }
   }


module.exports = new ProductController;