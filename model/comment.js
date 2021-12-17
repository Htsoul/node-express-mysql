/*
*  评论数据模型
*/
module.exports = class Comment extends require('./model'){
    
    /*
    *  添加用户评论
    */
   static comm(art_id,comment,user_id) {
       return new Promise((resolve,reject) =>{
           let sql = 'INSERT INTO `comment`(`art_id`,`comment`,`user_id`) VALUES (?,?,?)'
           this.query(sql,[art_id,comment,user_id]).then(results =>{
               resolve(results)
           }).catch(err =>{
               console.log('失败' + err.message);
               reject(err)
           })
       }
    )}



    static getComm(art_id) {
        return new Promise((resolve,reject) =>{
            let sql = 'SELECT `id`,`comment`,`user_id` FROM `comment` WHERE art_id=?'
            this.query(sql,art_id).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log('失败' + err.message);
                reject(err)
            })
        }
     )}

     static getCommById(users) {
        return new Promise((resolve,reject) =>{
            let sql = 'SELECT * FROM `comment`,article, users WHERE comment.art_id = article.id  AND users.id  IN (' + users + ')'
            this.query(sql).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log('失败' + err.message);
                reject(err)
            })
        }
     )}



     static getComUsById(user_id) {
        return new Promise((resolve,reject) =>{
            let sql = 'SELECT comment.user_id FROM `comment`,article WHERE comment.art_id = article.id  AND article.user_id =?'
            this.query(sql,user_id).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log('失败' + err.message);
                reject(err)
            })
        }
     )}
}