const passwordText = document.querySelector("[password-length]");
const slider = document.querySelector(".slider");

let passwordLength = 10;
let password = "";
let checkCount = 0;

const ind = document.querySelector(".indicator");
let str = "!@#$%^&*()_+=-/}[{]}';,.";
handlesider();
setColor('#ccc');

function handlesider(){
    passwordText.innerText = passwordLength;
    slider.value = passwordLength;
    console.log("I am under the function handle slider");
    const min = slider.min;
    const max = slider.max;
    slider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

function randomInteger(min,max){
    return (Math.floor(Math.random()*(max-min))+min);
}

function generateRandomNumber(){
    return randomInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(randomInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(randomInteger(65,91));
}

function generateSymbols(){
    return str[randomInteger(0,str.length)];
}


function setColor(color){
    ind.style.backgroundColor = color;
    ind.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

const upper = document.querySelector("#uppercase");
const lower = document.querySelector("#lowercase");
const number = document.querySelector("#numbers");
const symbol = document.querySelector("#symbols");

function calculateStrength(){

    if((upper.checked) && (lower.checked) && (number.checked || symbol.checked) && (passwordLength>=8)){
        setColor('#0f0');
    }

    else if((upper.checked || lower.checked) && (number.checked || symbol.checked) && (passwordLength>=6)){
        setColor('#ff0');
    }
    else{
        setColor('#f00');
    }
}

const pss = document.querySelector("[password-display]");
const text = document.querySelector("[imageText]");

async function copyfuntion(){
    try {
        console.log("I am under try");
        await navigator.clipboard.writeText(pss.value);
        text.innerText = "Copied";
        
    } catch (error) {
        console.log("I am under catch");
        text.innerText = "Failed";
    }

    text.classList.add('active');

    setTimeout(() => {
        text.classList.remove('active');
    }, 1000);
}

let image = document.querySelector(".cpy");

image.addEventListener('click',copyfuntion)
const btn = document.querySelector('.cpy');

btn.addEventListener('click',()=>{
    if(pss.value){
        copyfuntion();
    }
});

slider.addEventListener('input',(e)=>{
    console.log("hi");
    passwordLength = e.target.value;
    console.log("I am under the add event listener");
    handlesider();
})

const allCondition = document.querySelectorAll('input[type = "checkbox"]');
console.log("printing all condition : ",allCondition);

function handleCheckBoxChange() {
    console.log("checkbox is changed");
    checkCount = 0;
    allCondition.forEach( (checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    console.log("Printing the checkCount is ",checkCount);

}

allCondition.forEach((element) => {
    element.addEventListener('change',handleCheckBoxChange);
});

function shuffle(array){
    let n = array.length;

    for(let i = n-1;i>=0;i--){
        let j = randomInteger(0,array.length);

        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let er = "";
    for(let i = 0;i<n;i++){
        er+=array[i];
    }

    return er;
}

const butt = document.querySelector("[generate]");

butt.addEventListener('click',()=>{
    console.log("I am here");
    console.log("Password Length is ",passwordLength);
    console.log("checkCount is ",checkCount);
    if(passwordLength<=0){
        return;
    }
    
    if(passwordLength<checkCount){
        console.log("I am under this condition");
        passwordLength = checkCount;
        handlesider();
    }
    
    password = "";
    
    let funArr  = [];
    
    if(upper.checked){
        funArr.push(generateUpperCase);
    }
    if(lower.checked){
        funArr.push(generateLowerCase);
    }
    if(number.checked){
        funArr.push(generateRandomNumber);
    }
    if(symbol.checked){
        funArr.push(generateSymbols);
    }
    
    // Compulsary addition
    for(let i = 0;i<funArr.length;i++){
        password+=funArr[i]();
    }
    
    // Remaining addition
    for( let i = 0;i<(passwordLength-funArr.length);i++){
        let index = randomInteger(0,funArr.length);
        password+=funArr[index]();
    }
    
    //Shuffling of password
    password = shuffle(Array.from(password));
    
    // Display the password
    pss.value = password;

    // check the strength
    calculateStrength();
})