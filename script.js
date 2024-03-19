const playBtn = document.getElementById('play-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const textInput = document.getElementById('text');
const speedInput = document.getElementById('speed');
let currentChar;


pauseBtn.addEventListener('click', pauseText);

stopBtn.addEventListener('click', stopText);

speedInput.addEventListener('input', () =>{
    stopText();
    playText(utterance.text.substring(currentChar));
})

playBtn.addEventListener('click', () => {
    playText(textInput.value);
})

const utterance = new SpeechSynthesisUtterance();
utterance.addEventListener('end',() =>{
    textInput.disabled = false;
})
utterance.addEventListener('boundary', e => {
    currentChar = e.charIndex;
})

function playText(text){
    if(speechSynthesis.paused && speechSynthesis.speaking) 
    return speechSynthesis.resume();
    utterance.text = text;
    utterance.rate = speedInput.value || 1;
    textInput.disabled = true;
    speechSynthesis.speak(utterance);
}

function pauseText(){
    if(speechSynthesis.speaking) speechSynthesis.pause();
}

function stopText(){
    speechSynthesis.resume();
    speechSynthesis.cancel();
}