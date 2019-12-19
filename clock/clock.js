
var hours, minutes, seconds;
var alertsObj = {};
var reset;


function init(){
    hours = document.querySelector(".hours");
    minutes = document.querySelector(".minutes");
    seconds = document.querySelector(".seconds");
    reset = document.getElementById("reset");
    reset.addEventListener("click", deleteAlerts);

    tick();
}

function changeBackground(image) {
    document.body.style.backgroundImage = image;
 }

function tick() {
      // Current time
      var now = new Date();
      var hr = now.getHours();
      var min = now.getMinutes();
      var sec = now.getSeconds();
  
      // Update current clock
      hours.innerHTML = addZero(hr);
      minutes.innerHTML = addZero(min);
      seconds.innerHTML = addZero(sec);
      currentTime =  hours.innerHTML + ":" + minutes.innerHTML;
      
      //change background only once in a relevant minute
      for (var i in alertsObj) {
        if (alertsObj[i] == currentTime && seconds.innerHTML==0) {
            if (i === 'Wakeup Time'){
                changeBackground("url('https://i.pinimg.com/originals/db/12/17/db1217f0cb08c9be02c8e4a09f87de3e.jpg')");
            }
            if (i === 'Lunch Time'){
                changeBackground("url('https://c.pxhere.com/photos/09/53/beverages_brunch_cocktail_cuba_libre_delicious_diner_dinner_dip-912090.jpg!d')");
            }
            if (i === 'Sleep Time'){
                changeBackground("url('https://st2.depositphotos.com/3114403/10326/v/450/depositphotos_103264214-stock-illustration-illustration-of-wish-good-night.jpg')");
            }
        }
      }

      setTimeout(tick,1000);
    }

    function addZero(num) {
          if (num < 10) { 
              num = "0" + num; 
            }
          else { 
              num = num.toString(); 
            }
          return num;
    }

    function getInputValue(){
        // Selecting the input element and get its value 
        var selectedHr = document.getElementById("hrTime").value;
        var selectedMin = document.getElementById("minTime").value;
        
        var alarmTime = addZero(selectedHr) + ":" + addZero(selectedMin);
        var selectedAction = document.querySelector(".actionOptions").value;
        alertsObj[selectedAction] = alarmTime;

        //adding alert message to page
        var element = document.querySelector(".userSelected");
        element.innerHTML = printObj(alertsObj);

        reset.disabled = false;
      
    }
    
    // returning obj content as string to print obj
    function printObj(alertsObj) { 
        var string = ''; 
        for(var prop in alertsObj) { 
            if(typeof alertsObj[prop] == 'string') { 
                string+= prop + ': ' + alertsObj[prop]+'; </br>'; 
            } 
            else { 
                string+= prop + ': { </br>' + print(alertsObj[prop]) + '}'; 
            } 
        } 
        return string; 
    } 

    // deleting alerts after clicking on reset
    function deleteAlerts(){
        console.log("delete alerts finction is called");
        for (var member in alertsObj){
            delete alertsObj[member];
        }
        document.querySelector(".userSelected").innerHTML = "";
        reset.disabled = true;
        document.body.style.backgroundImage = "";
    }


    window.onload=init;