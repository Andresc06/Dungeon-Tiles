//Velocidad de refresco de img
let fps = 50;

//Declaracion de las variables de canvas
let ctx;
let canvas;

//Variables para la musica y sonido
let sound1,sound2,sound3,sound4,music;

//El tamaño de los tiles o cuadros del canvas
let anchoC =  50;
let altoC = 50;

//Declaracion de una lista de enemigos
let enemy = [];

//sonido al momento de moverse
sound1 = new Howl({
    src: ["sound/move.wav"],
    loop: false
});

//sonido al momento de abrir la puerta
sound2 = new Howl({
    src: ["sound/door.flac"],
    loop: false
});

//sonido al recoger una llave
sound3 = new Howl({
    src: ["sound/key.wav"],
    loop: false
})

//sonido al morir
sound4 = new Howl({
    src: ["sound/dead.wav"],
    loop: false
})

//musica
music = new Howl({
    src: ["sound/music.mp3"],
    loop: true
})

//array del mapa o escenario
let dungeon = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7],
    [0,2,2,2,2,2,2,0,2,2,0,0,0,2,2,2,2,2,2,0,2,2,2,0],
    [0,2,0,0,2,0,2,0,0,2,2,2,2,2,0,0,0,0,2,2,2,0,2,0],
    [0,0,0,0,2,0,2,0,0,2,0,0,0,2,2,2,2,2,0,0,2,0,2,0],
    [0,2,2,2,2,0,2,2,2,2,0,2,2,2,0,2,0,2,0,2,2,0,2,0],
    [0,2,0,0,2,0,2,0,2,0,0,0,0,2,0,2,0,2,0,0,0,0,2,0],
    [0,0,0,0,2,2,2,0,2,2,2,2,2,2,0,2,0,2,2,2,2,2,2,0],
    [0,2,0,0,2,0,0,0,2,0,0,0,0,0,0,2,0,0,2,0,0,2,0,0],
    [0,2,2,2,2,0,0,0,2,2,2,2,2,2,0,2,0,0,2,0,2,2,2,0],
    [0,2,0,2,2,2,2,0,0,0,2,0,0,2,0,2,0,0,2,0,2,0,2,0],
    [0,2,0,0,0,0,2,0,2,0,0,0,2,2,2,2,2,2,2,2,2,2,2,0],
    [0,2,0,2,2,2,2,2,2,2,2,0,0,2,0,0,0,0,2,2,0,0,2,0],
    [0,2,0,3,0,2,0,2,0,2,2,2,0,2,2,2,0,2,2,2,0,6,2,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];


//CLASE ENEMIGO
let bad = function(x,y) {
    this.x = x;
    this.y = y;

    //Funcion para dibujar al enemigo
    this.draw = function(){
        ctx.drawImage(tileMap,0,32,32,32,this.x*anchoC, this.y*altoC,anchoC, altoC);
    }

    this.direction = Math.floor(Math.random()*4);

    //Tope de velocidad
    this.slow = 50;
    //Contador
    this.fps = 0;

    //Funcion para detectar si choca el limite del mapa (paredes)
    this.checkcollision = function(x,y){
        let collision = false;

        if(dungeon[y][x] == 0 || dungeon[y][x] == 6 || dungeon[y][x] == 7 
        || dungeon[y][x] == 8 ||dungeon[y][x] == 1 || dungeon[y][x] > 12)
        {
            collision = true;
        }
        return(collision);
    }

    //Funcion para que el enemigo se mueva al azar
    this.move = function() {

        principalPlayer.collisionEnemy(this.x, this.y);

        if(this.fps < this.slow) {
            this.fps++;
        }

        else {

            this.fps = 0;

            //UP
            if(this.direction == 0){
                if(!this.checkcollision(this.x, this.y - 1)) this.y--;
                else {
                    this.direction = Math.floor(Math.random()*4);
                }
            }

            //DOWN
            if(this.direction == 1){
                if(!this.checkcollision(this.x, this.y + 1)) this.y++;
                else {
                    this.direction = Math.floor(Math.random()*4);
                }
            }

            //LEFT
            if(this.direction == 2){
                if(!this.checkcollision(this.x - 1, this.y) && this.x - 1 != 1) this.x--;
                else {
                    this.direction = Math.floor(Math.random()*4);
                }
            }

            //RIGHT
            if(this.direction == 3){
                if(!this.checkcollision(this.x + 1, this.y)) this.x++;
                else {
                    this.direction = Math.floor(Math.random()*4);
                }
            }
        }
    }

}

//se setean las 3 vidas por defecto y la condicion de win se deja en 0
let life = 3;
let win = 0;


// CLASE JUGADOR
let player = function() {
    this.x = 1;
    this.y = 1;

    //Variable si tiene la llave
    this.keys = false;

    //funcion que define el sprite del jugador segun su orientacion
    this.draw = function(){

        ctx.drawImage(tileMap,64,64,32,32,this.x*anchoC, this.y*altoC,anchoC, altoC);

        if(this.arr == true){
            ctx.drawImage(tileMap,0,64,32,32,this.x*anchoC, this.y*altoC, anchoC, altoC);
        }

        if(this.aba == true){
            ctx.drawImage(tileMap,96,64,32,32,this.x*anchoC, this.y*altoC, anchoC, altoC);
        }

        if(this.izq == true){
            ctx.drawImage(tileMap,32,64,32,32,this.x*anchoC, this.y*altoC, anchoC, altoC);
        }

        if(this.der == true){
            ctx.drawImage(tileMap,64,64,32,32,this.x*anchoC, this.y*altoC, anchoC, altoC);
        }

        
    }

    //variable que hace que si el jugador toca un enemigo, se muera
    this.collisionEnemy = function(x,y){

        if(this.x == x && this.y == y){
            this.dead();
        }
    }

    //variable que hace que el jugador tenga colisiones con las paredes designadas
    this.limits = function(x,y) {
        let collision = false; 
        
        if(dungeon[y][x] == 0 || dungeon[y][x] == 7 
        || dungeon[y][x] == 8 || dungeon[y][x] > 12) 
        {
            collision = true;
        }

        return(collision);
    }

    //funcion para mover el personaje hacia arriba ↑
    this.up = function(){
        if(!this.limits(this.x,this.y-1)) {
            sound1.play();
            this.y--;
            this.arr = true;
            this.aba = false;
            this.izq = false;
            this.der = false;
            this.keylogic();
        }
    }

    //funcion para mover el personaje hacia abajo ↓
    this.down = function(){
        if(!this.limits(this.x,this.y+1)) {
            sound1.play();
            this.y++;
            this.arr = false;
            this.aba = true;
            this.izq = false;
            this.der = false;
            this.keylogic();
        }
    }

    //funcion para mover el personaje hacia la izquierda ←
    this.left = function(){
        if(!this.limits(this.x-1,this.y)) {
            sound1.play();
            this.arr = false;
            this.aba = false;
            this.izq = true;
            this.der = false;
            this.x--;
            this.keylogic();
        }
    }

    //funcion para mover el personaje hacia la derecha →
    this.right = function(){
        if(!this.limits(this.x+1,this.y)) {
            sound1.play();
            this.arr = false;
            this.aba = false;
            this.izq = false;
            this.der = true;
            this.x++;
            this.keylogic();
        }
    }

    //funcion para determinar la variable win, reseteando la posicion de la llave y su condicion de que si lo tiene o no el jugador
    this.win = function(){
        for(y=0; y < 14; y++){
            for(x=0; x < 24; x++) {
                if(dungeon[y][x] == 3) dungeon[y][x] = 2;
            }
        }
        win++;
        //Resetear la posicion y condicion del jugador
        this.x = 1;
        this.y = 1;
        this.keys = false;
        
        //Declaracion de cada opcion al azar que puede tomar la posicion de la llave al ganar la partida
        let options = [1,3,5,7,9,11,13,15]; 
        random = options[Math.floor(Math.random()*options.length)];
        dungeon[12][random] = 3;

        //Funcion de pasar el nivel
        passLevel();
        //Reseteo de la tile de la puerta para que aparezca cerrada
        dungeon[12][21] = 6;
    }

    //funcion para la mecanica de muerte del jugador
    this.dead = function(){
        sound4.play();
        console.log('Perdiste');

        //Reseteo de la posicion y condiciones del jugador
        this.x = 1;
        this.y = 1;
        this.keys = false;

        //Disminucion de la vida del jugador y cargado de textura indicadora de vida
        life--;
        dungeon[0][(20+(3-life))] = 8;
        dungeon[12][21] = 6;
                
        if(win > 0) dungeon[12][random] = 3;

        else dungeon[12][3] = 3;
    }

    //funcion para la llave, su logica y su posicionamiento en el mapa
    this.keylogic = function(){

        let position = dungeon[this.y][this.x];

        //Tomar llave
        if(position == 3) {
            sound3.play();
            this.keys = true;
            dungeon[this.y][this.x] = 2;
            dungeon[12][21] = 1;
            console.log('llave conseguida');
        }

        //ABRIMOS LA PUERTA
        if(position == 6){
            console.log('No tienes la llave, no puedes pasar!');
        }
        if(position == 1){
            sound2.play();
            this.win();
        }
    }
}

//funcion para pasar el nivel
let passLevel = function(){

    //Se agrega un enemigo cada vez que se gane para aumentar la dificultad
    if(win == 1) {
        enemy.push(new bad(22,12));
        dungeon[0][0] = 13;
        dungeon[0][1] = 16;  
    }

    if(win == 2) {
        enemy.push(new bad(16,4));
        dungeon[0][0] = 14;
    }

    if(win == 3) {
        enemy.push(new bad(10,9));
        enemy.push(new bad(4,12));
        dungeon[0][0] = 15;
    }

    //mensaje de felicitaciones al momento de ganar 4 veces y completar el juego
    if(win == 4) {
        Swal.fire({
            title: 'Felicitaciones, Has ganado!',
            padding: '2em',
            color: "#fff",
            background: 'url(/img/win.png)',
            confirmButtonText: 'Yes',
            confirmButtonColor: '#000'
        })

        //Reseteo de las veces ganadas y de las vidas del jugador
        win = 0;
        dungeon[0][0] = 0;
        dungeon[0][1] = 0;
        dungeon[0][21] = 7;
        dungeon[0][22] = 7;
        dungeon[0][23] = 7;

        //Eliminar los enemigos agregados en los niveles
        enemy.splice(3,4);
    }
}

function checkgameover() {
    //condicion para saber si ya no se tienen mas vidas
    if(life == 0) {
        life = 3;
        win = 0;
        dungeon[0][21] = 7;
        dungeon[0][22] = 7;
        dungeon[0][23] = 7;

        //mensaje de game over 
        Swal.fire({
            title: 'Game Over!',
            text: 'Quieres intentar de nuevo?',
            imageUrl: 'img/gameover.png',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Game Over',
            showDenyButton: true,
            denyButtonText: `Intentar de Nuevo`,
            showConfirmButton: false
        })

        //Reseteo de la posicion de la llave y de los niveles
        dungeon[12][random] = 2;
        dungeon[12][3] = 3;
        dungeon[0][0] = 0;
        dungeon[0][1] = 0;

        //Eliminacion de enemigos dependiendo del nivel en donde se queda sin vida el personaje
        if(win == 1) {
            enemy.splice(3,1);
        }
        if(win == 2) {
            enemy.splice(3,3);
        }
        if(win == 3) {
            enemy.splice(3,4);
        }
    }
}

//funcion en la cual se dibuja el mapa y colocando los respectivos sprites para el suelo, objetos, paredes, 
//tomando como modelo el array del mapa
function drawdungeon() {
    

    for(y=0; y < 14; y++){
        for(x=0; x < 24; x++) {
            let tile = dungeon[y][x];

            if(tile == 1) {
                ctx.drawImage(tileMap,32,32,32,32,this.x*anchoC, this.y*altoC,anchoC, altoC);
            }

            if(tile > 12) {
                ctx.drawImage(tileMap,((tile-13)*32),96,32,32,anchoC*x,altoC*y,anchoC,altoC);
            }
            
            if(tile > 4) {
                ctx.drawImage(tileMap,(64+((tile-7)*32)),32,32,32,anchoC*x,altoC*y,anchoC,altoC);
            }

            else {
                ctx.drawImage(tileMap,tile*32,0,32,32,anchoC*x,altoC*y,anchoC,altoC);
            }

        }
    }
}

var principalPlayer;
var tileMap;

//funcion que inicializa el proceso
function inicializar() {

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    music.play();

    //Crear jugador;
    principalPlayer = new player();

    //Crear enemigo;
    enemy.push(new bad(4,5));
    enemy.push(new bad(6,6));
    enemy.push(new bad(8,8));
    
    //Cargar la imagen para el uso de sprites en el mapa
    tileMap = new Image();
    tileMap.src = 'img/tilemap.png';

    //reconocimiento de las teclas del teclado para mover el jugador 
    document.addEventListener('keydown', function(key) {

        if(key.code == 'KeyW' || key.code == 'ArrowUp') principalPlayer.up();
        
        if(key.code == 'KeyS' || key.code == 'ArrowDown') principalPlayer.down();

        if(key.code == 'KeyA' || key.code == 'ArrowLeft') principalPlayer.left();

        if(key.code == 'KeyD' || key.code == 'ArrowRight') principalPlayer.right();

    })

    //se setean las teclas en false (para la carga de texturas diferentes al moverse)
    principalPlayer.arr = false;
    principalPlayer.aba = false;
    principalPlayer.izq = false;
    principalPlayer.der = false;

    //Intervalo para que se ejecute 50 fotogramas por seg
    setInterval(function() {
        main();
    }, 1000/fps);
}

//Funcion para eliminar el canvas, ya que se necesita actualizarlo cada vez
function deleteCanvas() {
    canvas.width = 1200;
    canvas.height = 700;
}

//Bucle principal
function main() {
    deleteCanvas();
    drawdungeon();
    checkgameover();
    principalPlayer.draw();

    //Dibujado y movimiento del enemigo
    for(c=0; c < enemy.length; c++){
        enemy[c].move();
        enemy[c].draw();
    }
}

