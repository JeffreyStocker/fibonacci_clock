////// adjustable Variables ////////////
var user_color_random = true;
///////////////////////////////////////

var fibSequence= [10,1,2,3,5]//important note, value of 0 is actually 1, used zero so would not conflict
var lastCalledMinute=-1

// /**
// * Randomize array element order in-place.
// * Using Durstenfeld shuffle algorithm.
// */
function shuffleArrayDurstenfel(array, inPlace=false) {
  //Durstenfeld shuffle
  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  if (inPlace===false){
    var nArray= array.slice(0);
  }
  else {nArray=array;}
  for (var i = nArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = nArray[i];
    nArray[i] = nArray[j];
    nArray[j] = temp;
  }
  return nArray;
  }



function adjustNumberSoZeroDoesNotConfictWithSum (value){
  return value===10 ? 1 : value;
}


function findHourColors () {
  var outputs=[];
  var sum=0;
  var hours = getTimeInHours();
  var useTheseNumbers;
  var continueLoop=false;
  minuteWhileLoop:
    while (continueLoop===false){
      outputs=[];
      sum=0;
      useTheseNumbers=shuffleArrayDurstenfel(fibSequence)
      for (let i=0; i<=4; i++){
        outputs.push(useTheseNumbers.pop())
        sum += adjustNumberSoZeroDoesNotConfictWithSum(outputs[outputs.length-1])
        if (sum===hours)            {break minuteWhileLoop;}
        else if (sum > hours)       {break;}
      }
    }
  console.log("Current hour: " + hours);
  console.log ('Fibonacci numbers for hour: ' + outputs)
  return outputs
}


function findMinColors () {
  var outputs=[];
  var sum=0;
  var minutes = getTimeInMin();
  if (minutes===0){
      return []
  }
  var useTheseNumbers
  var continueLoop=false
  minuteWhileLoop:
    while (continueLoop===false){
      outputs=[]
      sum=0
      useTheseNumbers=shuffleArrayDurstenfel(fibSequence)
      for (let i=0; i<=4; i++){
        outputs.push(useTheseNumbers.pop())
        sum += outputs[outputs.length-1]
        if (sum*5===minutes)            {break minuteWhileLoop;}
        else if (sum*5 > minutes)       {break;}
      }
    }
  console.log("Current minutes: " + minutes);
  console.log ('Fibonacci numbers for minutes: ' + outputs + " * 5")
  return outputs
}


function MixColors () {
  var hourArray=findHourColors ()
  var minArray=findMinColors ()
  var colorClock={10:'white', 1:'white', 2:'white', 3:'white', 5:'white'}
  hourArray.forEach((item)=>{
    colorClock[item]='red'
  })
  minArray.forEach((item)=> {
    if (colorClock[item]==='red'){
      colorClock[item]='blue'
    }
    else {
      colorClock[item]='green'
    }
  })
  console.log("Fibonacci Colors: " + JSON.stringify(colorClock))
  return colorClock
}


function returnSumOfArray (array){
  return array.reduce((sum, currentValue) =>{return sum+=currentValue})
}


function getRandomInt (lower, upper) {
  return Math.floor(Math.random()*(upper-lower+1)+lower)
}


function getTimeInMin(){
  var time= new Date()
  var minutes= time.getMinutes()
  minutes -= minutes % 5
  return minutes
}


function getTimeInHours(){
  var time= new Date()
  var hours= time.getHours()

  if (hours > 12) {
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }
  return hours
}

function updateHtmlClock (colorArray){
  try {
    keys=Object.keys(colorArray)
    keys.forEach( (key) => {
      document.getElementById('Value' + key).style = "background: " +  colorArray[key] + ';'
    })
  }
  catch (err){
    console.log('HTML updates failed')
  }
}

function main() {
  loopClockUpdates ()
  createEventHandlers()
}
function loopClockUpdates (){
  document.getElementById('reference').innerText = Date()
  if (getTimeInMin() === lastCalledMinute) {
    //null do nothing, saves a lot of processing power this way, 
    //after all only need to update every 5 minutes due to the way the clock works
    // console.log('skip')
  }
  else {
    lastCalledMinute=getTimeInMin()
    updateHtmlClock (MixColors ())
  }
  setTimeout(loopClockUpdates, 500); //loop every x milliseconds, use setTimeout so next one will not execute until funished https://stackoverflow.com/questions/7188145/call-a-javascript-function-every-5-seconds-continuously
}


function testingTHISelement(thisElement){
  console.log(thisElement)
  thisElement.innerText="yes";
}


function createEventHandlers(){
  //https://www.w3schools.com/js/js_htmldom_eventlistener.asp
  document.getElementById("showClock").addEventListener("mousedown", toggleClock); 
  document.getElementById("instructions").addEventListener("mousedown", function (){toggleElementVisiblity('footer')} ); 
  document.getElementById("blackoutBackground").addEventListener("mousedown", blackOutBackground); 
}


function toggleClock(){
  var currentElement=document.getElementById('reference')
  console.log(currentElement.style.display)
  if (currentElement.style.display =="none"){
    currentElement.style.display ="block"
  }
  else {
    currentElement.style.display ='none'
  }
}


function toggleElementVisiblity(element){
  var currentElement=document.getElementById(element)
  console.log(currentElement.style.display)
  if (currentElement.style.display =="none"){
    currentElement.style.display ="block"
  }
  else {
    currentElement.style.display ='none'
  }
}


function  blackOutBackground (){
  var currentElement=document.getElementById('body')
  var currentElementStyle=currentElement.style['background-color']

  console.log(currentElementStyle)
  if (currentElementStyle=='black'){
    currentElement.style ="background: white"
  }
  else if (currentElementStyle=='white'){
    currentElement.style ="background: silver"
  }
  else {
    currentElement.style ="background: black"
  }
}

main()

