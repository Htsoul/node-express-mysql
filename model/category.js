/*
*  分类数据模型
*/
module.exports = class Category extends require('./model'){
    
    /*
    *  获取分类标签
    */
   static getTag() {
       return new Promise((resolve,reject) =>{
           let sql = 'SELECT * FROM category ORDER BY `index`'
           this.query(sql).then(results =>{
               resolve(results)
           }).catch(err =>{
               console.log('失败' + err.message);
               reject(err)
           })
       }
    )}


    /*
    *  获取分类下的内容
    */
   static getConByCid(cid) {
    return new Promise((resolve,reject) =>{
        let sql = 'SELECT * FROM article WHERE cid =?'
        this.query(sql,cid).then(results =>{
            resolve(results)
        }).catch(err =>{
            console.log('失败' + err.message);
            reject(err)
        })
    }
 )}

    
}