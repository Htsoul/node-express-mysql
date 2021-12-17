/*
*  点赞数据模型
*/
module.exports = class Collect extends require('./model'){
    
    /*
    *  记录点赞
    */
    static collect(art_id,user_id) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `collect`(`art_id`,`user_id`) VALUES (?,?)'
            this.query(sql, [art_id,user_id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }

    /*
    *  判断用户是否点赞
    */

    static alCollect(id,user_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id FROM `collect` WHERE art_id=? AND user_id=?'
            this.query(sql, [id,user_id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }


    /*
    *  通过用户id查询点赞帖子
    */

    static getCollect(user_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT art_id FROM collect WHERE user_id=?'
            this.query(sql, user_id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }

}