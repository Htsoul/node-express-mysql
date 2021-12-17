/*
*  分类数据模型
*/
module.exports = class UserMain extends require('./model'){
    
    /*
    *  获取个人用户下的分类标签
    */
   static getU_tag() {
       return new Promise((resolve,reject) =>{
           let sql = 'SELECT * FROM u_tag ORDER BY `index`'
           this.query(sql).then(results =>{
               resolve(results)
           }).catch(err =>{
               console.log('失败' + err.message);
               reject(err)
           })
       }
    )}


    static getWD(user_id) {
        return new Promise((resolve,reject) =>{
            let sql = 'SELECT * FROM article WHERE user_id =? AND cid =7'
            this.query(sql,user_id).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log('失败' + err.message);
                reject(err)
            })
        }
     )}

    
}