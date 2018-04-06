let db = require('./index');

db.query("CREATE TABLE meeting (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, day VARCHAR(16), time TIME, group_name VARCHAR(50), address VARCHAR(100), city VARCHAR(50), created TIMESTAMP DEFAULT '0000-00-00 00:00:00')",(err,results)=>{
    if(err){
        console.log('error inserting table:',err);
    }else{
        console.log('built the table!',results);
        process.exit();
    }
})