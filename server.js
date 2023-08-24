const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
    console.log('Usuário conectado com sucesso.')

    socket.on('chat message', (message) => {
        console.log(`Mensagem recebida ${message}`)
        io.emit(message)
    })

    socket.on('disconnect', () => {
        console.log('Usuário desconectado.')
    })
})

app.post('/send-message', (req, res) => {
    const {message} = req.body;
    console.log(`Mensagem recebida ${message}`)

    io.emit('chat message', message)
    res.status(200).send('Mensagem recebida e enviada ao cliente')
})


server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})
