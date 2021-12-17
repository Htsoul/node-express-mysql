/**
 * 用户数据模型
 */
 module.exports = class User extends require('./model') {
    /**
     * 用户登录
     * @param {string} username 登录账号
     * @param {string} password 登录密码
     */
     static login(email, password) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,username,avatar FROM `users` WHERE email = ? AND pwd = ?'
            this.query(sql, [email, password]).then(results => {
                resolve(results[0])
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }


    static check(username,email){
        return new Promise((resolve,reject) =>{
            let sql = 'SELECT username,email FROM `users` WHERE username = ? OR email = ?'
            this.query(sql,[username,email]).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log(err.message);
                reject(err)
            })
        })
    }

    static checkpwd(username,password){
        return new Promise((resolve,reject) =>{
            console.log(username,password);
            let sql = 'SELECT id FROM `users` WHERE username= ? AND pwd= ?'
            this.query(sql,[username,password]).then(results =>{
                resolve(results)
                console.log(results);
            }).catch(err =>{
                console.log(err.message);
                reject(err)
            })
        })
    }


    static register(username,email,password,avatar){
        return new Promise((resolve,reject) =>{
            let sql = 'INSERT INTO `users`(`username`,`email`,`pwd`,`avatar`) VALUES (?,?,?,?)'
            this.query(sql,[username,email,password,avatar]).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log(err.message);
                reject(err)
            })
        })
    }

    static avatar(avater,username){
        return new Promise((resolve,reject) =>{
            let sql = 'UPDATE `users` SET avatar=? WHERE username=?'
            this.query(sql,[avater,username]).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log(err.message);
                reject(err)
            })
        })
    }


    static update(subpassword,username){
        return new Promise((resolve,reject) =>{
            let sql = 'UPDATE `users` SET pwd=? WHERE username=?'
            this.query(sql,[subpassword,username]).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log(err.message);
                reject(err)
            })
        })
    }

    static getid(username){
        return new Promise((resolve,reject) =>{
            let sql = 'SELECT id FROM `users` WHERE username=?'
            this.query(sql,username).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log(err.message);
                reject(err)
            })
        })
    }

    static getname(user_id){
        return new Promise((resolve,reject) =>{
            let sql = 'SELECT username,avatar FROM `users` WHERE id=?'
            this.query(sql,user_id).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log(err.message);
                reject(err)
            })
        })
    }

    static getUs(user_id){
        return new Promise((resolve,reject) =>{
            let sql = 'SELECT id,username,avatar FROM `users` WHERE id in(' + user_id + ')'
            this.query(sql,user_id).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log(err.message);
                reject(err)
            })
        })
    }



    static Isban(email) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT statu FROM users WHERE email=?'
            this.query(sql,email).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }


    static getNomUser(sta) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM users WHERE statu = ?'
            this.query(sql,sta).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }

    static getUnomUser(sta) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM users WHERE statu = ?'
            this.query(sql,sta).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }


    static updateTfUser(sta,username) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE users SET statu = ? WHERE username = ?'
            this.query(sql,[sta,username]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }
 
}