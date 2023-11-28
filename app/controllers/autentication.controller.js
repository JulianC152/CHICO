import bcryptjs  from "bcryptjs";
import JsonWebToken  from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const usuarios = [{
    user: "a",
    email: "a@a.com",
    password: "$2a$05$3HFjZELKAJIpJHvb8QxCIOB.wQ5k0qdS3L//u6gZJPs1xT.bvO4O2"
}]

async function login(req, res){
    console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;
    if (!user || !password) {
        return res.status(400).send({status:"Error",message:"Campos incompletos"})
    }
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if (!usuarioARevisar) {
        return res.status(400).send({status:"Error",message:"Error durante el login"})//Usuario Incorrecto
    }
    const loginCorrecto = await bcryptjs.compare(password, usuarioARevisar.password)//Password Incorrecto
    if (!loginCorrecto) {
        return res.status(400).send({status:"Error",message:"Error durante el login"})
    }
    const token = JsonWebToken.sign(
        {user: usuarioARevisar.user}, 
        process.env.JWT_SECRET, 
        {expiresIn:process.env.JWT_EXPIRATION});

    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES ** 24 * 60 * 60 * 1000),
        path: "/"
    }
    res.cookie("jwt", token, cookieOption);
    res.send({status: "ok", message: "Usuario Loggeado", redirect: "/admin"});
}

async function register(req, res){
    console.log(req.body);
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;
    if (!user || !password || !email) {
        return res.status(400).send({status:"Error",message:"Campos incompletos"})
    }
    const usuarioARevisar = usuarios.find(usuario => usuario.user === user);
    if (usuarioARevisar) {
        return res.status(400).send({status:"Error",message:"Ya existe"})
    }
    const salt = await bcryptjs.genSalt(5);
    const hashPassword = await bcryptjs.hash(password, salt);
    const nuevoUsuario = {
        user, email, password: hashPassword
    }
    usuarios.push(nuevoUsuario);

    console.log(usuarios);

    return res.status(201).send({status: "ok", message: `Usuario ${nuevoUsuario.user} Creado`, redirect: "/" })
}

export const methods = {
    login,
    register
}
