var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/css/style.css', function(req, res) {
    res.sendFile(__dirname + '/css/style.css');
});

app.get('/js/canv.js', function(req, res) {
    res.sendFile(__dirname + '/js/canv.js');
});

app.get('/favicon.ico', function(req, res) {
    res.sendFile(__dirname + '/favicon.ico');
});

var player_num = 0;
var player = [];
var draw = {
    id: 1,
    x: 1,
    y: 1,
    sq_size: 1,
    fillStyle: "red",
    strokeStyle: "blue",
}
io.on('connection', function(socket) {
    try {

        console.log('Установлено новое подключние!');
        console.log(socket.id);

        socket.on('player_num_req', function(msg) {
            try {
                console.log("Пользователь запросил ID");
                io.emit('player_num_ans', socket.id);
                player_num++;
            } catch (e) {
                io.emit("updatepg", 1);
                console.log("Поймал ошибку: " + e);
            }
        });

        socket.on('add_user', function(msg) {
            try {
                player[msg.id] = msg;
                console.log(player[msg.id]);
                console.log("Добавлен новый пользователь ID=" + msg.id);
                io.emit('draw_other', msg);
                draw.id = msg.id;
                draw.x = msg.x;
                draw.y = msg.y;
                draw.sq_size = msg.sq_size;
                draw.fillStyle = "red";
                draw.strokeStyle = "blue";
                player[draw.id].drawed.push(msg);
                io.emit('draw', draw);
                console.log("Количество игроков: " + player.length);
            } catch (e) {
                io.emit("updatepg", 1);
                console.log("Поймал ошибку: " + e);
            }
        });

        socket.on('player_dblclick', function(ans) {
            try {
                console.log("ID [" + ans.id + "] кликнул X=" + ans.x + " Y=" + ans.y);
                move(ans.id, player[ans.id].x, player[ans.id].y, ans.x, ans.y);
            } catch (e) {
                socket.emit("updatepg", 1);
                console.log("Поймал ошибку: " + e);
            }
        });

        socket.on('player_click', function(ans) {
            try {
                console.log("ID [" + ans.id + "] кликнул X=" + ans.x + " Y=" + ans.y);
                draw.id = ans.id;
                draw.x = ans.x;
                draw.y = ans.y;
                player[ans.id].x = ans.x;
                player[ans.id].y = ans.y;
                draw.sq_size = player[ans.id].sq_size;
                draw.fillStyle = player[ans.id].color;
                draw.strokeStyle = "blue";
                player[draw.id].drawed.push(ans);
                io.emit('draw', draw);
            } catch (e) {
                socket.emit("updatepg", 1);
                console.log("Поймал ошибку: " + e);
            }
        });


        socket.on('clear', function(ans) {
            console.log("Поле очищено");
            io.emit('clear', 1);
        });

        socket.on('color_change', function(ans) {
            try {
                console.log("ID [" + ans.id + "] сменил сцвет " + ans.color);
                player[ans.id].color = ans.color;
            } catch (e) {
                io.emit("updatepg", 1);
                console.log("Поймал ошибку: " + e);
            }
        });
        var del = {
            x: 1,
            id: 1,
            y: 1,
        }
        socket.on('player_eraser', function(ans) {
            try {
                console.log("[ " + ans.id + " ] Стер X=" + ans.x + " Y=" + ans.y);
                del.id = ans.id;
                del.x = ans.x;
                del.y = ans.y;
                io.emit('eraser', del);
            } catch (e) {
                socket.emit("updatepg", 1);
                console.log("Поймал ошибку: " + e);
            }
        });

        socket.on('Key_press', function(keyp) {
            try {
                console.log("ID [" + keyp.id + "] нажал клавишу " + keyp.par);
                keygo(keyp.id, keyp.par);
            } catch (e) {
                socket.emit("updatepg", 1);
                console.log("Поймал ошибку: " + e);
            }
        });

        function keygo(id, par) {
            try {
                draw.color = player[id].fillStyle;

                if (par == 0) {
                    player[id].x -= 20;
                    draw.strokeStyle = 'green';
                }
                if (par == 1) {
                    player[id].x += 20;
                    draw.strokeStyle = 'red';
                }
                if (par == 2) {
                    player[id].y -= 20;
                    draw.strokeStyle = '#7f7fFF';
                }
                if (par == 3) {
                    player[id].y += 20;
                    draw.strokeStyle = 'magenta';
                }
                draw.x = player[id].x;
                draw.y = player[id].y;
                draw.id = id;
                draw.sq_size = player[id].sq_size;
                player[id].drawed.push({
                    x: player[id].x,
                    y: player[id].y,
                });
                io.emit('draw', draw);
            } catch (e) {
                socket.emit("updatepg", 1);
                console.log("Поймал ошибку: " + e);
            }
        }

        function move(id, oldx, oldy, toX, toY) {
            try {
                var il = setInterval(function go() {
                    if (oldx < toX) {
                        oldx += 20;
                        draw.fillStyle = player[id].color;
                        draw.strokeStyle = player[id].color;
                        draw.x = oldx;
                        draw.y = oldy;
                        draw.id = id;
                        draw.sq_size = player[id].sq_size;
                        player[draw.id].drawed.push({
                            x: oldx,
                            y: oldy,
                        });
                        io.emit('draw', draw);
                    }
                    if (oldx > toX) {
                        oldx -= 20;
                        draw.fillStyle = player[id].color;
                        draw.strokeStyle = player[id].color;
                        draw.x = oldx;
                        draw.y = oldy;
                        draw.id = id;
                        draw.sq_size = player[id].sq_size;
                        player[draw.id].drawed.push({
                            x: oldx,
                            y: oldy,
                        });
                        io.emit('draw', draw);
                    }

                    if (oldy > toY) {
                        oldy -= 20;
                        draw.fillStyle = player[id].color;
                        draw.strokeStyle = player[id].color;
                        draw.x = oldx;
                        draw.y = oldy;
                        draw.id = id;
                        draw.sq_size = player[id].sq_size;
                        player[draw.id].drawed.push({
                            x: oldx,
                            y: oldy,
                        });
                        io.emit('draw', draw);
                    }
                    if (oldy < toY) {
                        oldy += 20;
                        draw.fillStyle = player[id].color;
                        draw.strokeStyle = player[id].color;
                        draw.x = oldx;
                        draw.y = oldy;
                        draw.id = id;
                        draw.sq_size = player[id].sq_size;
                        player[draw.id].drawed.push({
                            x: oldx,
                            y: oldy,
                        });
                        io.emit('draw', draw);
                    }

                    if ((oldx == toX) && (oldy == toY)) {
                        draw.fillStyle = player[id].color;
                        draw.strokeStyle = player[id].color;
                        draw.x = oldx;
                        draw.y = oldy;
                        draw.id = id;
                        draw.sq_size = player[id].sq_size;
                        io.emit('draw', draw);
                        player[draw.id].drawed.push({
                            x: oldx,
                            y: oldy,
                        });
                        clearInterval(il);
                    }
                    player[id].x = oldx;
                    player[id].y = oldy;
                }, 80);
            } catch (e) {
                socket.emit("updatepg", 1);
                console.log("Поймал ошибку: " + e);
            }
        }


        socket.on('disconnect', function(e) {
            try {
                console.log(player[socket.id].drawed.length);
                del.id = player[socket.id].id;
                for (var index = 0; index < player[socket.id].drawed.length; index++) {
                    del.x = player[socket.id].drawed[index].x;
                    del.y = player[socket.id].drawed[index].y;
                    io.emit('eraser', del);
                    console.log(socket.id + " " + del.x + " " + del.y + " " + index);
                }

                console.log('Кто-то ушел, осталось: ' + player.length);
            } catch (e) {
                socket.emit("updatepg", 1);
                console.log("Поймал ошибку: " + e);
            }
        });
    } catch (e) {
        socket.emit("updatepg", 1);
        console.log("Поймал ошибку: " + e);
    }

});


http.listen(3000, function() {
    console.log('listening on *:3000');
})