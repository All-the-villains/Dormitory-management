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

app.post('/imagechange',async c=>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'UPDATE student SET stuimg =($1) where stuid =($2)'
        let result = await pdb.query(sql,[data.stuimg,data.stuid])
        console.log(4)
        if(result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
     }catch(err){
        c.send('err',400)
     }
})

app.get('/student',async c=>{
    try{
        let sql = 'SELECT * FROM student'
        let result = await pdb.query(sql)
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/monadd',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'INSERT INTO money(mid,mname,mmoney,mstuid,maccnum,mkind,mbuild,mtime) VALUES($1,$2,$3,$4,$5,$6,$7,$8)'
        let result = await pdb.query(sql,[data.mid,data.mname,data.mmoney,data.mstuid,data.maccnum,data.mkind,data.mbuild,data.mtime])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('加入钱ok')
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

app.post('/fixadd',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'INSERT INTO fix(fid,fstuid,fname,fhappen,faccnum,fkind,fbuild,ftime) VALUES($1,$2,$3,$4,$5,$6,$7,$8)'
        let result =await pdb.query(sql,[data.fid,data.fstuid,data.fname,data.fhappen,data.faccnum,data.fkind,data.fbuild,data.ftime])
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

app.post('/actadd',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'INSERT INTO activity(aid,atime,atitle,aperiod,atext) VALUES($1,$2,$3,$4,$5)'
        let result =await pdb.query(sql,[data.aid,data.atime,data.atitle,data.aperiod,data.atext])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('okk')
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

app.post('/bbbadd',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'INSERT INTO bbbb(bid,bname,bimg,bstu,btime,btext,brep) VALUES($1,$2,$3,$4,$5,$6,$7)'
        let result = await pdb.query(sql,[data.bid,data.bname,data.bimg,data.bstu,data.btime,data.btext,data.brep])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.get('/bbbb',async c=>{
    try{
        let sql = 'SELECT * FROM bbbb'
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

app.post('/delbbbb',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM bbbb WHERE bid = ($1)'
        let result = await pdb.query(sql,[data.bid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/manadd',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'INSERT INTO manage(maid,maimg,maname,matel,mabuild) VALUES($1,$2,$3,$4,$5)'
        let result = await pdb.query(sql,[data.maid,data.maimg,data.maname,data.matel,data.mabuild])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.get('/manage',async c=>{
    try{
        let sql = 'SELECT * FROM manage'
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

app.post('/delman',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM manage WHERE maid = ($1)'
        let result = await pdb.query(sql,[data.maid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/toadd',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'INSERT INTO todolist(toid,tostuid,totime,tores) VALUES($1,$2,$3,$4)'
        let result = await pdb.query(sql,[data.toid,data.tostuid,data.totime,data.tores])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.get('/todolist',async c=>{
    try{
        let sql = 'SELECT * FROM todolist'
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

app.post('/delto',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM todolist WHERE toid = ($1)'
        let result = await pdb.query(sql,[data.toid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/namechange',async c=>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'UPDATE student SET stunick =($1) where stuid =($2)'
        let result = await pdb.query(sql,[data.stunick,data.stuid])
        if(result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
     }catch(err){
        c.send('err',400)
     }
})

app.post('/searchstudent',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'select * from student where stuid=($1)'
        let result = await pdb.query(sql,[data.stuid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/searchmoney',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'select * from money where mstuid=($1)'
        let result = await pdb.query(sql,[data.mstuid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/searchfix',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'select * from fix where fstuid=($1)'
        let result = await pdb.query(sql,[data.fstuid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/searchbbbb',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'select * from bbbb where bstu=($1)'
        let result = await pdb.query(sql,[data.bstu])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})
app.post('/searchtodolist',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'select * from todolist where tostuid=($1)'
        let result = await pdb.query(sql,[data.tostuid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/readd',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'INSERT INTO reply(rid,rname,rbbb,rtext) VALUES($1,$2,$3,$4)'
        let result = await pdb.query(sql,[data.rid,data.rname,data.rbbb,data.rtext])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/reply',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'SELECT * FROM reply WHERE rbbb = ($1)'
        let result = await pdb.query(sql,[data.rbbb])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send(result.rows)
    }catch(err){
        c.send('failed',400)
    }
})

app.post('/delre',async c =>{
    try{
        let data = JSON.parse(c.body)
        let sql = 'DELETE FROM reply WHERE rid = ($1)'
        let result = await pdb.query(sql,[data.rid])
        if (result.rowCount<= 0){
            c.send('failed register',400)
            return
        }
        c.send('ok')
    }catch(err){
        c.send('failed',400)
    }
})

app.run(5566)