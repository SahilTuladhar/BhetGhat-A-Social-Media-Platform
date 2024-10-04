

const io = require("socket.io")(8800,{
    cors:{
        origin:"http://localhost:3000"
    },
});

let activeUsers=[];

io.on("connection",(socket)=>{
    //when connect 
    
    //take userId and socketId from user
    socket.on("new-user-add", (newUserId)=>{
        if(!activeUsers.some((user)=>user.userId === newUserId)){
        activeUsers.push({
            userId:newUserId,
            socketId:socket.id
        
        })
    }
    console.log("Connected Users",activeUsers) ;
    io.emit("get-users",activeUsers); 

    });

    socket.on("send-messaage",(data)=>{
        const{receiverId}=data;
        const user = activeUsers.find((user)=>user.userId=== receiverId) 
        console.log("Sending from socket to:",rec)
        console.log("Data",data)
        if(user){
            io.to(user.socketId).emit("receive-message",data)
        } 
            
    });
   
    //when disconnect
    socket.on("disconnect",()=>{
        activeUsers=activeUsers.filter((user)=> user.socketId !== socket.id);
        console.log("User disconnected!",activeUsers);
        io.emit("get-users",activeUsers); 
    }) 
}) 
