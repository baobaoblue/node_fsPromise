let fs = require('fs')
let path = require('path')
let dirname = path.resolve() // 当前模块执行的绝对路径 (!== __dirname)

//mkdir rmdir 2个参数  无res
//readdir  2个参数  有res
//readFile 3个参数  有res
//writeFile  appendFile 4个参数  无res
// copyFile 3个参数

let arr1 = ['mkdir', 'rmdir', 'readdir', 'readFile', 'copyFile', 'unlink']
arr1.forEach(item => {
    exports[item] = function (pathname, copypath = '') {
        pathname = path.resolve(dirname, pathname);
        copypath = path.resolve(dirname, copypath);
        return new Promise((resolve, reject) => {
            let arg = [(err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            }];
            if(item === 'readFile'){
                if(!/(JPG|JPEG|PNG|GIF|SVG|ICO|BMP|WOFF|EOT|TTF|MP3|MP4|OGG|WAV|M4A|WMV|AVI)$/i.test(pathname)){
                    arg.unshift('utf8')
                }
            }
            item === 'copyFile' ? arg.unshift(copypath) : null;
            fs[item](pathname, ...arg);
        });
    };
});
let arr2 = ['writeFile', 'appendFile']
arr2.forEach(item => {
    exports[item] = function (pathname, content) {
        pathname = path.resolve(dirname, pathname);
        if (typeof content !== 'string') {
            //=>写入的内容我们规定必须是字符串才可以
            content = JSON.stringify(content);
        }
        return new Promise((resolve, reject) => {
            fs[item](pathname, content, 'utf8', (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result || '');
            });
        });
    };
});