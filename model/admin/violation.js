/**
 * 后台处理反馈数据模型
 */
 module.exports = class Violation extends require('../model') {



    static getA(sta) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT article.*, users.username FROM article,users WHERE article.user_id = users.id AND article.sta=? ORDER BY `time` DESC '
            this.query(sql,sta).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }




    static setW(sta,id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE article SET `sta` = ? WHERE id = ?'
            this.query(sql, [sta,id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }

}