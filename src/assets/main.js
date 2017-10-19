let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let messageLabel = document.getElementById('message');
let guessedAnswerInput = document.getElementById('user-guess');
let guessedAnswer = '';
let resultsDiv = document.getElementById('results');

function guess() {
        setHiddenFields();
        guessedAnswer = guessedAnswerInput.value
        if (!validateInput(guessedAnswer)){
            return false;
        }
        attempt++;
        if(getResults(guessedAnswer)){
            setMessage('You Win! :)');
            showAnswer(true);
            showReplay();
        }
        else if (attempt > 9){
                setMessage('You Lose :(')
                showAnswer(false);
                showReplay();
                hasGameEnded = true;
        }
        else{
            setMessage('Incorrect, try again.')
        }
}

function setHiddenFields(){
    if (answer.value == ''){
        var randomNumber = Math.random() * 10000;
        a = Math.floor(randomNumber);
        makeAnswerFourCharsLong(a);
    }
    if (attempt.value == '')
    {
        attempt = 0;
    }      
}

function makeAnswerFourCharsLong(a){
    var lengthOfAnswer = a.toString().length;
    answer.value = a.toString();
    while(lengthOfAnswer < 4){
        answer.value = '0' + a.toString();
        lengthOfAnswer++;
    }
}

function setMessage(message){
    messageLabel.innerHTML = message;
}

function validateInput(input){
    if (input.length != 4){
        setMessage('Guesses must be exactly 4 characters long.')
        return false;
    }
    setMessage('')
    return true;
}

function getResults(guessedAnswer){
    var correctPosition = '<span class="glyphicon glyphicon-ok"></span>';
    var correctValueWrongPosition = '<span class="glyphicon glyphicon-transfer"></span>';
    var nope = '<span class="glyphicon glyphicon-remove"></span>';
    var correctCharacters = 0;
        
    var result = '<div class="row"><span class="col-md-6">' + guessedAnswer + '</span><div class="col-md-6"><div class="row"><span class="col-md-6">';

    for (var i = 0; i < guessedAnswer.length; i++) {
        if (guessedAnswer[i] === answer.value[i]){
            result += correctPosition;
            correctCharacters++;
        }
        else if (answer.value.includes(guessedAnswer[i])) {
            result += correctValueWrongPosition;
        }
        else{
            result += nope;
        }
    }
    result += '</span><div class="col-md-6">'

    resultsDiv.innerHTML += result;
    if (correctCharacters == 4){
        return true;
    }
    return false;
}

function showAnswer(playerWon){
    var code = document.getElementById('code');
    code.innerHTML = answer.value;
    if (playerWon){
       code.className += " success";
    }
        else{
            code.className += " failure";
        }
        
}

function showReplay(){
   var guessDiv = document.getElementById('guessing-div').style.display = "none";
   var replayDiv = document.getElementById('replay-div').style.display = "block";
}