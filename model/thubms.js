/*
*  点赞数据模型
*/
module.exports = class Thumbs extends require('./model'){
    
    /*
    *  记录点赞
    */
    static thub(art_id,user_id) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `thumbs`(`art_id`,`user_id`) VALUES (?,?)'
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

    static althub(id,user_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id FROM `thumbs` WHERE art_id=? AND user_id=?'
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

    static getArt(user_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT art_id FROM thumbs WHERE user_id=?'
            this.query(sql, user_id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }



    
    static getHub(art_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT thub FROM article WHERE id =?'
            this.query(sql, art_id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }


    static updateHub(thub,art_id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE `article` SET thub=? WHERE id =?'
            this.query(sql, [thub,art_id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }

}



