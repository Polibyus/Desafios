    const socket = io.connect();

    // agregar items
    
    function addItem(i) {
        const item = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            pic: document.getElementById('pic').value
        };
        socket.emit('new-item', item);
        return false;
    }
    
    function renderItem(data) {
        const html = data.map((p) => {
            return(`
            <tr>
                <td>${p.id}</td>
                <td>${p.title}</td>
                <td>${p.price}</td>
                <td>
                <img src=${p.pic} width="50px" height="50px">
                </td>
            </tr>`)
        }).join(' ');
        document.getElementById('products').innerHTML = html;
    }
    
    socket.on('products', (data) => { renderItem(data); });

    // mensajeria
    function render(data) {
        const html = data.map((e) => {
            return(`<ul class="chat">
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

    socket.on('messages', function(data) { render(data); });


