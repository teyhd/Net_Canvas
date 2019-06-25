var socket = io();
var canv = document.getElementById('canvas');
var ctx = canv.getContext("2d");

function isInteger(num) {
    return (num ^ 0) === num;
}
$('canvas').bind('contextmenu', function(e) {
    return false;
});
socket.on('updatepg', function(ans) {
    location.reload();
});

function getRandomArbitrary(min, max) {
    var norm = Math.floor(Math.random() * (max - min) + min);
    if (isInteger(norm / 20)) return norm;
    else return getRandomArbitrary(min, max);
}
canv.width = window.innerWidth;
canv.height = window.innerHeight;
var click_cord = {
    id: 1,
    oldx: 1,
    oldy: 1,
    x: 1,
    y: 1,
};
var player_set = {
    id: -1,
    x: getRandomArbitrary(40, 50),
    y: getRandomArbitrary(40, 50),
    color: "#FF000A",
    screenHeight: window.innerHeight,
    sq_size: 20,
    admin: false,
    drawed: [],
};

socket.emit('player_num_req', 1);
clear_space();
var flag = false;
socket.on('player_num_ans', function(msg) {
    if (flag == false) {
        player_set.id = msg;
        flag = true
    }
    socket.emit('add_user', player_set);
    console.log("Player created");
});


socket.on('draw', function(ans) {
    console.log("Двигаем фигуру игрока! ID=" + ans.id);
    ctx.fillStyle = ans.fillStyle;
    ctx.strokeStyle = ans.strokeStyle;
    ctx.lineWidth = 5;
    ctx.fillRect(ans.x, ans.y, ans.sq_size, ans.sq_size);
    ctx.strokeStyle = '#0e2f44';
    ctx.lineWidth = 1;
    ctx.strokeRect(ans.x, ans.y, 20, 20);
});

socket.on('eraser', function(ans) {
    console.log("[ " + ans.id + "] Стер " + ans.x + " " + ans.y);
    ctx.fillStyle = '#335066';
    ctx.lineWidth = 5;
    ctx.fillRect(ans.x, ans.y, 20, 20);
    ctx.strokeStyle = '#0e2f44';
    ctx.lineWidth = 1;
    ctx.strokeRect(ans.x, ans.y, 20, 20);
});


socket.on('clear', function(ans) {
    console.log("Поле очищено");
    clear_space();
});

var last = {
    x: 1,
    y: 1
}

var clicked = false;
canv.addEventListener('mousedown', function(e) {
    draw_click.id = player_set.id;
    draw_click.x = currect_click(e.clientX);
    draw_click.y = currect_click(e.clientY);
    console.log(draw_click.x + " " + last.x);
    if ((draw_click.x !== last.x) || (draw_click.y !== last.y)) {
        if (e.which == 3) {
            click_cord.id = player_set.id;
            click_cord.oldx = player_set.x;
            click_cord.oldy = player_set.y;
            click_cord.x = currect_click(e.clientX);
            click_cord.y = currect_click(e.clientY);
            socket.emit('player_dblclick', click_cord);
            console.log(click_cord.x + " " + click_cord.y);
        }
        if ((draw_click.x == 20) && (draw_click.y == 20)) {
            color_ch.color = '#FF0000';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 20) && (draw_click.y == 40)) {
            color_ch.color = '#00FF00';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            console.log(draw_click.x + " Отчистка " + draw_click.y);
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 20) && (draw_click.y == 60)) {
            color_ch.color = '#0000FF';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 20) && (draw_click.y == 80)) {
            color_ch.color = '#1e84d4';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 20) && (draw_click.y == 100)) {
            color_ch.color = '#010101';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 20) && (draw_click.y == 120)) {
            color_ch.color = '#FFFFFF';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 20) && (draw_click.y == 140)) {
            color_ch.color = '#ffff66';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }

        if ((draw_click.x == 40) && (draw_click.y == 20)) {
            color_ch.color = '#ff5546';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 40) && (draw_click.y == 40)) {
            color_ch.color = '#ff87a5';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 40) && (draw_click.y == 60)) {
            color_ch.color = '#8405cc';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 40) && (draw_click.y == 80)) {
            color_ch.color = '#5a3313';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 40) && (draw_click.y == 100)) {
            color_ch.color = '#30D5C8';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 40) && (draw_click.y == 120)) {
            color_ch.color = '#ff0777';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }
        if ((draw_click.x == 40) && (draw_click.y == 140)) {
            color_ch.color = '#969696';
            color_ch.id = player_set.id;
            shift = false;
            clicked = false;
            socket.emit('color_change', color_ch);
        }

        socket.emit('player_click', draw_click);
        console.log(draw_click.x + " " + draw_click.y);
        if (e.which == 1) {
            clicked = true;
            if (e.shiftKey == 1) {
                shift = true;
                draw_click.id = player_set.id;
                draw_click.x = currect_click(e.clientX);
                draw_click.y = currect_click(e.clientY);
                socket.emit('player_eraser', draw_click);
                console.log(draw_click.x + " Отчистка " + draw_click.y);
            }
        }
        last.x = draw_click.x;
        last.y = draw_click.y;
    }

});
var draw_click = {
    id: 1,
    x: 1,
    y: 1,
}
var shift = false;
canv.addEventListener('mouseup', function(e) {
    clicked = false;
    shift = false;
});
var color_ch = {
    id: player_set.id,
    color: "red",
}
canv.addEventListener('mousemove', function(e) {
    if (clicked == true) {
        draw_click.x = currect_click(e.clientX);
        draw_click.y = currect_click(e.clientY);
        if ((draw_click.x !== last.x) || (draw_click.y !== last.y)) {

            if ((draw_click.x == 20) && (draw_click.y == 20)) {
                color_ch.color = '#FF0000';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 20) && (draw_click.y == 40)) {
                color_ch.color = '#00FF00';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                console.log(draw_click.x + " Отчистка " + draw_click.y);
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 20) && (draw_click.y == 60)) {
                color_ch.color = '#0000FF';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 20) && (draw_click.y == 80)) {
                color_ch.color = '#1e84d4';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 20) && (draw_click.y == 100)) {
                color_ch.color = '#010101';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 20) && (draw_click.y == 120)) {
                color_ch.color = '#FFFFFF';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 20) && (draw_click.y == 140)) {
                color_ch.color = '#ffff66';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }

            if ((draw_click.x == 40) && (draw_click.y == 20)) {
                color_ch.color = '#ff5546';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 40) && (draw_click.y == 40)) {
                color_ch.color = '#ff87a5';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 40) && (draw_click.y == 60)) {
                color_ch.color = '#8405cc';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 40) && (draw_click.y == 80)) {
                color_ch.color = '#5a3313';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 40) && (draw_click.y == 100)) {
                color_ch.color = '#30D5C8';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 40) && (draw_click.y == 120)) {
                color_ch.color = '#ff0777';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if ((draw_click.x == 40) && (draw_click.y == 140)) {
                color_ch.color = '#969696';
                color_ch.id = player_set.id;
                shift = false;
                clicked = false;
                socket.emit('color_change', color_ch);
            }
            if (clicked == true) {
                if (shift == true) {
                    draw_click.id = player_set.id;
                    draw_click.x = currect_click(e.clientX);
                    draw_click.y = currect_click(e.clientY);
                    socket.emit('player_eraser', draw_click);
                    console.log(draw_click.x + " Отчистка " + draw_click.y);
                    last.x = 2;
                    last.y = 2;
                } else {
                    draw_click.id = player_set.id;
                    draw_click.x = currect_click(e.clientX);
                    draw_click.y = currect_click(e.clientY);
                    socket.emit('player_click', draw_click);
                    console.log(draw_click.x + " " + draw_click.y);
                    last.x = draw_click.x;
                    last.y = draw_click.y;
                }
            }

        }

    }
});

function currect_click(coord) {
    if (isInteger(coord / 20)) return coord;
    else {
        coord--;
        return currect_click(coord);
    }
}

var keyp = {
    id: player_set.id,
    par: 1,
}
document.addEventListener('keydown', function(e) {
    console.log(e.keyCode);
    if (e.keyCode == 68) {
        keyp.id = player_set.id;
        keyp.par = 1;
        socket.emit('Key_press', keyp);
    }
    if (e.keyCode == 65) {
        keyp.id = player_set.id;
        keyp.par = 0;
        socket.emit('Key_press', keyp);
    }
    if (e.keyCode == 83) {
        keyp.id = player_set.id;
        keyp.par = 3;
        socket.emit('Key_press', keyp);
    }
    if (e.keyCode == 87) {
        keyp.id = player_set.id;
        keyp.par = 2;
        socket.emit('Key_press', keyp);
    }
    if (e.keyCode == 67) {
        socket.emit('clear', 1);
    }

});

function clear_space() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var ind = 0; ind < window.innerWidth; ind += 20) {
        for (var inde = 0; inde < window.innerHeight; inde += 20) {
            if ((ind == 20) && (inde == 20)) {
                ctx.fillStyle = '#FF0000';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 20) && (inde == 40)) {
                ctx.fillStyle = '#00FF00';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 20) && (inde == 60)) {
                ctx.fillStyle = '#0000FF';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 20) && (inde == 80)) {
                ctx.fillStyle = '#1e84d4';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 20) && (inde == 100)) {
                ctx.fillStyle = '#010101';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 20) && (inde == 120)) {
                ctx.fillStyle = '#FFFFFF';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 20) && (inde == 140)) {
                ctx.fillStyle = '#ffff66';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }

            if ((ind == 40) && (inde == 20)) {
                ctx.fillStyle = '#ff5546';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 40) && (inde == 40)) {
                ctx.fillStyle = '#ff87a5';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 40) && (inde == 60)) {
                ctx.fillStyle = '#8405cc';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 40) && (inde == 80)) {
                ctx.fillStyle = '#5a3313';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }

            if ((ind == 40) && (inde == 100)) {
                ctx.fillStyle = '#30D5C8';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 40) && (inde == 120)) {
                ctx.fillStyle = '#ff0777';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            if ((ind == 40) && (inde == 140)) {
                ctx.fillStyle = '#969696';
                ctx.lineWidth = 5;
                ctx.fillRect(ind, inde, 20, 20);
            }
            ctx.strokeStyle = '#0e2f44';
            ctx.lineWidth = 1;
            ctx.strokeRect(ind, inde, 20, 20);
        }
    }
}

$(function() {

    $('form').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
    socket.on('chat message', function(msg) {
        $('#messages').append($('<li>').text(msg));
    });
});

$(function() {

    $('form').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });
});