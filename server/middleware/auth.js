import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try{
        const tokenT = req.headers.authorization;

        const token = tokenT.split(" ")[1];

        const isCustomAuth = token.length < 500;

        let decodedData;

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test')
            console.log(decodedData, "dddd")
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token)
            console.log(decodedData, "ddd ")
            req.userId = decodedData?.sub
        }

        console.log(req.userId, "finally reach")

        next()
    }catch(error){
        console.log(error)
    }
}

export default auth