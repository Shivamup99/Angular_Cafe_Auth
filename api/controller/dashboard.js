import db from "../connection/db.js";

export const dashDetails = (req, res) => {
  var categoryCount;
  var productCount;
  var billCount = 4;
  var q = "select count(id) as categoryCount from category";

  db.query(q, (err, data) => {
    if (!err) {
      categoryCount = data[0].categoryCount;
    } else {
      res.status(500).json(err);
    }
  });

  var q = "select count(id) as productCount from posts";
  db.query(q, (err, data) => {
    if (!err) {
      productCount = data[0].productCount;
    } else {
      res.status(500).json(err);
    }
  });

  //var q = 'select count(id) as bills from bills'
 // db.query(q,(err,data)=>{
     // if(!err){
          //billCount=data[0].bills;
          var data = {
            category: categoryCount,
            products: productCount,
            bills: billCount,
          };
          return res.status(200).json(data);
   // }
//   else{
//       res.status(500).json(err)
//   }
  }

