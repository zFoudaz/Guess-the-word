const words = [
    "action", "chance", "coffee", "friend", "galaxy", "beauty", "bright", "change", "danger", "energy", 
    "family", "golden", "health", "honest", "island", "jungle", "kindly", "leader", "memory", "nation", 
    "ocean", "people", "planet", "reason", "safety", "sailor", "season", "signal", "spirit", "turtle", 
    "united", "vision", "wealth", "winner", "writer", "yellow", "zigzag", "crisis", "couple", "castle", 
    "curves", "career", "garden", "hunter", "heater", "humane", "nature", "orange", "puzzle", "plasma", 
    "public", "quartz", "rocket", "ranger", "rescue", "reward", "silent", "secret", "soccer", "silver", 
    "system", "theory", "tomato", "twenty", "urgent", "values", "volume", "victor", "wonder", "wealth", 
    "youths", "future", "heroes", "jacket", "joints", "myself", "online", "remote", "reward", "snacks", 
    "strong", "status", "symbol", "target", "thanks", "themed", "toward", "travel", "unique", "urgent", 
    "vision", "wonder", "winner", "wishes", "winter", "virtue", "wander", "wizard", "zodiac", "bounce", 
    "budget", "burden", "button", "carpet", "carbon", "custom", "desert", "device", "divide", "doctor", 
    "driver", "editor", "effect", "effort", "empire", "escape", "expect", "expert", "export", "extend", 
    "flight", "forest", "forgot", "future", "garden", "gifted", "glance", "global", "golden", "gossip", 
    "growth", "hidden", "holder", "horror", "impact", "import", "injury", "insect", "island", "itself", 
    "jacket", "jersey", "jewels", "jigsaw", "junior", "kernel", "knight", "ladder", "laptop", "launch", 
    "lawyer", "legend", "lesser", "letter", "lights", "little", "luxury", "manage", "market", "master", 
    "matter", "mentor", "method", "middle", "mighty", "mining", "minute", "mirror", "mobile", "modern", 
    "module", "moment", "monkey", "morale", "mother", "motion", "motive", "mystic", "native", "needle", 
    "nights", "notion", "number", "object", "office", "online", "option", "output", "oxygen", "palace", 
    "parade", "parent", "patent", "people", "period", "person", "phrase", "planet", "plasma", "police", 
    "policy", "porter", "postal", "poster", "potato", "praise", "prayer", "priest", "prince", "prison", 
    "profit", "proper", "public", "puzzle", "quartz", "rabbit", "racing", "random", "ranger", "rating", 
    "reason", "record", "reform", "refuse", "regime", "region", "remote", "repair", "repeat", "rescue", 
    "result", "review", "reward", "rhythm", "ribbon", "richer", "rocket", "runner", "safety", "sailor", 
    "scheme", "school", "screen", "sector", "secret", "select", "senior", "sensor", "serial", "server", 
    "settle", "shadow", "shared", "silent", "silver", "single", "sketch", "social", "soccer", "spider", 
    "spirit", "stable", "stream", "stress", "string", "strike", "strong", "submit", "subtle", "sudden", 
    "summer", "survey", "symbol", "system", "target", "temple", "thanks", "theory", "thirty", "ticket", 
    "tomato", "toward", "travel", "tunnel", "turkey", "turtle", "unique", "urgent", "valley", "values", 
    "vendor", "vision", "volume", "wander", "weapon", "wealth", "winner", "winter", "wonder", "writer", 
    "yellow", "youths", "zigzag", "zodiac"
];
const dark = document.querySelectorAll('.dark');
let isdark;
let darkBtn = document.getElementById('darkmode');
if(localStorage.getItem('screenMode')){
    isdark=parseInt(localStorage.getItem('screenMode'));
    console.log(isdark)
    if(!isdark){
        isdark=1
        changemode()
    }
}else{
    isdark=1;
    localStorage.setItem('screenMode',1);
}
function changemode(){
    if(isdark){
        dark.forEach(function(ele){
            ele.classList.remove('dark');
            darkBtn.innerHTML='<i class="fa-regular fa-moon"></i>'
            isdark=0;
        })
    }else{
        dark.forEach(function(ele){
            ele.classList.add('dark');
            darkBtn.innerHTML='<i class="fa-regular fa-sun">'
            isdark=1;
        })
    }
    localStorage.setItem('screenMode',isdark);
}


let wordIndex = Math.floor(Math.random()* words.length);
console.log(`are you trying to cheat? \nanyways the answer is ${"\x1b[31m" +words[wordIndex]+ "\x1b[37m"}`)
console.log(`you may ask me why you type the answer here \nit was for checking the code and I am lazy to remove it`)
console.log(`Maybe you're not cheating after all; you might be checking for study purposes`)
console.log(`created with love by ${"\x1b[36m"} Ziyad Fouda ❤️`)
let trueWord = words[wordIndex];
let trueChars=0;
let currentGuess = 0;
let tries = document.querySelectorAll('.try')
let inputs=document.querySelectorAll('input');
let checkBtn = document.getElementById('check');
let winner =false;
let hints =2 ;
let lasthint=[];
let hintBtn = document.getElementById('hint');
checkActive();



//keyboard functions
inputs.forEach(function(element,index){
    element.addEventListener('keyup',function(event){
        setTimeout(() => {
            if (event.key === "Enter"){
                event.preventDefault();
                checkBtn.click()
            }
            else if(event.key === 'ArrowRight'){
                if(!([5,11,17,23,29,35].includes(index))){
                    inputs[index+1].focus()
                }
            }
            else if(event.key === 'ArrowLeft'){
                if(!([0,6,12,18,24,30].includes(index))){
                    inputs[index-1].focus()
                }
            }
            else if (event.key === 'Backspace'){
                if(!([0,6,12,18,24,30].includes(index))){
                    inputs[index].value=""
                    inputs[index-1].focus();
                }
            }
            else if(!([5,11,17,23,29,35].includes(index))&&inputs[index].value!=""){
                for(j=index; j<inputs.length ; j++){
                    if(inputs[j+1].hasAttribute('disabled')){
                        continue;
                    }else{
                        inputs[j+1].focus();
                        break;
                    }
                }
            }
            
        }, 90);
        
    })
})

// check the answer
checkBtn.addEventListener('click',function check(){
    let word = document.querySelector('.active').children
    let solveArr=trueWord.split('');
    let nextTry = document.querySelector('.active + .try');
    for(let i=1;i<word.length;i++){
        if(word[i].value.toLowerCase() === trueWord[i-1]){
            lasthint.push(i-1);
            word[i].classList.add('right_both')
            ///////////////////////////////////
            if(solveArr.indexOf(word[i].value)!=-1){
                solveArr.splice(solveArr.indexOf(word[i].value),1);
            }
            if(nextTry){
                nextTry.children[i].value =word[i].value;
                nextTry.children[i].classList.add('right_both');
                nextTry.children[i].setAttribute('disabled',"")
            }
            trueChars++;
        }
        else if(solveArr.includes(word[i].value.toLowerCase())){
            word[i].classList.add('right_letter')
            /////////////////////////////////////
            if(solveArr.indexOf(word[i].value)!=-1){
                solveArr.splice(solveArr.indexOf(word[i].value),1);
            }
        }
        else{
            word[i].classList.add('wrong')
        }
    }
    if(trueChars==6){
        win()
        checkBtn.setAttribute('disabled',"")
    }else{
        //check if you have more tries or not
        trueChars=0
        if(currentGuess==5){
            lose()
            checkBtn.setAttribute('disabled',"")
        }else{
            tries[currentGuess].classList.remove('active');
            tries[++currentGuess].classList.add('active');
            checkActive();
        }
    }
})
hintBtn.addEventListener('click',function hint(){
    if(hints!=0){
        let activeTry = document.querySelector('.active').children;
        let hintIndex = Math.floor(Math.random()*6);
        if(!lasthint.includes(hintIndex)){
            lasthint.push(hintIndex);
            hints--;
            hintBtn.innerText =`${hints} Hint`
            activeTry[hintIndex+1].value=trueWord[hintIndex];
            activeTry[hintIndex+1].classList.add('hint')
            activeTry[hintIndex+1].setAttribute('disabled','')
        }
        else{
            hint()
        }
    }
})
// change the try
function checkActive(){
    tries.forEach(function(element){
        let childs=element.children
        if(!(element.classList.contains('active'))){
            for(let i=1 ; i<childs.length;i++){
                childs[i].setAttribute('disabled',"");
            }
            }else{
                for(let i=1 ; i<childs.length;i++){
                    if(childs[i].value==''){
                        childs[i].removeAttribute('disabled')
                    }
                }
                for(let i=1 ; i<childs.length;i++){
                    if(childs[i].value==''){
                        childs[i].focus();
                        break;
                    }
                }
                
            }
        }
    )
}

function win(){
    disableAll()
    document.getElementById('win').style.display='flex';
}
function lose(){
    disableAll()
    let answerChars=document.querySelectorAll('#answer span');
    for (let i = 0; i < answerChars.length; i++) {
        answerChars[i].innerText = trueWord[i].toUpperCase()
    }
    document.getElementById('lose').style.display='flex';
}
function disableAll(){
    inputs.forEach(function(ele){
        ele.setAttribute('disabled',"")
    })
    tries.forEach(function(ele){
        ele.classList.remove('active')
    })
}

function again(){
    location.reload()
}
