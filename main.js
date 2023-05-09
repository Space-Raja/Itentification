video="";
snapshot="";
resultObtaned="";
content="";
width=screen.width;
mobileSnap=0;
dataHold=0;
var SpeeRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeeRecognition();

Webcam.set({
    width:350,
    height:350,
    img_format:"jpg",
    jpg_quality:90
    });

    cameraVariable = document.getElementById("camera");

    Webcam.attach(cameraVariable);

    synth = window.speechSynthesis;
    textspeech= new SpeechSynthesisUtterance("Please wait for few seconds");
synth.speak(textspeech);

    function take_snapshot(){
        Webcam.snap(function(data_uri){
         /* if(width<992){
mobileSnap = data_uri;
snaps = document.getElementById("snaps");
snaps.style.display = 'none';
dataHold = '<img id="snapshot" src="'+data_uri+'"/>';

          }
          else{*

          }*/
          document.getElementById("camera").innerHTML='<img id="snapshot" src="'+data_uri+'"/>';
        })
        
    }



    function setup(){
     
 console.log("ml5 = ", ml5.version);
        model1 = ml5.imageClassifier('MobileNet',modelLoaded);
        
;
    }
    
  
function modelLoaded(){
    console.log("Model loaded!!!!!!!!!!!");
    textspeech= new SpeechSynthesisUtterance("Please speak");
    console.log("Model Loaded!!! After");
    synth.speak(textspeech);
    recognition.start();
    console.log("started");
}

recognition.onresult= function(event){
    console.log("recognition completing.")
    take_snapshot();
content = event.results[0][0].transcript;

console.log(content);
if(content == "what is this"){

    video = document.getElementById("snapshot");
 
    model1.classify(video, gotResult);
    
}
else{
textspeech= new SpeechSynthesisUtterance("We heard: "+content+" from you. Please speak 'what is this' whenever you are ready");
synth.speak(textspeech);
modelLoaded();
}

}

function gotResult(error, results){
if(error){
console.error(error);
}
else{
    console.log(results);
    document.getElementById("res").innerHTML="Result: "
    input =results[0].label;
         words = input.split(",");
         const  searchTerm = results[0].label;
         console.log("input done.");
         if(width<992){
          const    url = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`;
          fetch(url)
          .then(response => response.json())
          .then (data => {
            textspeech= new SpeechSynthesisUtterance(`<h2>${data.title}</h2><p>${data.extract}</p>`);
          
            synth.speak(textspeech);
          });
         }
   else{
    const    url = `https://en.wikipedia.org/api/rest_v1/page/summary/${searchTerm}`;
    fetch(url)
      .then(response => response.json())
      .then (data => {
         summaryDiv = document.getElementById("sumary");

        
        summaryDiv.innerHTML = `<h2>${data.title}</h2><p>${data.extract}</p>`;
        console.log("input done.");
sumry=document.getElementById("sumary").value;

textspeech= new SpeechSynthesisUtterance(`<h2>${data.title}</h2><p>${data.extract}</p>`);
console.log(sumry);
synth.speak(textspeech);
      })
.catch(error => {
  console.error(error);
  summaryDiv = document.getElementById("summary");
  summaryDiv.innerHTML = "An error occurred while fetching the summary.";
});
      


   }

   // modelLoaded();
    
}
}


  /*function searchGoogle(){
    var searchTerm = resultObtaned[0].label;
    var searchUrl = "https://www.google.com/search?q=" + encodeURIComponent(searchTerm);
    window.open(searchUrl, "_blank");
   
}*/

/*       if (words.length > 1) {
          document.getElementById("result").value = words[0];
           document.getElementById("result").value
        }
        */
       // document.getElementById("result").innerHTML = words[0];
       // textspeech= new SpeechSynthesisUtterance("The result is "+document.getElementById("result").value);
      //  synth.speak(textspeech);
      //  resultObtaned=results;
        // document.getElementById("anchor").innerHTML="Click me for more information"
        // link = document.getElementById("anchor");
        //link.href = "https://en.wikipedia.org/wiki/"+results[0].label;
         //  recognition.start();
  //modelLoaded();