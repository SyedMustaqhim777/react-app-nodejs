var mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "smartant",
    database: "node",
  });

  var service = {};


  /// Create 

  service.addItem = (item) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        console.log("connection")
        if(err) {
          console.log(err);
          resolve({result: "fail", msg: "Item addition failed"})
        }
        let queryCallback = (err, results) => {
          connection.release();
          if(err) {
            resolve({result: "fail", msg: "Item addition failed"})
            console.log("Error Selecting : %s ", err);
          } else {
            resolve({result: "success", msg: "Item added"})
          }
        };
        connection.query("INSERT INTO menu SET ? ", item, queryCallback);
      });
    });
  };
  

/// Read 

service.getItem = () => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        return resolve([]);
      }
      connection.query("SELECT * FROM menu", (err, results) => {
        connection.release();
        if(err){
          return resolve([]);
        }
        return resolve(results);
      });
    });
  });
};



service.getItemById = function (id) {
  var record = {};

  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve({});
        return;
      }
      // make the query
      var sql = "SELECT * FROM menu where id='" + id + "'";
      connection.query(sql, function (err, results) {
        connection.release();
        if (err) {
          console.log(err);
          resolve({});
          return;
        }
        if (results.length == 0) {
          resolve(record);
        }
        resolve(results[0]);
      });
    });
  });
};

service.updateItem = function (item) {
  //Promise
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        return resolve({ result: "fail", msg: "item updation failed." });
      }
      connection.query(
        "UPDATE menu set ? WHERE id = ? ",
        [item, item.id],
        function (err, results) {
          if (err) {
            return resolve({
              result: "fail",
              msg: "Item updation failed.",
            });
          } else {
            return resolve({ result: "success" });
          }
        }
      );
    });
  });
};


service.deleteItem = (id) => {
  var items = [];
  var sql = "delete FROM menu where id='" + id + "'";
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve({ result: "fail", msg: "item deletion failed." });
      }
      connection.query(sql, function (err, results) {
        connection.release();
        if (err) {
          console.log(err);
          resolve({ result: "fail", msg: "item deletion failed." });
        }
        resolve({ result: "success", msg: "item deleted." });
      });
    });
  });
};

service.getItemBySearch = function (field, searchText) {
  var recordList = [];
  var sql =
  "SELECT * FROM menu where " + field + " like '%" + searchText + "%'";
  console.log("sql:" + sql);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        console.log(err);
        resolve({});
        return;
      }
      // make the query
      connection.query(sql, function (err, results) {
        connection.release();
        if (err) {
          console.log(err);
          resolve({});
          return;
        }
        if (results.length == 0) {
          resolve(recordList);
        } else {
          resolve(results);
        }
      });
    });
  });
};

module.exports = service;

