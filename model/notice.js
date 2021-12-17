/*
*  公告通知
*/
module.exports = class Notice extends require('./model'){
    
    /*
    *  获取所有公告
    */
    static getnotice() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM notice ORDER BY n_time DESC '
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }

    static getnoticeById(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT n_title,n_content,n_time FROM notice WHERE id=? '
            this.query(sql,id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }

    static deleteNoticeById(nid) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM `notice` WHERE id = ?'
            this.query(sql,nid).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }

    /*
    *  添加公告
    */
    static addNotice(n_title,n_content,n_time) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO `notice`(`n_title`,`n_content`,`n_time`) VALUES (?,?,?) '
            this.query(sql,[n_title,n_content,n_time]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log('失败：' + err.message)
                reject(err)
            })
        })
    }

}