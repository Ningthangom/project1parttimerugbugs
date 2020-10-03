
let hasFlippedCard = false;
let lockBoard = false; //stops user spam clicking
let firstCard;
let secondCard;
var remain = 20; //CHANGE THIS FOR OTHERS


const cards = document.querySelectorAll('.memoryCardExtreme'); //selects all cards
cards.forEach(card => card.addEventListener('click',flipCard)); //adds event listener for cards


//flip card function
function flipCard() {
    if (lockBoard) return; //locks board 
    if (this === firstCard) return;
    this.classList.toggle('flip')
    

if (hasFlippedCard===false){

    //first click
    hasFlippedCard = true;
    firstCard = this;
    console.log(this);
    moveCounter();
}
else {

    //second click
    secondCard = this;
    console.log(this);
    
    checkMatch();  
}
}
function checkMatch (){
    if (firstCard.id === secondCard.id){
        //turn off event listener
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)
     
        remain=remain -2; // removes from number from remaining cards
        document.getElementById("remaining").innerHTML = remain; //pushes back to remaining cards
        
        tallyScore(); //Tallys the score
        resetBoardstate(); //Resets the board

    } else {
        lockBoard = true;
        setTimeout(() => {
        firstCard.classList.remove('flip'); //removes event listner
        secondCard.classList.remove('flip');
        
        resetBoardstate(); //Resets the board 
    }, 1000);
}
}
function resetBoardstate(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    
} //resets board state after cards have been selected 

//runs on start up
function shuffle(){
    cards.forEach(card => {
        let random = Math.floor(Math.random() * 20); //CHANGE THIS FOR OTHER LEVELS
        card.style.order = random;
    });

}; //immediate function

let time 
//Countdown timer for time trial
var timerInterval;
function startTimer(){   
        time = 30; //Sets time
        timerInterval = setInterval(function(){
        document.getElementById("timer").innerHTML = time //Displays time
        time --; //counts down
        if(time == -1){ //Stops timer when it reads zero
            cards.forEach(card => card.removeEventListener('click',flipCard)); //Removes the event listener 
            clearInterval(timerInterval); //Clears the interval
        if (document.getElementById("timer").innerHTML ==0){ //pop up displays when out of time and cards are remaining
            openModal(modal);
        }
        }                    
    },1000);
}
startTimer()

//makes game over pop up display when timer zero  & when cards are remaining
const closeModalButtons = document.querySelectorAll('[data-close-button]')

//button to close Game over pop up
closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
    });
});

function openModal(modal) {
    if (modal==null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
};

function closeModal(modal){
    if (modal==null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
}
 

//Move counter
var moves=0;
function moveCounter(){
    moves += 1;
    document.getElementById("moves").innerHTML = moves;
}
//score
var score=0;
function tallyScore(){
    score +=1;
    document.getElementById("score").innerHTML=score
}

function restartGame(){
    console.log("working")
    score = 0;
    document.getElementById("score").innerHTML = score;
    time = 0;
    clearInterval(timerInterval);
    document.getElementById("timer").innerHTML = time;
    remain= 20;
    document.getElementById("remaining").innerHTML = remain;
    cards.forEach(card => card.classList.remove('flip'));
    setTimeout(() => {
        shuffle();
        cards.forEach(card => card.addEventListener('click',flipCard));
        startTimer();
    }, 1000);
}
shuffle();
    
 //giphy api key = JitPy4nJ4f7RAjv9P6V2YfrZqtdpPymb
    
    var gameNumber = 10;
    
    var queryurl = "https://api.giphy.com/v1/gifs/trending?api_key=JitPy4nJ4f7RAjv9P6V2YfrZqtdpPymb&tag=&rating=g&limit=" + gameNumber;

    $.ajax({
        url: queryurl,
        type: "GET",
    

        }).then(function(response) {
            console.log(response);
            //var imageUrl = response.data.images.fixed_width_small.url
            var results = response.data
            console.log(results);
            //function showImages(){
           for (var i = 0; i < results.length; i++) {
                
                //displaying the called images
                var imageUrl = results[i].images.fixed_width_small.url
                console.log(imageUrl);
                //storing giphy images
                localStorage.setItem("image" + i, imageUrl);               
                //setting the images in the html
                console.log("#image" + i);           
            };
       });

       //function to set the Giphy to the cards
       function setImg(){
        for (i=0; i <= gameNumber; i++){
           
            var imgLocation = localStorage.getItem("image" + i);
            $(".image" + i + "-1").find(".front-face").attr("src", imgLocation);
            $(".image" + i + "-2").find(".front-face").attr("src", imgLocation);

            }
        };

        setImg();

        
        //NASA API Query to set back face of the cards to space image of the day.
        var querynasaurl =  "https://api.nasa.gov/planetary/apod?api_key=gvVohqUVbtkSp9QeSHaXWrMi9fkSXAdB5wQcHqRW"
        
        
        $.ajax({
            url: querynasaurl,
            type: "GET",
        
    
            }).then(function(response) {
                console.log(response);
                var backgroundimg = response.url;
                
                for (i=0; i <= gameNumber; i++){
           
                    var imgLocation = localStorage.getItem("image" + i);
                    $(".image" + i + "-1").find(".back-face").attr("src", backgroundimg);
                    $(".image" + i + "-2").find(".back-face").attr("src", backgroundimg);
        
                    }
                
            });

    


