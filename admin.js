const express = require('express')
const md5 = require('blueimp-md5')
const AdminUser = require('./model/admin/user')
const Notice = require('./model/notice')
const Users = require('./model/users')
const Feedback =require('./model/admin/feedback')
const Violation = require('./model/admin/violation')
const admin = express.Router()

admin.get('/Aadmin/login',(req,res)=>{
    res.render('admin/login.html')
})
admin.post('/Aadmin/login',(req,res,next)=>{
    let username = req.body.username
    let password = md5(md5(req.body.password))
    console.log(username,password);
    AdminUser.login(username,password).then(result =>{
        console.log(result);
        if(result!=undefined) {
            req.session.Auser = result
            res.status(200).json({
                code:0,
                mess:'登录成功',
            })
        }else{
            res.status(200).json({
                code:1,
                mess:'用户名或者密码错误'
            })
        }
    }).catch(err =>{
        next(err)
    })
})
admin.get('/Aadmin',(req,res)=>{
    let Auser = req.session.Auser
    res.render('admin/index.html',{
        Auser
    })
})
admin.get('/Aadmin/notice',(req,res)=>{
    res.render('admin/notice.html')
})
admin.post('/Aadmin/notice',(req,res,next)=>{
    let n_title = req.body.n_title
    let n_content = req.body.n_content
    let n_time = req.body.n_time
    Notice.addNotice(n_title,n_content,n_time).then(result =>{
        if(result.affectedRows===1){
            res.status(200).json({
                code:0,
                mess:'添加成功'
            })
        }else{
            res.status(200).json({
                code:1,
                mess:'添加失败'
            })
        }
    }).catch(err =>{
        next(err)
    })
})
admin.get('/Aadmin/Anotice',(req,res,next)=>{
    Notice.getnotice().then(result =>{
        let notice = result
        res.render('admin/Anotice.html',{
            notice
        })
    }).catch(err =>{
        next(err)
    })
})
admin.post('/Aadmin/Anotice',(req,res,next)=>{
   let nid = req.body.nid
   Notice.deleteNoticeById(nid).then(result =>{
       if(result.affectedRows===1){
           res.status(200).json({
               code:0,
               mess:'删除成功'
           })
       }else{
           res.status(200).json({
               code:1,
               mess:'删除失败'
           })
       }
   }).catch(err =>{
       next(err)
   })
})
admin.get('/Aadmin/ban',(req,res,next)=>{
    let index = parseInt(req.query.index)
    if(index===1){
        let sta = '已封禁'
        Users.getUnomUser(sta).then(result =>{
            console.log(result);
            let ban = result
            res.render('admin/ban.html',{
                ban
            })
        }).catch(err =>{
            next(err)
        })
    }else{
        let sta = '正常'
        Users.getNomUser(sta).then(result =>{
            let user = result
            res.render('admin/ban.html',{
                user
            })
        }).catch(err =>{
            next(err)
        })
    }   
})
admin.post('/Aadmin/ban',(req,res,next)=>{
    let UserSta = req.body.sta
    let username = req.body.username
    if(UserSta.length<3){
        let sta = '已封禁'
        Users.updateTfUser(sta,username).then(result =>{
            console.log(result);
            if(result.affectedRows===1){
                res.status(200).json({
                    code:0,
                    mess:'封禁成功'
                })
            }else{
                res.status(200).json({
                    code:1,
                    mess:'封禁失败'
                })
            }
        }).catch(err =>{
            next(err)
        })
    }else{
        let sta = '正常'
        Users.updateTfUser(sta,username).then(result =>{
            console.log(result);
            if(result.affectedRows===1){
                res.status(200).json({
                    code:0,
                    mess:'解封成功'
                })
            }else{
                res.status(200).json({
                    code:1,
                    mess:'解封失败'
                })
            }
        }).catch(err =>{
            next(err)
        })
    }

})
admin.get('/Aadmin/vio',(req,res,next)=>{
    let index = parseInt(req.query.index)
    if(index===1){
        let sta = '违规'
        Violation.getA(sta).then(result =>{
            console.log(result);
            let art = result
            res.render('admin/violation.html',{
                art
            })
        }).catch(err =>{
            next(err)
        })
    }else{
        let sta = '正常'
        Violation.getA(sta).then(result =>{
            let allart = result
            res.render('admin/violation.html',{
                allart
            })
        }).catch(err =>{
            next(err)
        })
    }
    
})
admin.post('/Aadmin/vio',(req,res,next)=>{
    let sss = req.body.sss
    if(sss.length<3){
        let id = parseInt(req.body.id)
        console.log(id);
        let sta = '违规'
        Violation.setW(sta,id).then(result =>{
            console.log(result);
            if(result.affectedRows===1){
                res.status(200).json({
                    code:0,
                    mess:'设置成功'
                })
            }else{
                res.status(200).json({
                    code:1,
                    mess:'设置失败'
                })
            }
        }).catch(err =>{
            next(err)
        })
    }else{
        let id = parseInt(req.body.id)
        console.log(id);
        let sta = '正常'
        Violation.setW(sta,id).then(result =>{
            console.log(result);
            if(result.affectedRows===1){
                res.status(200).json({
                    code:0,
                    mess:'解除成功'
                })
            }else{
                res.status(200).json({
                    code:1,
                    mess:'解除失败'
                })
            }
        }).catch(err =>{
            next(err)
        })
    }
})
admin.get('/Aadmin/feedback',(req,res,next)=>{
    let index = parseInt(req.query.index)
    if(index===1){
        let sta = '已处理'
        Feedback.getFeedback(sta).then(result =>{
            console.log(result);
            let Ofeedback = result
            res.render('admin/feedback.html',{
                Ofeedback
            })
        }).catch(err =>{
            next(err)
        })
    }else{
        let sta = '未处理'
        Feedback.getFeedback(sta).then(result =>{
            let Nfeedback = result
            res.render('admin/feedback.html',{
                Nfeedback
            })
        }).catch(err =>{
            next(err)
        })
    }   
})
admin.post('/Aadmin/feedback',(req,res,next)=>{
    res.render('admin/feedback.html')
})
admin.get('/Aadmin/handle',(req,res)=>{
    let uf_id = req.query.handleId
    Feedback.handleFeed(uf_id).then(result =>{
        let handle = result[0]
        console.log(handle);
        res.render('admin/handle.html',{
            handle
        })
    }).catch(err =>{
        next(err)
    })
})
admin.post('/Aadmin/handle',(req,res,next)=>{
    let uf_id = req.body.uf_id
    let opt = '已处理'
    Feedback.handleChange(opt,uf_id).then(result =>{
        console.log(result);
        if(result.affectedRows===1){
            res.status(200).json({
                code:0,
                mess:'处理成功'
            })
        }else{
            res.status(200).json({
                code:1,
                mess:'处理异常'
            })
        }
    }).catch(err =>{
        next(err)
    })
})
admin.post('/feedback',(req,res,next)=>{
    let nickname = req.body.username
    let rellyname = req.body.rellyName
    let uf_email = req.body.email
    let uf_cont = req.body.message
    let plate = req.body.plate
    console.log(nickname,plate,uf_cont,uf_email,rellyname);
    Feedback.inFeedData(nickname,plate,uf_cont,uf_email,rellyname).then(result =>{
        console.log(result);
        if(result.affectedRows===1){
            res.status(200).json({
                code:0,
                mess:'反馈成功'
            })
        }else{
            res.status(200).json({
                code:1,
                mess:'反馈失败'
            })
        }
    }).catch(err =>{
        next(err)
    })
})
admin.get('/Aadmin/logout',(req,res)=>{
    req.session.Auser = null
    res.redirect('/Aadmin/login')
})
admin.get('/aindex',(req,res)=>{
    res.render('admin/aindex.html')
})
module.exports = admin