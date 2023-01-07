let sequence = []
let level = 0
let count = 0
let started = false
let highscore = 0

//produces a random number and adds it to the sequence
function random(){
    let x = Math.floor((Math.random()*4)+1)
    sequence.push(x)
    pressButton(x)
}

//executes anytime a button is pressed from both computer or player
function pressButton(x){
    if(started)
    {
        let s = "#"+x
        $(s).addClass("pressed")
        setTimeout(flash, 200);

        function flash() {
            $(s).removeClass("pressed")
        }
        let audio = ""
        if(x==1)
            audio = new Audio("sounds/cat.wav")
        if(x==2)
            audio = new Audio("sounds/dog.wav")
        if(x==3)
            audio = new Audio("sounds/monkey.wav")
        if(x==4)
            audio = new Audio("sounds/bird.wav")
        audio.play()
    }
    
}

//starts the game
//and updates the highscore
function start(){
    $("body").css("background-color", "darkgreen")
    started=true
    $("#start").empty()
    $("#over").empty()
    level++
    if(level>highscore)
    {
        highscore=level
        $("#score").html("HIGHSCORE: "+(level-1))
    }
    count=0
    $("h1").text("Level "+level)
    setTimeout(random, 300)
}

//executes anytime a button is pressed
//determines whether the button pressed is correct
//if not, the game ends
function play(num){
    let correct = true
    if(started)
    {
        pressButton(num)
        if(sequence[count]==num && count<sequence.length)
        {
            $("body").css("background-color", "green")
            setTimeout(flash, 300)
            count++
        }
        else
        {
            gameOver()
            correct = false
        }
            function flash() {
                $("body").css("background-color", "darkgreen")
            }
        if(count==sequence.length && correct)
            setTimeout(start, 300)
    }
    
}

//displays the game over display
function gameOver(){
    started = false
    $("body").css("background-color", "#9c0707")
    $("h1").text("Game Over")
    $("#over").html("Failed Level "+level+"<br>Click RESTART to try again")
    $("#start").html("<button id=start-button onclick=start()>RESTART</button>")
    level=0
    sequence = []
}

//toggles the instructions display
function instructions(){
    let s = "1. The computer will produce a random sequence<br>"+
    "2. Follow after the computer and click the sequence that the computer played.<br>"+
    "3. As the levels increase, one more button will be added to sequence.<br>"+
    "4. Press start to begin the game.<br><br>"+
    "Good luck!"
    
    if($("#int-con").text()== "")
        $("#int-con").html(s)
    else
        $("#int-con").html("")

}
