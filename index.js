import express from "express";
import path from 'path';
import bodyParser from "body-parser";
import TelegramBot from "node-telegram-bot-api";

const token = '5007833841:AAGZ36N6KJyQLove5C7RTW32xXDbnguhamE'
const bot = new TelegramBot(token, { polling: true })

const __dirname = path.resolve()

const PORT = process.env.PORT ?? 3000
const app = express()

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
	
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

const jsonParser = express.json();
  
app.post("/index.html", jsonParser, function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
    let tg_msg = 'Почта: ' + request.body.userEmail + "\nФИО: " + request.body.userFio + "\nТема сообщения: " + request.body.TemaMsg  + "\nТекст сообщения: \n" + request.body.MsgText;

    bot.sendMessage('901901657', tg_msg)

    response.json(request.body); 
    
});



app.listen(PORT)