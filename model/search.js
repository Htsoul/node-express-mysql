/*
*  用户搜索模型
*/

module.exports = class Search extends require('./model') {
    
    static sear(keyword) {
        return new Promise((resolve,reject) => {
            let sql = 'SELECT id,title, content,`time`,hits FROM article WHERE title LIKE ? ORDER BY TIME DESC '
            this.query(sql,`%${keyword}%`).then(results =>{
                resolve(results)
            }).catch(err =>{
                console.log(err.message);
                reject(err)
            }) 
        })
        
    }
}