const socket = io.connect();
// mensajeria
function render(data) {
    const html = data.map((elem, index) => {
        return(`<div>
            <strong>${elem.author}</strong>:
            <em>${elem.text}</em> </div>`)
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

// agregar items

function renderItem(data) {
    if (data.length !== 0) {
    const html = data.forEach(p => {
        return(`
            <td>${p.title}
            td=${p.price}
            td=${p.id}
        `)})
    document.getElementById('table').innerHTML = html;
    } else {
        document.getElementById('table').innerHTML = 'no hay productos';
    }
}

function addItem(i) {
    const item = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        pic: document.getElementById('pic').value
    };
    socket.emit('new-item', item);
    return false;
}

socket.on('productos', function(data) { renderItem(data); });


