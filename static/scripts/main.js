// Array of sentences for typing test
const sentences = [
  "seem few one number feel public all problem leave same their fact call able their this is what would school to go the town data because of program will not be working",
  "sphinx of black time be good to the person have new long on thing make great with it man go little at not world to see the world practice model taste is really good nature best",
  "The bright sun big and hot shines brilliantly in the expansive sky and people relish the warmth it provides it aids in the growth of plants making it a positive force in nature",
  "Rain descending gracefully from the clouds has the transformative ability to make everything it touches wet the soothing sound of rain is calming making it a welcome natural occurrence",
  "Majestic birds with wings that allow them to soar gracefully in the boundless sky exhibit various behaviors including enchanting songs birds symbols of freedom captivate my interest",
  "My vibrant life includes ownership of a sleek red car a fast and reliable mode of transportation that I skillfully navigate to my workplace the utility of cars in daily life is undeniable",
  "The vast sea with its rhythmic waves and expansive horizon beckons me to the sandy shores of the beach the softness of the sand and the salinity of the sea create a unique coastal experience",
  "Nature's marvel flowers exhibit captivating beauty with a plethora of colors attracting bees with their alluring fragrances the sensory experience of flowers is truly delightful",
  "In the tranquil morning hours I partake in the essential ritual of consuming breakfast often favoring cereal for its simple yet delightful taste recognizing the importance of breakfast fuels my day",
  "look high over his woman want different after they place give small her work use large she week find next or case tell early an point ask young will government work important my company",
]


let currentSentenceIndex = 0;
let startTime;
let endTime;
let timerInterval;
let typedCharacters = 0;
let correctCharacters = 0;

// Function to generate a random sentence for typing test
// It generates two random sentence from the arrays of the sentence
function generateSentence() {
  return sentences[Math.floor(Math.random()*sentences.length)];          
}

// // Function to display the sentence for typing test
function displaySentence() {
  const sentence = generateSentence();
  document.getElementById("sentenceToType").textContent = sentence;
 
}



// Function to start the typing test
function startTest() {
  // Only change the sentence if the input field is focused
  const inputField = document.getElementById("typed");
  if (!inputField.matches(":focus")) {
    displaySentence();
  }

  inputField.value = "";
  document.getElementById("typedText").textContent = "";

  let timerSeconds = 30;
  document.getElementById("timer").textContent = `Time: ${timerSeconds}s`;

  currentSentenceIndex = 0;
  typedCharacters = 0;
  correctCharacters = 0;
  startTime = null;
  endTime = null;

  const startTimer = () => {
    if (startTime === null) {
      startTime = new Date().getTime();
      endTime = startTime + 30000; // 30 seconds interval

      // Update timer and check end condition every second
      timerInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = Math.max(0, endTime - currentTime);
        const seconds = Math.ceil(remainingTime / 1000);
        document.getElementById("timer").textContent = `Time: ${seconds}s`;

        if (remainingTime <= 0) {
          clearInterval(timerInterval);
          endTest();
        }
      }, 1000);
    }
  };

  // Start the timer when the user starts typing
  inputField.addEventListener("input", startTimer);

  inputField.disabled = false;
  inputField.focus();
}



// Function to end the typing test
function endTest() {
  clearInterval(timerInterval);
  const wpm = calculateWPM();
  document.getElementById("wpm").textContent = "WPM: " + wpm;
 
  // document.getElementById("timer").textContent = "Time: " + seconds;
  document.getElementById("typed").disabled = true;
}

// Function to reset the typing test
function resetTest() {
  clearInterval(timerInterval);
  startTest();
  document.getElementById("wpm").textContent = "WPM: 0"; // Reset WPM
}

// Function to calculate WPM based on correct characters
function calculateWPM() {
  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - startTime) / 60000; 
  const wpm = Math.round((correctCharacters / 5) / elapsedTime);
  return wpm;
}

// Event listener for input event on the typed input field
document.getElementById("typed").addEventListener("input", function(event) {
  if (!startTime) {
      startTest();
    }
  
  typedCharacters = event.target.value.length;
  const sentenceToType = document.getElementById("sentenceToType").textContent;
  
  const typedChars = event.target.value.split("");
  const sentenceChars = sentenceToType.split("");
  const typedDiv = document.getElementById("typedText");



  // Dynamically adjust z-index to bring typedText ahead of sentenceToType
  typedDiv.style.zIndex = 2;
  typedDiv.textContent = "";



  correctCharacters = 0;

  for (let i = 0; i < sentenceChars.length; i++) {
    const span = document.createElement("span");
    if (typedChars[i]) {
      span.textContent = typedChars[i];
      if (typedChars[i] === sentenceChars[i]) {
        span.classList.add("correct");
        correctCharacters++;
      } else {
        span.classList.add("incorrect");
      }
    } else {
      span.textContent = " ";
    }
    typedDiv.appendChild(span);
  }




  if (typedCharacters === sentenceChars.length) {
    endTest();
  }
});



   
// Event listener for retry button click
document.getElementById("resetButton").addEventListener("click", resetTest);
