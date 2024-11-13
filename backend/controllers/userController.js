const db = require('../config/database');

exports.registerUser = (req,res) => {
    const sql =  `INSERT INTO users (name, surname, email, phone, password) VALUES (?, ?, ?, ?, ?)`;
    const values = [req.body.name, req.body.surname, req.body.email, req.body.phone, req.body.password];
    db.query(sql,values, (err,data) => {
        if(err)
        {
            throw err;
        }
        return res.json(data);
    }) 
};

exports.loginUser = (req,res) => {
    const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
    db.query(sql,[ req.body.email, req.body.password], (err,data) => {
        if(err)
        {
            throw err;
        }
        if(data.length > 0)
        {
            return res.json({userId:data[0].userId, error:null})
        }
        else
        {
            return res.json({userId:null, error:"Blad! Nie znaleziono uzytkownika"})
        }
    })
};


