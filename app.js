var http = require('http');
var socketio = require('socket.io');
var fs = require('fs');
var redis = require("redis");
var exec = require('child_process').exec;

var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
}).listen(3000);

var io = socketio.listen(server);

var arg1
var arg2
var arg3
var arg4
var arg5
var arg6
var arg7
var arg8
var arg9
var arg10
var span


io.sockets.on('connection', function(socket) {
    socket.on('client_to_server', function(data) {
        try {
            client = redis.createClient();
            client.on("error", function (err) {
                console.log("Error " + err);
            });
            // 1. Add a data.
            console.log("追加したいデータ: " + data.value)
            client.lpush("mylist", data.value);

            // 2. Redisの中にデータが10個無ければreturn 0
            client.llen("mylist", function(err, len){
                console.log("長さ: " + len);
                span = len;
            });

            if(span < 10){
                io.sockets.emit("publish", 1);
            // 2. Redisの中にデータが10個あれば
            }else if (span >= 10){
                // 10個取り出して引数として次のコマンドに渡す
                client.lrange('mylist', 0, -1, function(err, mylist){
                    if (err) return console.log(err);
                    for (var i = 0; i < 10; i++) {
                        if (i = 0){
                            arg1 = mylist[i];
                        }
                        if (i = 1){
                            arg2 = mylist[i];
                        }
                        if (i = 2){
                            arg3 = mylist[i];
                        }
                        if (i = 3){
                            arg4 = mylist[i];
                        }
                        if (i = 4){
                            arg5 = mylist[i];
                        }
                        if (i = 5){
                            arg6 = mylist[i];
                        }
                        if (i = 6){
                            arg7 = mylist[i];
                        }
                        if (i = 7){
                            arg8 = mylist[i];
                        }
                        if (i = 8){
                            arg9 = mylist[i];
                        }
                        if (i = 9){
                            arg10 = mylist[i];
                        }
                    }
                });
                // rコマンドの実行
                cmd = 'rscript train.R %d %d %d %d %d %d %d %d %d %d', arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10
                exec(cmd, function(err, stdout, stderr){
                    if (err) { console.log(err); } 
                    if (stderr) {console.log(stderr)};
                    // 標準出力を取得
                    console.log(stdout);
                    // 1or0を返す
                    if (stdout == "[1] -1"){io.sockets.emit("publish", -1);}
                    if (stdout == "[1] 1"){io.sockets.emit("publish", 1);}
                });
                // 一個取り出す
                client.rpop("mylist");
            }
        } catch (error) {
            console.log(error);
        }
    });
});