/**
 * 后台处理反馈数据模型
 */
 module.exports = class Feedback extends require('../model') {
    



     static inFeedData(nickname,plate,uf_cont,uf_email,rellyname) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `feedback`(`nickname`,`plate`,`uf_cont`,`uf_email`,`rellyname`) VALUES (?,?,?,?,?)'
            this.query(sql, [nickname,plate,uf_cont,uf_email,rellyname]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }



    static getFeedback(sta) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM feedback WHERE `option` = ?'
            this.query(sql,sta).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }


    static handleFeed(uf_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM feedback WHERE uf_id= ?'
            this.query(sql,uf_id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }



    static handleChange(opt,uf_id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE feedback SET `option` = ? WHERE uf_id = ?'
            this.query(sql,[opt,uf_id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('登录失败：' + err.message)
                reject(err)
            })
        })
    }
    

 
}