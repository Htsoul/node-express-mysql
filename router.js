const express = require('express')
const uploadFile = require('./middleware/uploadFile')
const md5 = require('blueimp-md5')
const User = require('./model/users')
const Article = require('./model/article')
const Search = require('./model/search')
const Notice = require('./model/notice')
const Thumbs = require('./model/thubms')
const Collect = require('./model/collect')
const Comment = require('./model/comment')
const Category = require('./model/category')
const UserMain = require('./model/userMain')
const router = express.Router()

router.get('/', (req,res,next)=>{
    Notice.getnotice().then(results =>{
        let notice = results
        Category.getTag().then(result =>{
           let category = result 
        Category.getConByCid(0).then(result =>{
            let hot = result
            res.render('index.html',{
                user:req.session.user,
                notice,
                hot,
                category
            })
        }).catch(err =>{
            next(err)
        })
    }).catch(err =>{
        next(err)
    })  
}).catch(err =>{
    next(err)
})    
})
router.get('/list',(req,res,next)=>{
    let cid = req.query.cid
    Notice.getnotice().then(results =>{
        let notice = results
        Category.getTag().then(result =>{
           let category = result 
            Category.getConByCid(cid).then(result =>{
                console.log(result);
                let article = result
            res.render('list.html',{
                user:req.session.user,
                notice,
                article,
                category
            })
        }).catch(err =>{
            next(err)
        })
    }).catch(err =>{
        next(err)
    })  
    }).catch(err =>{
        next(err)
    })   
})
router.get('/login', (req,res)=>{
    res.render('login.html',{
        msg:''
    })
})
router.post('/login', (req, res, next) => {
    console.log('8************************************************************************',res);
    let email = req.body.email
    let password = md5(md5(req.body.password))
    User.login(email, password).then(results => {
        console.log(results);
        if (results!=undefined) {
            User.Isban(email).then(result =>{
                console.log(result);
                let statu = result[0].statu
                if(statu.length>2){
                    res.status(200).json({
                        code:2,
                        mess:'用户已被封禁'
                    
                    })
                }else{
                    req.session.user = results
                    res.status(200).json({
                        code:0,
                        mess:'登录成功',
                        username: results.username
                    })
                }
            })
            
        } else {
           res.status(200).json({
               code:1,
               mess:'邮箱或密码错误'
           })
        }
    }).catch(err => {
        next(err)
    })
})
router.get('/register', (req,res)=>{
    res.render('register.html')
})
router.post('/register', (req, res, next) => {
    let username = req.body.username
    let email = req.body.email
    let password = md5(md5(req.body.password))
    let avatar = 'upload/user.png'
    console.log(username,email,password,avatar);
    User.check(username,email).then(result =>{
        if(result[0]!=undefined){
            res.status(200).json({
                code:1,
                mess:'邮箱或用户名已经存在！'
            })
        }else{
            User.register(username,email, password,avatar).then(results => {
                if (results.affectedRows!=0) {
                    res.status(200).json({
                        code:0,
                        mess:'注册成功'
                    })
                }else{
                    res.status(200).json({
                        code:2,
                        mess:'服务器繁忙'
                    })
                }
            }).catch(err => {
                next(err)
            })
        }
        
    }).catch(err =>{
        next(err)
    })
    
    
})
router.get('/logout', (req, res) =>{
    res.redirect('/login')
  })
router.get('/changepwd', (req,res)=>{
    res.render('changepwd.html', {
        user: req.session.user
    })
})
router.post('/changepwd',(req,res,next)=>{
    let username = req.body.username
    let password = md5(md5(req.body.password))
    let subpassword = md5(md5(req.body.subpassword))
    console.log(username,password,subpassword);
    User.checkpwd(username,password).then(result =>{
        if(result[0]===undefined){
            res.status(200).json({
                code:2,
                mess:'原密码不正确！'
            })
        }else{
            User.update(subpassword,username).then(results =>{
                console.log(results);
                if(results.affectedRows!=0){
                    res.status(200).json({
                        code:0,
                        mess:'修改成功'
                    })
                    req.session.user = null
                }else{
                    res.status(200).json({
                        code:1,
                        mess:'服务器繁忙！'
                    })
                }
            })
        }
    })
    
})
router.get('/changeAvater', (req,res)=>{
    res.render('changeAvater.html')
})
router.post('/upload', uploadFile, (req,res,next)=>{
    var avater = 'upload/'+req.body.photo
    var username =req.body.username
    User.avatar(avater,username).then(results =>{
        if(results.affectedRows!=0){
            res.render('index.html',{
                user : req.session.user
            })
        }else{
            res.send('服务器繁忙！')
        }
    })
    
})
router.get('/article', (req,res)=>{
    let user = req.session.user
    res.render('article.html',{
        user
    })
})
router.get('/writeArticle',(req,res)=>{
    res.render('article/writeArticle.html')
})
router.post('/writeArticle',(req,res,next)=>{
    let title = req.body.title
    let content = req.body.content
    let time = req.body.time
    let cid = req.body.cid
    let hot = 0
    let hits = 0
    let username = req.session.user.username
    User.getid(username).then(results =>{
        let user_id = results[0].id
        console.log(title,content,time,hot,hits,username,user_id,cid);
       Article.writeArticle(title,content,time,user_id,hot,hits,cid).then(result =>{
           if(result.affectedRows!=0){
               res.status(200).json({
                   code:0,
                   mess:'发表成功！'
               })
           }else{
               res.status(200).json({
                   code:1,
                   mess:'发表失败！服务器繁忙'
               })
           }
       }).catch(err =>{
           next(err)
       })
    }).catch(err=>{
        next(err)
    })
})
router.get('/search',(req,res,next)=>{
    let keyword = req.query.search
    Search.sear(keyword).then(result =>{
        req.session.serart = result
        let serart = req.session.serart
        let sear = serart.length
        let user = req.session.user
        console.log(serart,sear,user);
        if(sear === 0){
            res.render('search.html',{
                message : '暂时找不到内容!',sear
            })
        }else{
            res.render('search.html',{
                serart,sear,user
            })
        }
    }).catch(err =>{
        next(err)
    })
})
router.get('/article/detail',(req,res,next)=>{
    var id = parseInt(req.query.id)
    Article.getDetail(id).then(result =>{
        let detail = result[0]
        let hit = detail.hits
        let user_id = result[0].user_id
        User.getname(user_id).then(results =>{
            let users = results[0]
            let hits = hit+1
            Comment.getComm(id).then(result =>{
               let comment = result
               /* var userr = new Array()
               result.forEach((item,index)=>{
                   userr.push(item.user_id)
               })
               User.getUs(userr).then(result =>{
                   console.log(result);
                   let commUser = result
                   console.log(commUser); */
                Article.gethits(hits,id).then(result =>{
                let user = req.session.user
                if(!user){
                    res.render('detail.html',{
                        detail,users,comment,user_id
                    })
                }else{
                    let u_id = user.id
                    Thumbs.althub(id,u_id).then(result=>{
                        let zan = result
                        Collect.alCollect(id,u_id).then(result=>{
                            let collect = result
                            console.log(collect);
                            res.render('detail.html',{
                                detail,users,zan,collect,comment,user_id
                            })
                        })
                    }).catch(err=>{
                        next(err)
                    })
                }
            }).catch(err =>{
                next(err)
            }) 
            }).catch(err=>{
                next(err)
            })
        }).catch(err =>{
            next(err)
        })
            
       /*  }).catch(err =>{
            next(err)
        }) */

    }).catch(err =>{
        next(err)
    })
})
router.post('/article/detail',(req,res,next)=>{
    let art_id = req.body.art_id
    let username = req.body.username
    let comment = req.body.comment
    User.getid(username).then(result =>{
        let user_id = result[0].id
        if(comment!= null){
        Comment.comm(art_id,comment,user_id).then(result =>{
            let comment = result
            if(comment.affectedRows!=1){
                res.status(200).json({
                    code:1,
                    mess:'发表失败！'
                })
            }else if(comment.affectedRows=1){
                res.status(200).json({
                    code:0,
                    mess:'发表成功！'
                })
            }
        }).catch(err=>{
            next(err)
        })
        }else{
            Thumbs.thub(art_id,user_id).then(result =>{
            let tthub = result
            Thumbs.getHub(art_id).then(result =>{
                let thub = result[0].thub + 1
            Thumbs.updateHub(thub,art_id).then(result =>{
                console.log(result);
            Collect.collect(art_id,user_id).then(result =>{
                if(tthub.affectedRows!=1){
                    res.status(200).json({
                        code:1,
                        mess:'点赞失败！'
                    })
                }else if(tthub.affectedRows=1){
                    res.status(200).json({
                        code:0,
                        mess:'点赞成功！'
                    })
                }
                else if(result.affectedRows!=1){
                    res.status(200).json({
                        code:1,
                        mess:'收藏失败！'
                    })
                }else if(result.affectedRows=1){
                    res.status(200).json({
                        code:0,
                        mess:'收藏成功！'
                    })
                }
            }).catch(err=>{
                next(err)
            })
        }).catch(err =>{
            next(err)
        })
    }).catch(err =>{
        next(err)
    })
}).catch(err =>{
    next(err)
})
        }
        
    }).catch(err =>{
        next(err)
    })
    
})
router.get('/notice',(req,res,next)=>{
    Notice.getnotice().then(result =>{
        let gg = result
        res.render('notice.html',{
            gg
        })

    }).catch(err =>{
        next(err)
    })
})
router.get('/article/home', (req,res,next)=>{
    let username = req.session.user.username
    let index = parseInt(req.query.id)
    console.log(username,index);
    UserMain.getU_tag().then(result =>{
        let userMain= result
    User.getid(username).then(results =>{
        let user_id = results[0].id
        if(index===1){
            UserMain.getWD(user_id).then(result =>{
                console.log(result);
                let article = result
                res.render('article/home.html',{
                    article,userMain
                })
            }).catch(err =>{
                next(err)
            })
        
        }else if(index===2){
            Thumbs.getArt(user_id).then(result =>{
                var arr = new Array()
                result.forEach((item,index)=>{
                    arr.push(item.art_id)
                })
                console.log(arr);
                Article.getArt(arr).then(result =>{
                    let article = result
                    res.render('article/home.html',{
                        article,userMain
                    })
                }).catch(err =>{
                    next(err)
                })
            }).catch(err =>{
                next(err)
            })
        }else if(index===3){
            Collect.getCollect(user_id).then(result =>{
                var arr = new Array()
                result.forEach((item,index)=>{
                    arr.push(item.art_id)
                })
                console.log(arr);
                Article.getArt(arr).then(result =>{
                    let article = result
                    res.render('article/home.html',{
                        article,userMain
                    })
                }).catch(err =>{
                    next(err)
                })
            }).catch(err =>{
                next(err)
            })
        }else{
            Article.getArticleByid(user_id).then(results =>{
                let article = results
                    res.render('article/home.html',{
                    article,userMain
                }) 
            }).catch(err =>{
                next(err)
            })
        }
    }).catch(err=>{
        next(err)
    })
}).catch(err =>{
    next(err)
})
})
router.get('/article/mine', (req,res,next)=>{
    let username = req.session.user.username
    User.getid(username).then(results =>{
        let user_id = results[0].id
        Article.getArticleByid(user_id).then(results =>{
            req.session.article = results
            let article = req.session.article
            res.render('article/mine.html',{
                article
            }) 
        }).catch(err =>{
            next(err)
        })
    }).catch(err=>{
        next(err)
    })
})
router.get('/article/comment', (req,res,next)=>{
    let user = req.session.user
    let id = user.id
    console.log(id);
   
        Comment.getComUsById(id).then(result =>{
            console.log(result);
            var arr = new Array()
            result.forEach((item,index)=>{
            arr.push(item.user_id)
        })
        console.log(arr);
        Comment.getCommById(arr).then(result =>{
            let comment = result
            console.log(comment);
            res.render('article/comment.html',{
                comment
            })
        
        
    }).catch(err =>{
        next(err)
    })
}).catch(err =>{
    next(err)
})
})
router.get('/article/thumbs', (req,res,next)=>{
    let user = req.session.user
    let user_id =user.id
    Thumbs.getArt(user_id).then(result=>{
        var arr = new Array()
        result.forEach((item,index)=>{
            arr.push(item.art_id)
        })
        console.log(arr)
        Article.getArt(arr).then(result=>{
            let zan = result
            console.log(zan)
            res.render('article/thumbs.html', {
                zan
            })
        }).catch(err=>{
            next(err)
        })
    }).catch(err=>{
        next(err)
    })
    
})
router.get('/article/collection',(req,res,next)=>{
    let user = req.session.user
    let user_id =user.id
    Collect.getCollect(user_id).then(result=>{
        var arr = new Array()
        result.forEach((item,index)=>{
            arr.push(item.art_id)
        })
        console.log(arr)
        Article.getArt(arr).then(result=> {
            let collection = result
            console.log(collection)
            res.render('article/collection.html', {
                collection
            })
        }).catch(err=>{
            next(err)
        })
    }).catch(err=>{
        next(err)
    })
})
router.get('/main/users',(req,res,next)=>{
    var id = parseInt(req.query.id)
    var index = parseInt(req.query.cid)
    User.getname(id).then(result=>{
        let user  = result[0]
        let username = result[0].username
        UserMain.getU_tag().then(result =>{
            let userMain= result
        User.getid(username).then(results =>{
            let user_id = results[0].id
            if(index===1){
                UserMain.getWD(user_id).then(result =>{
                    console.log(result);
                    let article = result
                    res.render('users.html',{
                        article,userMain,user
                    })
                }).catch(err =>{
                    next(err)
                })
            
            }else if(index===2){
                Thumbs.getArt(user_id).then(result =>{
                    var arr = new Array()
                    result.forEach((item,index)=>{
                        arr.push(item.art_id)
                    })
                    console.log(arr);
                    Article.getArt(arr).then(result =>{
                        let article = result
                        res.render('users.html',{
                            article,userMain,user
                        })
                    }).catch(err =>{
                        next(err)
                    })
                }).catch(err =>{
                    next(err)
                })
            }else if(index===3){
                Collect.getCollect(user_id).then(result =>{
                    var arr = new Array()
                    result.forEach((item,index)=>{
                        arr.push(item.art_id)
                    })
                    console.log(arr);
                    Article.getArt(arr).then(result =>{
                        let article = result
                        res.render('users.html',{
                            article,userMain,user
                        })
                    }).catch(err =>{
                        next(err)
                    })
                }).catch(err =>{
                    next(err)
                })
            }else{
                Article.getArticleByid(user_id).then(results =>{
                    let article = results
                        res.render('users.html',{
                        article,userMain,user
                    }) 
                }).catch(err =>{
                    next(err)
                })
            }
        }).catch(err =>{
            next(err)
        })
    }).catch(err =>{
            next(err)
        })
    }).catch(err =>{
        next(err)
    })
    
})
router.get('/feedback',(req,res)=>{
    let user = req.session.user
    res.render('feedback.html',{
        user
    })
})
router.get('/about', (req,res)=>{
    res.render('about.html')
})
router.get('/ad', (req,res)=>{
    res.render('ad.html')
})
router.get('/ft', (req,res)=>{
    res.render('ft.html')
})
router.get('/privacy', (req,res)=>{
    res.render('privacy.html')
})
router.get('/layout',(req,res)=>{
    req.session.user = null
    res.redirect('/')
})

module.exports = router