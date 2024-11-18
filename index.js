//Create a http server
const express=require("express");
const app=express();
// function sum(n){
//     let ans=0;
//     for(let i=1;i<=n;i++){
//         ans=ans+i;
//     }
//     return ans;
// }
// app.get("/", function(req, res){
//     const n=req.query.n;
//     const ans=sum(n);
//     res.send("hi your ans is "+ans);
// })
// app.listen(3000);
const users=[{
    name:"John",
    kidneys:[{
        healthy: false
    }]
}];

app.use(express.json());
//user check how many kidneys they have and health
app.get("/", function(req, res){
 const johnKidneys=users[0].kidneys;
 const noofKidneys=johnKidneys.length;
 let noofhealthyKidneys=0;
 for(let i=0;i<johnKidneys.length;i++){
    if(johnKidneys[i].healthy){
        noofhealthyKidneys=noofhealthyKidneys+1;
    }
 }
 let unhealthyKidneys=noofKidneys-noofhealthyKidneys;
 res.json({
    noofKidneys,
    noofhealthyKidneys,
    unhealthyKidneys
 })
 
})
//user can add a new kidney
app.post("/", function(req, res){
    const isHealthy=req.body.isHealthy;
    users[0].kidneys.push({
        healthy : isHealthy
    })
    res.json({
        msg:"Done"
    })
})
//user can replace kidneys
app.put("/", function(req, res){
for(let i=0;i<users[0].kidneys.length;i++){
    users[0].kidneys[i].healthy=true;
}
res.json({})
})

//user can remove a kidney
app.delete("/", function(req, res){
    //return 411(wrong input), if there is no valid input
  if(isthereatleastunhealthykidney()){
    const newKidneys=[];
    for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
            newKidneys.push({
                healthy: true
            })
            
        }
    }
    users[0].kidneys=newKidneys;
    res.json({msg:"done"})
} else{
    res.status(411).json({
        msg:"You have no unhealthy kidneys"
    });
}
})

function isthereatleastunhealthykidney(){
    let unhealthyKidneypre=false;
    for(let i=0;i<users[0].kidneys.length;i++){
        if(!users[0].kidneys[i].healthy){
            unhealthyKidneypre=true;
        }
    }
    return unhealthyKidneypre;
}
app.listen(3000);