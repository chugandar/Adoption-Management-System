//import * as faceapi from 'face-api.js';
const video = document.getElementById('videoInput');
var id = localStorage.getItem('password');


Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models') //heavier/accurate version of tiny face detector
]).then(start)

fetch("http://localhost:5000/getimgdetails",{
    method:'POST',
    headers:{
        'content-type': "application/json"
    },
    body:JSON.stringify({
        pwd: id
    })
}).then(response => response.json())
.then(data => details(data.response))
var arr = []
function details(data){
    data.forEach(element => {
        arr[0]=element.name;
        console.log(element.name+" "+element.url);
        arr[1]=element.url;
    })
}
console.log(arr[0]+" "+arr[1]);

function start() {
    document.body.append('Models Loaded')
    
    navigator.getUserMedia(
        { video:{} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
    
    //video.src = '../videos/speech.mp4'
    console.log('video added')
    recognizeFaces()
}

async function recognizeFaces() {

    const labeledDescriptors = await loadLabeledImages()
    console.log(labeledDescriptors)
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)


    video.addEventListener('play', async () => {
        console.log('Playing')
        const canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)

        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)

        

        setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()

            const resizedDetections = faceapi.resizeResults(detections, displaySize)

            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)

            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            results.forEach( (result, i) => {
                const box = resizedDetections[i].detection.box
                console.log(result.toString()+" Hi")
                var hello = result.toString().split(" ");
                var splits = hello[1].split("");
                var strno = "";
                splits.forEach(element=>{
                    if(!(element ==="(" || element === ")")){
                        strno+=element;
                    }
                })
                var number = parseFloat(strno);
                if(result.toString().split(" ")[0] === arr[0] && number <= 0.53){
                    window.location.href = "./appointments.html";
                }
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            })
        }, 100)


        
    })
}


function loadLabeledImages() {

    const labels = [arr[0]] // for WebCam
    return Promise.all(
        labels.map(async (label)=>{
            const descriptions = []
            for(let i=1; i<=1; i++) {
                const img = await faceapi.fetchImage(arr[1])
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                console.log(label + i + JSON.stringify(detections))
                console.log(label);

                descriptions.push(detections.descriptor)
            }
            document.body.append(label+' Faces Loaded | ')
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}