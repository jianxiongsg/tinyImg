
var fs = require("fs");
var path = require('path');
var TinyPng = require("./tinypng");

function tinyImgWithPath(srcFolder){
    if (!fs.existsSync(srcFolder)) {
        return;
    }
    function finder(filepath) {
        let files=fs.readdirSync(filepath);
        
        files.forEach((val,index) => {
            var fPath=path.join(filepath,val);
            var stats=fs.statSync(fPath);
            
            if(stats.isDirectory()){
                finder(fPath);
            };
            if(stats.isFile()){
                let extname = path.extname(val);
                if(extname === ".png" || extname === ".jpg"){
                    tinyImg(fPath);
                }
            };
        });

    }
    finder(srcFolder);
}

function mkdirsSync(dirname){
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

module.exports = {
    tinyImgWithPath:tinyImgWithPath
}


function getFileName(path){
    var pos1 = path.lastIndexOf('/');
    var pos2 = path.lastIndexOf('\\');
    var pos  = Math.max(pos1, pos2)
    if( pos<0 )
    return path;
    else
    return path.substring(pos+1);
}


class PromiseQueue {
    constructor() {
      this.funcs = [];
    }
    add(func) {
      return new Promise(resolve => {
        const needStart = this.funcs.length === 0;
        const pfunc = () => {
          func(()=>{
            resolve()
            if (this.funcs.length > 0) {
                this.funcs.shift();
              }
              this.next();
          });
          
        };
        this.funcs.push(pfunc);
        if (needStart) {
          this.next();
        }
      });
    }
    next() {
      if (this.funcs.length === 0) {
        return;
      }
      const pfunc = this.funcs[0];
      pfunc();
    }
  }

const queue = new PromiseQueue();
function tinyImg(imgpath){
    console.log(imgpath)
    queue.add(resolve=>{
        let content = fs.readFileSync(imgpath);
        TinyPng(content,imgpath,(buffer)=>{
            fs.writeFile(imgpath, buffer,function(err){
                if(!err){
                    console.log("图片文件 tiny 成功",imgpath);
                }else{
                    console.error("图片文件 tiny 失败",err);
                }

                resolve();
            })
        });
        
    })
}

function clampNum(v) {
    if (v < 1) {
        return 1;
    }
    return Math.ceil(v);
}





// convertSkeAnim('./anim/zoulu/ren_ske.json','./anim/zoulu/ren_tex.json','./anim/zoulu/ren_tex.png','./anim/sketest',0.1);
// convertSkeAnim('./anim/mao/mao1_ske.json','./anim/mao/mao1_tex.json','./anim/mao/mao1_tex.png','./anim/sketest',0.1);

