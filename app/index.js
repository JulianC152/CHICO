import  express  from "express";
//Fix para dirname
import path from 'path';
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { methods as autentication} from "./controllers/autentication.controller.js";


//Server
const app = express();
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Servidor corriendo en:", app.get("port"));

//Configuracion
app.use(express.static(__dirname + "/public"));
app.use(express.json());



//Rutas
app.get("/", (req, res) => res.sendFile(__dirname + "/pages/login.html"));
app.get("/register", (req, res) => res.sendFile(__dirname + "/pages/register.html"));
app.get("/admin",(req, res) => res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/login", autentication.login);
app.post("/api/register", autentication.register);
