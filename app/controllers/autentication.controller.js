function login(req, res){

}


async function register(req, res){
    console.log(req.body);
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if (!user || !password || !email) {
        return res.status(400).send({status:"Error",message:"Campos incompletos"})
    }
}

export const methods = {
    login,
    register
}
