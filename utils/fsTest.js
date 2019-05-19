let {readFile,readdir,writeFile} = require('./fsPromise.js')
readdir('./css/').then(result =>{
   return result.filter(item => /\.css$/i.test(item))
}).then(result =>{
    let arr = []
    result.forEach(item => {
        arr.push(readFile(`./css/${item}`))
    })
   return Promise.all(arr)
}).then(result =>{
    result  = result.join('')
    return result.replace(/( |\n|\r)/g,'')
}).then(result=>{
    return writeFile('./css/build.min.css',result)
}).then(()=>{
    console.log('success')
})
 
