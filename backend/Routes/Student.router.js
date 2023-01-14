
const express = require("express")
const studentRouter = new express.Router()

const LoginModel = require("../Model/Login.model")
const studentModel = require("../Model/Student.model")
const authentication = require("../Middlewares/Authentication")


//teacher who can access all student tests
studentRouter.get("/user/:id",async(req,res)=>{
    const id=req.params.id;

    const FindStudent = await studentModel.find({userid:id});

    if(FindStudent.length > 0){
        return res.send({message:"student find successful", FindStudent});
    }else{
        return res.send("Data not found");
    }

})


// get all student data in teacher route
studentRouter.get("/studentdata/:l/:s",async(req,res)=>{
    let {s} =req.params
    let {l} =req.params

    const AllStudent = await LoginModel.find({role:"student"}).limit(l).skip(s)
    res.send(AllStudent)
})


//for teacher whot want to delete particular student test
studentRouter.delete("/delete/test/:id",async(req,res)=>{
    const id = req.params.id;

    const Findtest = await studentModel.findOneAndDelete({_id:id});

    res.send({message:"test delete successfully",Findtest})
})


//for teacher to delete particular student data
studentRouter.delete("/delete/:studentid",async(req,res)=>{
    const id= req.params.studentid
    const FindStudent = await LoginModel.findOneAndDelete({_id:id});

    res.send({message:"student Deleted Successfully",FindStudent})
})

//for teacher to create particular test for student
studentRouter.post("/create/:id",async(req,res)=>{
    const {name,subject,marks,date}=req.body
    const id = req.params.id;

    const NewTestData = new studentModel({name,subject,marks,date,userid:id})
    NewTestData.save();

    res.send({message:"Data created Successfully",NewTestData});
})

//for Student to access his/her tests //middleware
studentRouter.get("/", authentication, async (req, res) => {
  var { userid } = req.body;
  const Data = await studentModel.find({ userid });
  if (Data.length > 0) {
    res.send(Data);
  } else {
    res.send("Data not Found");
  }
});

//for teacher to search for particular student name

studentRouter.get("/searchtitle/:title",async (req,res)=>{
     let {title}=req.params;
     console.log("title",title);
     const userData = await LoginModel.find({});
     let stdnt=[];
     for(let i=0;i<userData.length;i++){
        let temp = title.toLowerCase()
        if(userData[i].name.toLowerCase()===temp){
            stdnt.push(userData[i])
        }
     }
    res.send(stdnt)
})

//for teacher to apply sort on basis of age and filter by gender

studentRouter.get("/query/:q",async(req,res)=>{
    let {q}=req.params

    console.log(q.split(",")[0]=="male" && q.split(",")[1]=="low")


    if(q.split(",")[0]=="male" && q.split(",")[1]=="low"){
        const data=await LoginModel.find({gender:q.split(",")}).sort({age:-1 })
        res.send(data)
    }else if(q.split(",")[0]=="male" && q.split(",")[1]=="high"){
        const data = await LoginModel.find({gender:q.split(",")}).sort({age:1})
        res.send(data)
    }else if(q.split(",")[0]=="female" && q.split(",")[1]=="low"){
        const data = await LoginModel.find({gender:q.split(",")}).sort({age:-1})
        res.send(data)
    }else if(q.split(",")[0]=="female" && q.split(",")[1]=="high"){
        const data = await LoginModel.find({gender:q.split(",")}).sort({age:1})
        res.send(data)
    }


    else if(q.split(",")[0]=="male" || q.split(",")[0]=="female"){
        const data = await LoginModel.find({gender:q.split(",")})
        res.send(data)
    }else if(q.split(",")[2]=="high" || q.split(",")[1]=="high"){
        const notes =await LoginModel.find({}).sort({age:1})
        res.send(notes)
    }else if(q.split(",")[2]=="low" || q.split(",")[1]=="low"){
        const notes = await LoginModel.find({}).sort({age:-1})
        res.send(notes)
    }else if(q.split(",")[1]=="male" || q.split(",")[1]=="female"){
        const data = await LoginModel.find({gender:q.split(",")});
        res.send(data)
    }

    else{
        const data = await LoginModel.find({});
        res.send(data)
    }
})


//for student to update his/her test status

studentRouter.patch("/edittestcompletion/:id",async(req,res)=>{
    const id = req.params.id
    const data=req.body.completed
    if(data=="true"){
        const data =await studentModel.findOneAndUpdate({_id:id},{$set:{completed:"false"}})
        const updateData = await studentModel.find({_id:id})
        res.send({message:"update successfully",updateData})
    }else{
        const Data = await studentModel.findOneAndUpdate({_id:id},{$set:{completed:'true'}})
        const updateData = await studentModel.find({_id:id})
        res.send({message:"updated successfully",updateData})
    }
});


module.exports=studentRouter;