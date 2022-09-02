const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const router = new Router();

const configIndex = require('../index');

router.post('/upload', async (ctx)=>{
  const file = ctx.request.files.file;

  // 接收读出流
  const reader = fs.createReadStream(file.filepath);
  // 创建写入流 
  // 3. 指定图片路径文件名（即上传图片存储目录）
  const stream = fs.createWriteStream(path.join('./temp/', file.newFilename));
  // 用管道将读出流 "倒给" 输入流
  reader.pipe(stream)
  // 4.打印上传文件在服器上存储的相对路径 
  console.log('uploading %s -> %s', file.newFilename, stream.path);
  // 5.重定向到基于根目录下的静态资源web访问路径，展示图片
  
  ctx.body = {
    code: 0,
    msg: '',
    data: {
      url: file.newFilename
    }
  };
});

router.post('/make', async (ctx)=>{
  const res = await configIndex(ctx.request.body);
  ctx.body = {
    code: 0,
    msg: '',
    data: {
      url: res
    }
  };
});

router.get('/clash/:filename', async (ctx)=>{
  const { filename } = ctx.params;
  const sub = fs.readFileSync(path.join('./temp', filename));
  ctx.body = sub.toString();
});

module.exports = router;