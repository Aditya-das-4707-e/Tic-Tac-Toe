let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; //playerX, PlayerO
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true; //reset turn to player O
    enableBoxes(); //enable all boxes
    msgContainer.classList.add("hide"); //hide the message container
    msg.innerText = ""; //clear the message text
}


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) { //player O's turn
            box.innerText = "O";
            box.style.color = "yellow"; //change color to blue for player O
            turnO = false;
        } else { //player X's turn
            box.innerText = "X";
            box.style.color = "lime"; //change color to red for player X
            turnO = true;
        }
        box.disabled = true; //disable the box after click
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""; //clear the text in the box
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, ${winner} is the winner!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkDraw = () => {
    let filled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            filled = false;
        }
    });

    if (filled) {
        msg.innerText = "It's a Draw! Nobody wins";
        msgContainer.classList.remove("hide");
    }
};


const checkWinner = () => {
    for (let pattern of winPatterns) {        
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner " + pos1Val);
                showWinner(pos1Val);
                return; // Exit the function after finding a winner
            }
        }
    }
    checkDraw(); // Check for a draw if no winner is found
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);