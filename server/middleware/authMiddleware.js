import jwt from "jsonwebtoken";

const authMiddleware=(req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
           return  res.status(401).json({
                message: "invalid Access",
            });
        }
        const token=authHeader.split(" ")[1];
        const result=jwt.verify(token,process.env.JWT_TOKEN);
        req.user=result;
        next();
    }catch(error){
        res.status(401).json({
            message :"invalid token",
        });
    }
};
export default authMiddleware;