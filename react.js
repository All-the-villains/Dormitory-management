'use strict'

const titbit = require('titbit')
const pg = require('pg')

const app = new titbit()
let pdb = new pg.Pool({
    database : 'test',
    user : 'mayueying',
    password : '1234567',
    host : '127.0.0.1',
    max : 100
})

app.post('/sadd',async c =>{
    try{
        let data = JSON.parse(c.body)
	let sql = 'INSERT INTO store(sid,sname,sshopname,stel,spic,sadd,latitude,longitude) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)'
	let result = await pdb.query(sql,[data.sid,data.sname,data.sshopname,data.stel,data.spic,data.sadd,data.latitude,data.longitude])
	if (result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
    }catch(err){
	c.send('failed',400)
    }
})

app.get('/store',async c=>{
    try{
	console.log('test')
	let sql = 'SELECT * FROM store'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/sdel',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM store WHERE sid = ($1)'
        let result = await pdb.query(sql,[data.sid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/scha',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'UPDATE store SET stel = ($1) where sid = ($2)'
        let result = await pdb.query(sql,[data.stel,data.sid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/comadd',async c =>{
    try{
        let data = JSON.parse(c.body)
	let sql = 'INSERT INTO comment(cid,cname,cshid,ctext) VALUES ($1,$2,$3,$4)'
	let result = await pdb.query(sql,[data.cid,data.cname,data.cshid,data.ctext])
	if (result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
    }catch(err){
	c.send('err',400)
    }
})

app.get('/comment',async c=>{
    try{
	let sql = 'SELECT * FROM comment'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/delcom',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM comment WHERE cid = ($1)'
        let result = await pdb.query(sql,[data.cid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/searchname/:str',async c =>{
    try{ 
        let str = c.param.str
        let strc = decodeURI(str)
        let sql = `(SELECT * FROM (share left join image on share.imgid=image.imgid) WHERE shname LIKE '${strc}') order by stime desc` 
        let result = await pdb.query(sql)
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return 
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/searchid/:str',async c =>{
    try{
        let str = c.param.str
        let strc = decodeURI(str)
        let sql = `SELECT * FROM comment WHERE cshid LIKE '${strc}'`
        let result = await pdb.query(sql)
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/searchdetail/:str',async c =>{
    try{
        let str = c.param.str
        let strc = decodeURI(str)
        let sql = `SELECT * FROM (share left join image on share.imgid=image.imgid) WHERE shid LIKE '${strc}'`
        let result = await pdb.query(sql)
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/gadd',async c =>{
    try{
        let data = JSON.parse(c.body)
	let sql = 'INSERT INTO good(gid,gimgsrc,gtitle,gresidue,gunit,gprice,gbutton,gsid,gstatus) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)'
	let result = await pdb.query(sql,[data.gid,data.gimgsrc,data.gtitle,data.gresidue,data.gunit,data.gprice,data.gbutton,data.gsid,data.gstatus])
	if (result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
    }catch(err){
	c.send('err',400)
    }
})

app.get('/good',async c=>{
    try{
	let sql = 'SELECT * FROM good'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/gdel',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM good WHERE gid = ($1)'
        let result = await pdb.query(sql,[data.gid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/gchap',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'UPDATE good SET gprice = ($1) where gid = ($2)'
        let result = await pdb.query(sql,[data.gprice,data.gid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/gchas',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'UPDATE good SET gresidue = ($1) where gid = ($2)'
        let result = await pdb.query(sql,[data.gresidue,data.gid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/search/:str',async c =>{
    try{ 
        let str = c.param.str
        let strc = decodeURI(str)
        let sql = `SELECT * FROM store WHERE sid IN (SELECT gsid FROM good WHERE gtitle LIKE '%${strc}%')`
        let result = await pdb.query(sql)
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return 
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
}) 

app.post('/iadd',async c =>{
    try{
        let data = JSON.parse(c.body)
	let sql = 'INSERT INTO image(imgid,pic1,pic2,pic3) VALUES ($1,$2,$3,$4)'
	let result = await pdb.query(sql,[data.imgid,data.pic1,data.pic2,data.pic3])
	if (result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
    }catch(err){
	c.send('failed',400)
    }
})

app.get('/image',async c=>{
    try{
	let sql = '(select * from share left join image on share.imgid=image.imgid) order by stime desc'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/idel',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM image WHERE imgid = ($1)'
        let result = await pdb.query(sql,[data.imgid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/texadd',async c =>{
    try{
        let data = JSON.parse(c.body)
	let sql = 'INSERT INTO text(tid,sid,text,ttime) VALUES ($1,$2,$3,$4)'
	let result = await pdb.query(sql,[data.tid,data.sid,data.text,data.ttime])
	if (result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
    }catch(err){
	c.send('failed',400)
    }
})

app.get('/text',async c=>{
    try{
	let sql = 'SELECT * FROM text'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/deltext',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM text WHERE tid = ($1)'
        let result = await pdb.query(sql,[data.tid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/chatext',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'UPDATE text SET text = ($1) where tid = ($2)'
        let result = await pdb.query(sql,[data.text,data.tid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/usadd',async c =>{
    try{
        let data = JSON.parse(c.body)
	let sql = 'INSERT INTO ulist(usid,ustime,ustate,uma,uprice) VALUES ($1,$2,$3,$4,$5)'
	let result = await pdb.query(sql,[data.usid,data.ustime,data.ustate,data.uma,data.uprice])
	if (result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
    }catch(err){
	c.send('failed',400)
    }
})

app.get('/list',async c=>{
    try{
	let sql = 'SELECT * FROM ulist'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/usdel',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM ulist WHERE usid = ($1)'
        let result = await pdb.query(sql,[data.usid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/uscha',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'UPDATE ulist SET ustate = ($1) where usid = ($2)'
        let result = await pdb.query(sql,[data.ustate,data.usid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/shadd',async c =>{
    try{
        let data = JSON.parse(c.body)
	let sql = 'INSERT INTO share(shid,shname,shimg,shtext,imgid,stime) VALUES ($1,$2,$3,$4,$5,$6)'
	let result = await pdb.query(sql,[data.shid,data.shname,data.shimg,data.shtext,data.imgid,data.stime])
	if (result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
    }catch(err){
	c.send('failed',400)
    }
})

app.get('/share',async c=>{
    try{
	let sql = 'SELECT * FROM share'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/delshare',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM share WHERE shid = ($1)'
        let result = await pdb.query(sql,[data.shid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/uadd',async c =>{
    try{
        let data = JSON.parse(c.body)
	let sql = 'INSERT INTO use(uid,uname,utel,uadd,uaddde) VALUES ($1,$2,$3,$4,$5)'
	let result = await pdb.query(sql,[data.uid,data.uname,data.utel,data.uadd,data.uaddde])
	if (result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
    }catch(err){
	c.send('failed',400)
    }
})

app.get('/user',async c=>{
    try{
	let sql = 'SELECT * FROM use'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/udel',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM use WHERE uid = ($1)'
        let result = await pdb.query(sql,[data.uid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/ucha',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'UPDATE use SET utel = ($1) where uid = ($2)'
        let result = await pdb.query(sql,[data.utel,data.uid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/dadd',async c =>{
    try{
        let data = JSON.parse(c.body)
	let sql = 'INSERT INTO detail(usid,gid,dsum,dstate,sid,dtime,dma) VALUES ($1,$2,$3,$4,$5,$6,$7)'
	let result = await pdb.query(sql,[data.usid,data.gid,data.dsum,data.dstate,data.sid,data.dtime,data.dma])
	if (result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
    }catch(err){
	c.send('failed',400)
    }
})

app.get('/detail',async c=>{
    try{
	let sql = 'select * from detail order by dtime desc'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/deldet',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM detail WHERE usid = ($1)'
        let result = await pdb.query(sql,[data.usid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/chadet',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'UPDATE detail SET dstate = ($1) where usid = ($2)'
        let result = await pdb.query(sql,[data.dstate,data.usid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})
app.use(async (c,next)=>{
    c.setHeader('access-control-allow-orgin','*')

    c.setHeader(
        'access-control-allow-methods',
        ['GET','POST','OPTIONS','PUT']
    )

    c.setHeader('access-control-allow-headers','content-type')

    await next();
})

app.get('/',async c =>{
    c.setHeader('content-type','text/html;charset=utf-8')
    c.res.body=await c.helper.readb('./pages/upload.html')
})

app.post('/upload',async c =>{
    let f = c.getFile('file')
    let ext_name = c.helper.extName(f.filename)
    let fname = `${c.helper.makeName()}${ext_name}`
    await c.moveFile(f,`./images/${fname}`)
    c.send(fname);
})

app.get('/image/*',async c =>{
    try{
	let imgName = c.param.starPath
	let ctype = 'image/jpeg'
	if(imgName.indexOf('.png'>0)){
            ctype = 'image/png'
        }else if(imgName.indexOf('.gif'>0)){
            ctype = 'image/gif' 
        }else if(imgName.indexOf('.webp'>0)){
            ctype = 'image/webp'
        }
	c.setHeader('content-type',ctype)
        c.res.body=await c.helper.readb(`./images/${imgName}`)
    }catch(err){
        c.status(404);
    }
})

app.post('/searchstore/:str',async c =>{
    try{
        let str = c.param.str
        let strc = decodeURI(str)
        let sql = `SELECT * FROM good WHERE gsid LIKE '${strc}'`
        let result = await pdb.query(sql)
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/searcht/:str',async c =>{
    try{
        let str = c.param.str
        let strc = decodeURI(str)
        let sql = `SELECT * FROM text WHERE sid LIKE '${strc}'`
        let result = await pdb.query(sql)
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/searchd/:str',async c =>{
    try{
        let str = c.param.str
        let strc = decodeURI(str)
        let sql = `SELECT * FROM detail WHERE sid LIKE '${strc}'`
        let result = await pdb.query(sql)
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})
app.post('/stucha/:id/:img',async c=>{
    try{
	let id = c.param.id
	let str = c.param.img
	let idc = decodeURI(id)
	let strc = decodeURI(str)
	let sql = `UPDATA student SET stuimg = '${strc}' where stuid = '${idc}'`
	let result = await pdb.query(sql)
	if(result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
     }catch(err){
	c.send('现在出问题可以找我',400)
     }
}) 

app.post('/stuadd/:id/:pass/:name/:sex/:accnum/:img/:nick/:build',async c =>{
    try{
	let id = c.param.id
        let pass = c.param.pass
        let name = c.param.name
        let sex = c.param.sex
        let accnum = c.param.accnum
        let img = c.param.img
	let nick = c.param.nick
        let idc = decodeURI(id)
        let passc = decodeURI(pass)
        let namec = decodeURI(name)
        let sexc = decodeURI(sex) 
        let accnumc = decodeURI(accnum)
        let imgc = decodeURI(img)
	let nickc = decodeURI(nick)
	let buildc = decodeURI(build)
	let sql = `INSERT INTO student(stuid,stupass,stuname,stusex,stuaccnum,stuimg,stunick,stubui) VALUES ('${idc}','${passc}','${namec}','${sexc}','${schc}','${accnumc}','${imgc}','${nickc}','${buildc}')`
	let result = await pdb.query(sql)
	if (result.rowCount<= 0){
	    c.send('failed register',400)
	    return
	}
	c.send('ok')
    }catch(err){
	c.send('现在有问题可以找我',400)
    }
})

app.get('/student',async c=>{
    try{
	let sql = 'SELECT * FROM student'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/monadd/:id/:name/:accnum/:money/:img/:stuid',async c =>{
    try{
        let id = c.param.id
        let name = c.param.name
	let accnum = c.param.accnum
	let money = c.param.money
	let img = c.param.img
	let stuid = c.param.stuid
        let idc = decodeURI(id)
        let namec = decodeURI(name)        
        let accnumc = decodeURI(accnum)
	let moneyc = decodeURI(money)
        let imgc = decodeURI(img)
	let stuidc = decodeURI(stuid)        
	let sql = `INSERT INTO student(mid,mname,mmoney,mstuid,maccnum,mimg) VALUES ('${idc}','${namec}','${moneyc}','${stuidc}','${accnumc}','${imgc}')`        
	let result = await pdb.query(sql)
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.get('/money',async c=>{
    try{
	let sql = 'SELECT * FROM money'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/fixadd/:id/:name/:accnum/:happen/:img/:stuid',async c =>{
    try{
        let id = c.param.id
        let name = c.param.name
        let accnum = c.param.accnum
        let happen = c.param.happen
        let img = c.param.img
        let stuid = c.param.stuid
        let idc = decodeURI(id)
        let namec = decodeURI(name)
        let accnumc = decodeURI(accnum)
        let happenc = decodeURI(happen)
        let imgc = decodeURI(img)
        let stuidc = decodeURI(stuid)
        let sql = `INSERT INTO student(fid,fstuid,fname,fhappen,faccnum,fimg) VALUES ('${idc}','${stuidc}','${namec}','${happenc}','${accnumc}','${imgc}')`
        let result = await pdb.query(sql)
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.get('/fix',async c=>{
    try{
	let sql = 'SELECT * FROM fix'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/actadd/:id/:time/:title/:period/:text',async c =>{
    try{
        let id = c.param.id
        let time = c.param.time
        let title = c.param.title
        let period = c.param.period
        let text = c.param.text
        let idc = decodeURI(id)
        let timec = decodeURI(time)
        let titlec = decodeURI(title)
        let periodc = decodeURI(period)
        let textc = decodeURI(text)
        let sql = `INSERT INTO student(aid,atime,atitle,aperiod,atext) VALUES ('${idc}','${timec}','${titlec}','${periodc}','${textc}')`
        let result = await pdb.query(sql)
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.get('/activity',async c=>{
    try{
	let sql = 'SELECT * FROM activity'
	let result = await pdb.query(sql)
	if(result.rowCount<=0){
	   c.send('failed register',400)
	   return
	}
	c.send(result.rows)
    }catch(err){
	c.send('failed',400)
    }
})

app.post('/delstu',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM student WHERE stuid = ($1)'
        let result = await pdb.query(sql,[data.stuid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/delmoney',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM money WHERE mid = ($1)'
        let result = await pdb.query(sql,[data.mid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/delfix',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM fix WHERE fid = ($1)'
        let result = await pdb.query(sql,[data.fid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/delact',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM activity WHERE aid = ($1)'
        let result = await pdb.query(sql,[data.aid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.run(6666)