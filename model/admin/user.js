/**
 * 后台用户数据模型
 */
 module.exports = class AdminUser extends require('../model') {
    /**
     * 用户登录
     * @param {string} username 登录账号
     * @param {string} password 登录密码
     */
     static login(username, password) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT uid,username FROM `admin` WHERE username = ? AND `password` = ?'
            this.query(sql, [username, password]).then(results => {
                resolve(results[0])
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }


    

 
}