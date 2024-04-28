const answers = {q1: 'true', q2: 'a', q3: 'false', q4: 'a', q5: 'b',q6: 'b'};

document.getElementById("quiz-form").addEventListener("submit", function (e) {
   e.preventDefault();
   var formData = new FormData(e.target);
   let correctAnswers=0;
   // ...or iterate through the name-value pairs
   for (var [question, answer] of Object.entries(answers)) {
    const currentListItem = document.getElementsByClassName(question)[0];
    if(formData.get(question)==answer){
       currentListItem.classList.add("text-success");
       correctAnswers++;
    }
    else{
       currentListItem.classList.add("text-danger");
    }
    const correctLabel = document.querySelector(`label[for="${question}-${answer}"]`);
    correctLabel.classList.add("text-success");
    currentListItem.classList.add("bg-light");
   }

   showResult(correctAnswers);
 });

 function showResult(score)
 {
   const resultDiv = document.getElementById("quiz-results-display");
   displayString=`<h3> You Scored:</h3><h1 class="text-success text-center p-2">${score}/6 </h1>`;
   displayString+=`<div class="text-center m-3"><input type="button" class="btn btn-success" value="Retake Quiz" onClick="window.location.reload()"></div>`;
   resultDiv.innerHTML=displayString;

 }