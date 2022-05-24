//build a function that will add an event listener to all of the buttons except the submit button. The submit button will be taken care of in
//a 'submit' event listener. The event listener should be added based on what the ID of that specific button is. I will need an if statement to
//differentiate them. Build a new function to handle that if statement.

//define a variable in global scope to act as the tracker of all the numbers that have been liked, and how many times that has occured.
let counterTracker = {}
let counterEnabled = true

window.addEventListener('DOMContentLoaded', () => {
    addclickEventListener()
    setTimeout(counterAdvancement, 1000)
    addCommentListener()
})

function addclickEventListener() {
    let buttons = document.querySelectorAll('button')
    for (let individualButton of buttons) {
        if (individualButton.id != 'submit') {
            individualButton.addEventListener('click', e => handleEventListeners(e, individualButton.id))
        }
    }
}

function handleEventListeners(e, buttonID) {
    if (buttonID === 'minus') {
        minusEventListener(e)
    }
    if (buttonID === 'plus') {
        plusEventListener(e)
    }
    if (buttonID === 'heart') {
        heartEventListener(e)
    }
    if (buttonID === 'pause') {
        pauseAndResumeEventListener(e)
    }
}

function minusEventListener(e) {
    let counter = document.querySelector('h1#counter')
    counterAsInteger = parseInt(counter.textContent)
    counterAsInteger -= 1
    counter.textContent = counterAsInteger.toString()
}

function plusEventListener(e) {
    let counter = document.querySelector('h1#counter')
    counterAsInteger = parseInt(counter.textContent)
    counterAsInteger += 1
    counter.textContent = counterAsInteger.toString()
}

function heartEventListener(e) {
    //grab the counter text box from the html and make it an integer
    let counter = document.querySelector('h1#counter')
    let counterAsInteger = parseInt(counter.textContent)
    let counterTrackArray = Object.entries(counterTracker)
    //check if the number that is currently in the counter has been clicked before.
    if (counterTrackArray.find(indCounter => indCounter[0] === `number${counterAsInteger}`)) {
        updateNewLi(counterAsInteger)
    }
    else {
        //if the counter number has not been liked before send the counterAsInteger variable and the counterTracker array to addNewLi
        addNewLi(counterAsInteger)
    }
}

//add a new li element to the ul.likes element
function addNewLi(counterAsInteger) {
    
    let newJson = `{"number${counterAsInteger}": "1"}`
    let newObj = JSON.parse(newJson)
    counterTracker = {
        ...counterTracker,
        ...newObj
    }
    let newLi = document.createElement('li')
    let numberOfLikes = document.querySelector('ul.likes')

    newLi.id = `number${counterAsInteger}`
    newLi.textContent = `${counterAsInteger} has been liked 1 time`
    numberOfLikes.append(newLi)
}

function updateNewLi(counterAsInteger) {
    //assign the two keys in the objects to variables
    let counterCount = parseInt(counterTracker[`number${counterAsInteger}`])
    
    //if it has add one to the number of times it has been liked. get the li element associated with the counter number. assign the text
    //to have the correct counter number and the correct number of times it has been liked.
    counterCount += 1
    counterTracker[`number${counterAsInteger}`] = counterCount

    let counterLi = document.querySelector(`li#number${counterAsInteger}`)
    counterLi.textContent = `${counterAsInteger} has been liked ${counterCount} times`
}


function counterAdvancement() {
    if (counterEnabled) {
        const counter = document.querySelector('h1#counter')
        counterAsInteger = parseInt(counter.textContent)
        counterAsInteger += 1
        counter.textContent = counterAsInteger
        setTimeout(counterAdvancement, 1000)
    }
}


function pauseAndResumeEventListener() {
    let buttons = document.querySelectorAll('button')
    let pauseButton = document.querySelector('button#pause')
    if (pauseButton.textContent === ' pause ') {
        pauseButton.textContent = ' resume '
        counterEnabled = false
        for (let individualButton of buttons) {
            if (individualButton.id != 'pause') {
                individualButton.disabled = true
            }
        }
    } else {
        pauseButton.textContent = ' pause '
        counterEnabled = true
        setTimeout(counterAdvancement, 1000)
        for (let individualButton of buttons) {
            individualButton.disabled = false
        }
    }
}


function addCommentListener() {
    const form = document.querySelector('form')
    const commentDiv = document.querySelector('div#list')
    form.addEventListener('submit', e => {
        e.preventDefault()
        const newP = document.createElement('p')
        newP.textContent = e.target.comment.value
        e.target.comment.value = ''
        commentDiv.append(newP)
    })
}