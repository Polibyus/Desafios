const socket = io.connect();

// mensajeria
function render(data) {
    const html = data.map((e) => {
        return (`<ul class="chat">
    <li class="left clearfix">
    <div class="chat-body clearfix">
        <div class="header">
            <strong class="primary-font">${e.author}</strong> <small class="pull-right text-muted">
                <span class="glyphicon glyphicon-time"></span>12 mins ago</small>
        </div>
        <p>${e.text}</p>
        </div>
    </li>
    </ul>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

socket.on('messages', function (data) { render(data); });


