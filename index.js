// Display Information
var displayInfo = document.getElementById('display-info');
var dateContainer = document.getElementById('date-container');

// HOURS
var hrsLeftCurrent = document.querySelector('.hrs-left-dialer-current');
var hrsLeftNext = document.querySelector('.hrs-left-dialer-next');
var hrsRightCurrent = document.querySelector('.hrs-right-dialer-current');
var hrsRightNext = document.querySelector('.hrs-right-dialer-next');

// MINUTES
var minLeftCurrent = document.querySelector('.min-left-dialer-current');
var minLeftNext = document.querySelector('.min-left-dialer-next');
var minRightCurrent = document.querySelector('.min-right-dialer-current');
var minRightNext = document.querySelector('.min-right-dialer-next');

// SECONDS
var currentSecondsRight = document.querySelector('.sec-right-dialer-current');
var nextSecondsRight = document.querySelector('.sec-right-dialer-next');
var currentSecondsLeft = document.querySelector('.sec-left-dialer-current');
var nextSecondsLeft = document.querySelector('.sec-left-dialer-next');

// AM or PM
var amPMLeftCurrent = document.querySelector('.amPM-left-dialer-current');
var amPMLeftNext = document.querySelector('.amPM-left-dialer-next');
var amPMRightCurrent = document.querySelector('.amPM-right-dialer-current');
var amPMRightNext = document.querySelector('.amPM-right-dialer-next');

var secondsInterval, minutesInterval, hoursInterval, amPMInterval, pageLoader;

var rtClock = new Date();

var hours = rtClock.getHours();
var minutes = rtClock.getMinutes();
var seconds = rtClock.getSeconds();

// Current hours (left digit)
var tempHours = hours;
tempHours = ("0" + tempHours).slice(-2, -1);
hrsLeftCurrent.innerHTML = tempHours;

// Current minutes (left digit)
var tempMinutes = minutes;
tempMinutes = ("0" + tempMinutes).slice(-2, -1);
minLeftCurrent.innerHTML = tempMinutes;

// Current seconds (left digit)
var tempSeconds = seconds;
tempSeconds = ("0" + tempSeconds).slice(-2, -1);
currentSecondsLeft.innerHTML = tempSeconds;


// Show AM or PM  
var amPm = (hours < 12) ? "AM" : "PM";

// Showing left/right part of AM/PM
var temp = amPm.slice(-2, -1);
amPMLeftCurrent.innerHTML = temp;
amPMRightCurrent.innerHTML = amPm.slice(-1);

// Making every number as two digit number
hours = ("0" + hours).slice(-1);
minutes = ("0" + minutes).slice(-1);
seconds = ("0" + seconds).slice(-1);

// Current hours (right part)
hrsRightCurrent.innerHTML = hours;

// Current minutes (right part)
minRightCurrent.innerHTML = minutes; 

// Current seconds (right part)
currentSecondsRight.innerHTML = seconds;


// Automatically called when homepage is loaded
function clock(){

    secondsInterval = setInterval(runSecondsClock, 1000);
    minutesInterval = setInterval(runMinutesClock, 1000);
    hoursInterval = setInterval(runHoursClock, 1000);
    pageLoader = setInterval(refreshPage, 360000);

}

// Refresh Page
function refreshPage(){
    location.reload();
}

// SECONDS FUNCTIONALITY

var secondsCounter = seconds;
var tempSecondsCounter = tempSeconds;

function runSecondsClock(){

    if(secondsCounter < 10){

        if(secondsCounter == 9){

            secondsCounter = -1;

            if(tempSecondsCounter > 4){
                tempSecondsCounter = 0;
                nextSecondsLeft.innerHTML = tempSecondsCounter;
                nextSecondsLeft.classList.add('sec-left-dialer-next-animate');
            }
            else{
                nextSecondsLeft.innerHTML = ++tempSecondsCounter;
                nextSecondsLeft.classList.add('sec-left-dialer-next-animate');
            }

        }

        nextSecondsRight.innerHTML = ++secondsCounter;
    }
    
    nextSecondsRight.classList.add('sec-right-dialer-next-animate');

    setTimeout(function(){

            currentSecondsRight.innerHTML = secondsCounter;
            nextSecondsRight.classList.remove('sec-right-dialer-next-animate');
    
            currentSecondsLeft.innerHTML = tempSecondsCounter;
            nextSecondsLeft.classList.remove('sec-left-dialer-next-animate');

    }, 500);

}


// MINUTES FUNCTIONALITY

var minutesRightCounter = minutes;
var minutesLeftCounter = tempMinutes;

function runMinutesClock(){

    if(secondsCounter == 0 && tempSecondsCounter == 0){

        if(minutesLeftCounter > 4){

            // 59 : 59 => 00 : 00 case
            if(minutesRightCounter == 9){
                minutesLeftCounter = 0;
                minLeftNext.innerHTML = minutesLeftCounter;
                minLeftNext.classList.add('min-left-dialer-next-animate');
    
                minutesRightCounter = 0;
                minRightNext.innerHTML = minutesRightCounter;
                minRightNext.classList.add('min-right-dialer-next-animate');
            }
            else{
                minRightNext.innerHTML = ++minutesRightCounter;
                minRightNext.classList.add('min-right-dialer-next-animate');
            }

        }
        else{
            
            // [(09/19/29/39/49) : 59] case (09 : 59 -> 10 : 00)
            if(minutesRightCounter > 8){
                minLeftNext.innerHTML = ++minutesLeftCounter;
                minLeftNext.classList.add('min-left-dialer-next-animate');
    
                minutesRightCounter = 0;
                minRightNext.innerHTML = minutesRightCounter;
                minRightNext.classList.add('min-right-dialer-next-animate');
            }
            // (05 : 59 --> 06 : 00) case
            else{
                minRightNext.innerHTML = ++minutesRightCounter;
                minRightNext.classList.add('min-right-dialer-next-animate');
            }

        }
    }


    setTimeout(function(){

        minRightCurrent.innerHTML = minutesRightCounter;
        minRightNext.classList.remove('min-right-dialer-next-animate');

        minLeftCurrent.innerHTML = minutesLeftCounter;
        minLeftNext.classList.remove('min-left-dialer-next-animate');

    }, 500);

}

// HOURS FUNCTIONALITY

var hoursRightCounter = hours;
var hoursLeftCounter = tempHours;

var interval;

function runHoursClock(){

    // isAlarmTime checks whether there is alarm time which matches with real time
    const isAlarmTime = alarmTimeCheck(tempSecondsCounter, secondsCounter, minutesLeftCounter, minutesRightCounter, hoursLeftCounter, hoursRightCounter, amPm);

    // If alarm times matches alarm goes on
    if(isAlarmTime){

        interval = setInterval(alarmOn, 1000);

    }

    if((minutesRightCounter == 0 && minutesLeftCounter == 0) && (secondsCounter == 0 && tempSecondsCounter == 0)){

        // 23 : 59 : 59 => 00 : 00 : 00 case
        if(hoursLeftCounter == 2 && hoursRightCounter == 3){
            hoursLeftCounter = 0;
            hrsLeftNext.innerHTML = hoursLeftCounter;
            hrsLeftNext.classList.add('hrs-left-dialer-next-animate');

            hoursRightCounter = 0;
            hrsRightNext.innerHTML = hoursRightCounter;
            hrsRightNext.classList.add('hrs-right-dialer-next-animate');

            amPMLeftCurrent.innerHTML = 'P'
            amPMLeftNext.classList.remove('amPM-left-dialer-next-animate');

            setTimeout(function (){
                amPMLeftNext.innerHTML = 'A';
                amPMLeftNext.classList.add('amPM-left-dialer-next-animate');
            }, 500);
            
        }
        // 19 : 59 : 59 => 20 : 00 : 00 case
        else if(hoursRightCounter > 8){
            hrsLeftNext.innerHTML = ++hoursLeftCounter;
            hrsLeftNext.classList.add('hrs-left-dialer-next-animate');

            hoursRightCounter = 0;
            hrsRightNext.innerHTML = hoursRightCounter;
            hrsRightNext.classList.add('hrs-right-dialer-next-animate');
        }
        // 10 : 59 : 59 => 11 : 00: 00 case
        else{
            hrsRightNext.innerHTML = ++hoursRightCounter;
            hrsRightNext.classList.add('hrs-right-dialer-next-animate');

            amPMLeftCurrent.innerHTML = 'A'
            amPMLeftNext.classList.remove('amPM-left-dialer-next-animate');

            if(hoursLeftCounter == 1 && hoursRightCounter == 2){
                amPMLeftNext.innerHTML = 'P';
                amPMLeftNext.classList.add('amPM-left-dialer-next-animate');

            }

        }

    }

    setTimeout(function(){

        hrsRightCurrent.innerHTML = hoursRightCounter;
        hrsRightNext.classList.remove('hrs-right-dialer-next-animate');

        hrsLeftCurrent.innerHTML = hoursLeftCounter;
        hrsLeftNext.classList.remove('hrs-left-dialer-next-animate');

    }, 500);

}


// Display Panel (for date-month-year)

var date = rtClock.getDate();
var month = rtClock.getMonth() + 1;
var year = rtClock.getFullYear();

var monthName = "", dayName = "";

if(month == 1){
    monthName = "January";
}
else if(month == 2){
    monthName = "February";
}
else if(month == 3){
    monthName = "March";
}
else if(month == 4){
    monthName = "April";
}
else if(month == 5){
    monthName = "May";
}
else if(month == 6){
    monthName = "June";
}
else if(month == 7){
    monthName = "July";
}
else if(month == 8){
    monthName = "August";
}
else if(month == 9){
    monthName = "September";
}
else if(month == 10){
    monthName = "October";
}
else if(month == 11){
    monthName = "November";
}
else{
    monthName = "December";
}

date = ("0" + date).slice(-2);
var tempDate = date.slice(-1);

if(tempDate == 1){
    displayInfo.innerHTML = `Date: ${date}st ${monthName}, ${year}`;
}
else if(tempDate == 2){
    displayInfo.innerHTML = `Date: ${date}nd ${monthName}, ${year}`;
}
else if(tempDate == 3){
    displayInfo.innerHTML = `Date: ${date}rd ${monthName}, ${year}`;
}
else{
    displayInfo.innerHTML = `Date: ${date}th ${monthName}, ${year}`;
}


// Set Alarm Functionality

let alarms = [];
const alarmsList = document.getElementById('list');

document.addEventListener('click', handleClickListener);

alarmsList.innerHTML = 'No Alarms';
alarmsList.style.textAlign = "center";
alarmsList.style.fontSize = "1.2rem";

// Handling click listeners
function handleClickListener(e){

    const target = e.target;

    // If set alarm button clicked
    if(target.id == 'set-alarm-button'){

        let hrsInput = document.getElementById('hours-input').value;
        let minsInput = document.getElementById('minutes-input').value;
        let secsInput = document.getElementById('seconds-input').value;
        let amPmInput = document.getElementById('drop-down').value;

        // Check whether all details are fields are filled or not
        if(!hrsInput || !minsInput || !secsInput || !amPmInput){

            showNotification('Please fill all the required fields');
            return;

        }

        // Invalid input cases
        if(hrsInput > 23){
            showNotification('Invalid Hour Input');
            return;
        }
        if(minsInput > 59){
            showNotification('Invalid Minutes Input');
            return;
        }
        if(secsInput > 59){
            showNotification('Invalid Seconds Input');
            return;
        }

        hrsInput = ("0" + hrsInput).slice(-2);
        minsInput = ("0" + minsInput).slice(-2);
        secsInput = ("0" + secsInput).slice(-2);
        
        const inputAlarmData = {
            hoursInput: hrsInput,
            minutesInput: minsInput,
            secondsInput: secsInput,
            ampm: amPmInput,
            id: Date.now(),
            completed: false
        }

        hrsInput.value = '';
        minsInput.value = '';
        secsInput.value = '';

        // Call add alarm function
        addAlarms(inputAlarmData);

    }

    // If delete alarm button clicked
    if(target.id == 'delete-alarm-button'){

        const alarmId = target.dataset.id;
        deleteAlarm(alarmId);
        return;

    }

    // If stop alarm button clicked
    if(target.id == 'stop-alarm'){

        // Alarm Stop Functionality
        stopAlarm(true);

    }

}

// Showing Notification as alert
function showNotification(text){

    if(text == 'Alarm cannot be added' || text == 'Please fill all the required fields'){
        dateContainer.classList.add('date-container-animate');
    }
    else if(text == 'Alarm Added'){
        dateContainer.classList.add('date-container-animate2');
    }
    else{
        dateContainer.classList.add('date-container-animate3');
    }

    displayInfo.innerHTML = text;

    setTimeout(function (){
        dateContainer.classList.remove('date-container-animate');
        dateContainer.classList.remove('date-container-animate2');
        dateContainer.classList.remove('date-container-animate3');
        
        if(tempDate == 1){
            displayInfo.innerHTML = `Date: ${date}st ${monthName}, ${year}`;
        }
        else if(tempDate == 2){
            displayInfo.innerHTML = `Date: ${date}nd ${monthName}, ${year}`;
        }
        else if(tempDate == 3){
            displayInfo.innerHTML = `Date: ${date}rd ${monthName}, ${year}`;
        }
        else{
            displayInfo.innerHTML = `Date: ${date}th ${monthName}, ${year}`;
        }

    }, 2000);

}


// Adding alarm 
function addAlarms(inputAlarmData){

    // Checking if same alarm already exist
    if(alarms.length != 0){

        for(let i = 0; i < alarms.length; i++){

            // check 1 (seconds)
            if(alarms[i].secondsInput == inputAlarmData.secondsInput){
                
                // check 2 (minutes)
                if(alarms[i].minutesInput == inputAlarmData.minutesInput){
    
                    // check 3 (hours)
                    if(alarms[i].hoursInput == inputAlarmData.hoursInput){
    
                        // check 4 (am / pm)
                        if(alarms[i].ampm == inputAlarmData.ampm){
    
                            showNotification('Alarm Already Exists');
                            return;
    
                        }
    
                    }
    
                }
    
            }
    
        }

    }

    if(inputAlarmData){

        alarms.push(inputAlarmData);
        renderList();
        showNotification('Alarm Added');
        return;

    }
    else{

        showNotification('Alarm cannot be added');

    }

}

// Rendering the alarms
function renderList(){

    alarmsList.innerHTML = '';

    for(let i = 0; i < alarms.length; i++){
        
        addTaskToDOM(alarms[i]);

    }

}

// Dsiplaying on DOM
function addTaskToDOM(alarm){

    const li = document.createElement('li');

    li.innerHTML = `
    <div id="alarm-list-left">
    
        <p><img src="./assets/images/clock-regular.svg"></p>                    
        <p><span>${alarm.hoursInput}:</span><span>${alarm.minutesInput}:</span><span>${alarm.secondsInput} </span><span>${alarm.ampm}</span></p>
    
    </div>

    <div id="alarm-list-right">
    
        <button id= "delete-alarm-button" data-id = "${alarm.id}">Delete</button>
    
    </div>
    `;

    alarmsList.append(li);

}

// Delete Alarm
function deleteAlarm(alarmId){

    const newAlarms = alarms.filter(function(alarm){
        return alarm.id !== Number(alarmId);
    });

    alarms = newAlarms;
    renderList();

    if(alarms.length == 0){
        alarmsList.innerHTML = 'No Alarms';
    }

}


// Check alarm time with real time clock
function alarmTimeCheck(tempSecondsCounter, secondsCounter, minutesLeftCounter, minutesRightCounter, hoursLeftCounter, hoursRightCounter, amPm){

    if(alarms.length == 0){
        return false;
    }

    for(let i = 0; i < alarms.length; i++){

        // check 1 (seconds)
        if(alarms[i].secondsInput == (`${tempSecondsCounter}${secondsCounter}`)){
            
            // check 2 (minutes)
            if(alarms[i].minutesInput == (`${minutesLeftCounter}${minutesRightCounter}`)){

                // check 3 (hours)
                if(alarms[i].hoursInput == (`${hoursLeftCounter}${hoursRightCounter}`)){

                    // check 4 (am / pm)
                    if(alarms[i].ampm == amPm){

                        return true;

                    }

                }

            }

        }

    }

    return false;

}

var response = false;

// Stop Alarm Check
function stopAlarm(result){

    response = result;

}


// Alarm goes on
function alarmOn(){

    var audio = document.getElementById('myAudio');

    audio.play();

    if(response){

        audio.pause();

        dateContainer.classList.remove('date-container-animate-alarm');
        
        if(tempDate == 1){
            displayInfo.innerHTML = `Date: ${date}st ${monthName}, ${year}`;
        }
        else if(tempDate == 2){
            displayInfo.innerHTML = `Date: ${date}nd ${monthName}, ${year}`;
        }
        else if(tempDate == 3){
            displayInfo.innerHTML = `Date: ${date}rd ${monthName}, ${year}`;
        }
        else{
            displayInfo.innerHTML = `Date: ${date}th ${monthName}, ${year}`;
        }

        response = false;
        clearInterval(interval);
        return;

    }

    dateContainer.classList.add('date-container-animate-alarm');

    displayInfo.innerHTML = "Alarm";

}