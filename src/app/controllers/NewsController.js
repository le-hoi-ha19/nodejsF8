
class NewsController {
   index(req, res) {
      res.send(`<h1 style ="color:red"> news</h1>`); // vấn đề để sử dụng template engine nằm ở đây, nếu là 1 trangweb thì k thể viết thẳng dc 
      // vô cục này được tại vì khó nhìn và quá nhiều code,khó code nên dùng template engine để tách ra cho đợ lỗi, và chia layout như code html thủ công
   }

   show(req, res) {
      res.send('new detail');
   }
}

module.exports = new NewsController;