/*
*  文章数据模型
*/
module.exports = class Article extends require('./model'){
    
    /*
    *  获取某个用户的帖子
    */
    static getArticleByid(user_id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,title,content,hot,hits,`time` FROM article WHERE user_id =? ORDER BY TIME DESC'
            this.query(sql, user_id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }

    /*
    *  用户发布帖子
    */

    static writeArticle(title,content,time,user_id,hot,hits,cid) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `article`(`title`,`content`,`time`,`user_id`,`hot`,`hits`,`cid`) VALUES (?,?,?,?,?,?,?)'
            this.query(sql, [title,content,time,user_id,hot,hits,cid]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }

    /*
    *  指定文章详情
    */

    static getDetail(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,user_id,title,content,`time`,hits,thub FROM article WHERE id =?'
            this.query(sql, id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }


    static getArt(arr) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,user_id,title,content,`time`,hits,thub FROM article WHERE id in (' + arr + ')'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }

    /*
    *  获取热门文章
    */

    static getHot() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM article ORDER BY hot DESC'
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }


    static gethits(hits,id) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE `article` SET hits=? WHERE id=?'
            this.query(sql,[hits,id]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }


    /**
     * 删除文章
     * @param {integer}} id 文章编号
     */
     static del(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM article WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`失败：${err.message}`)
                reject(err)
            })
        })
    }

    
}
