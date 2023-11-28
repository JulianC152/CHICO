import  express  from "express";
import cookieParser from "cookie-parser";
import {sequelize} from './database/database.js';
//Fix para dirname
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as autentication} from "./controllers/autentication.controller.js";
import { methods as authorization} from "./middlewares/authorization.js";


//Conexion a BD
const app = express();
async function main(params) {
    try {
        await sequelize.authenticate();
        app.set("port", 4000);
        app.listen(app.get("port"));
        console.log("Servidor corriendo en:", app.get("port"));
        
    } catch (error) {
        console.error(error);
    }
}

//Configuracion
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());


//Rutas
app.get("/", authorization.soloPublico, (req, res) => res.sendFile(__dirname + "/pages/login.html"));
app.get("/register", authorization.soloPublico,(req, res) => res.sendFile(__dirname + "/pages/register.html"));
app.get("/admin",authorization.soloAdmin,(req, res) => res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/login", autentication.login);
app.post("/api/register", autentication.register);

main();