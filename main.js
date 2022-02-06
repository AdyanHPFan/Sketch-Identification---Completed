
 
function setup(){
canvas = createCanvas(500, 370);
background("white");
canvas.mouseReleased(classifyCanvas);
synth = window.speechSynthesis;
}

function clearCanvas(){
    background("white");
}

function draw(){
    strokeWeight(3);  //Sets Stroke Weight To variable width of line
    stroke(0); //Sets Stroke Colour To Variable Color Of Line
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}

function classifyCanvas(){
 classifier.classify(canvas, gotResult);   
}

function gotResult(error, results){
 if (error) {
     console.error(error);
 }
 
 console.log(results);
 document.getElementById("label").innerHTML = "Label : " + results[0].label;
 document.getElementById("confidence").innerHTML = "Confidence : " + Math.round(results[0].confidence * 100) + "%";

 utterThis = new SpeechSynthesisUtterance(results[0].label);
 synth.speak(utterThis);

}