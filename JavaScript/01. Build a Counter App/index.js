let countEl = document.getElementById("count-el")
let count = 0
let saveEl = document.getElementById("save-el")

function increment() {
    count += 1

    countEl.innerText = count

}
function save() {
    // 2. Create a variable that contains both the count and the dash separator, i.e. "12 - "
    let countStr = count + " - "
    saveEl.textContent += countStr
    console.log(count)
    countEl.textContent=0
    count=0  
}

let firstName="israa"
let lastName="elhalaby"
function getName(){
    console.log(firstName+" "+lastName)
}

getName()
function error(){
    let  x = document.getElementById("error")
    x.textContent="something went wrong!!!"
    
}
