let http = require("http");
const { buffer } = require("stream/consumers");
let fs = require("fs")

let generateHtml =require("./export").generateHtml

function requestHandler (req,res){
let {url,method } = req;

if (url === "/"){
    res.end(generateHtml("server side","<h1>this is our first server side page</h1>"))
} else if (url === "/users" && method ==="GET"){
    // res.setHeader("content-type", "text/html")
  res.end(generateHtml("add user ","<form action='/users' method='POST' ><input type='text' name='email'><input type='submit'> </input> </form>"))

}else if (url=== "/users" && method === "POST"){
 let data = []
    req.on("data",function(chunk){
    data.push(chunk)
})
req.on("end",function(){
    console.log(data)
   let result = Buffer.concat(data).toString()
   res.end(result)
   fs.writeFileSync("body.txt",result)
})
} else {
    res.end(generateHtml("not found","the url is not correct"))
}
}
()=>{
 console.log("hello")
}


let server = http.createServer(requestHandler)

server.listen(4000)