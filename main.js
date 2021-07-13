//img = "";
status = "";
objects = [];

function preload(){
    //img = loadImage("dog_cat.jpg");
    alert = loadSound("alert_2.mp3");
}

function setup(){
    canvas = createCanvas(350, 350);
    canvas.center();
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Searching For Baby";
    video = createCapture(VIDEO);
    video.size(350, 350);
    video.hide();
}

function draw(){
    image(video, 0, 0, 350, 350);
    // fill("#FF0000");
    // text("Dog", 100, 80);
    // noFill();
    // stroke("#FF0000");
    // rect(90, 60, 450, 380);

    // fill("#FF0000");
    // text("Cat", 310, 85);
    // noFill();
    // stroke("#FF0000");
    // rect(300, 65, 300, 380);

    if(status != ""){
        detector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++){
            r = random(255);
            g = random(255);
            b = random(255);

            document.getElementById("status").innerHTML = "Status: Objects Detected";

            if(objects[i].label = "person"){
                document.getElementById("found").innerHTML = "The Baby Is Found";
            } else{
                document.getElementById("found").innerHTML = "The Baby Is Not Found";
                alert.play();
            }
            fill(r, g, b);
            percent = (objects[i].confidence * 100).toFixed(0);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();

            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Model Loaded! ");
    status = true;

}

function gotResults(error, results){
    if (error){
        console.error(error);
    } else{
        console.log(results);
        objects = results;
    }
}