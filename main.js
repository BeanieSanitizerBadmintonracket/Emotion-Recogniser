Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_URI){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+ data_URI +'">';

    });
}

console.log('ml5 version', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelLoaded')
}

function Speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The First Prediction is "+ prediction1;
    speak_data_2 = "The Second Prediction is "+ prediction2;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis);

}

function check(){
    img = document.getElementById("capture_image");
    classifier.classify(img,gotResult);
}

function gotResult(error,result)
{
    if (error){
        console.error(error);
    }

    else {
        console.log(result);
            document.getElementById("result_emotion_name").innerHTML = result[0].label;
            document.getElementById("result_emotion_name2").innerHTML = result[1].label;
            prediction1 = result[0].label
            prediction2 = result[1].label
            Speak();

            if (prediction1=="happy")
            {
                document.getElementById("update_emoji").innerHTML = "&#128522;";
            }

            if (prediction1=="sad")
            {
                document.getElementById("update_emoji").innerHTML = "&#128532;";
            }

            if (prediction1=="angry")
            {
                document.getElementById("update_emoji").innerHTML = "&#128548;";
            }

            if (prediction2=="happy")
            {
                document.getElementById("update_emoji2").innerHTML = "&#128522;";
            }

            if (prediction2=="sad")
            {
                document.getElementById("update_emoji2").innerHTML = "&#128532;";
            }

            if (prediction2=="angry")
            {
                document.getElementById("update_emoji2").innerHTML = "&#128548;";
            }
    }
}