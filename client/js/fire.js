$(()=>{
  const firebaseConfig = {
    apiKey: "AIzaSyD4ycuAkAB4hPIE4yg4F1RL-KPKXcbjGhQ",
    authDomain: "dbd-project-3a517.firebaseapp.com",
    databaseURL: "https://dbd-project-3a517-default-rtdb.firebaseio.com",
    projectId: "dbd-project-3a517",
    storageBucket: "dbd-project-3a517.appspot.com",
    messagingSenderId: "439328211131",
    appId: "1:439328211131:web:f7f469318faaace6dee99e",
    measurementId: "G-2ST8CZJMXT"
  }
  firebase.initializeApp(firebaseConfig)

  var uploader = document.getElementById('uploader');
  var fileButton = document.getElementById('fileButton');
  var Url = "";
  var id = localStorage.getItem('password');

  fileButton.addEventListener('change',function(e){
    //Get file
    var file = e.target.files[0];
    //Create a storage ref
    var storageRef = firebase.storage().ref('photos/'+file.name);

    //Upload file
    var task = storageRef.put(file);
    //Update progress bar
    task.on('state_changed',
        function progress(snapshot){
            var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        },
        function error(err){

        },
        /*function complete(){

        },*/
        async() => {
            Url = await storageRef.getDownloadURL();
            console.log(Url);
            fetch("http://localhost:5000/uploadimage",{
              method:'POST',
              headers:{
                'content-type': "application/json"
              },
              body:JSON.stringify({
                pwd: id,
                url: Url
              })
              }).then(response => response.json())
              .then(data => uploaded(data.response))

            function uploaded(data){
              console.log(data);
              if(data){
                window.location.href = "./login.html";
                //console.log("Successful");
              }
              // else{
              //   window.location.href = "./firebasetest.html"
              // }
            }
        }
    );
    
  });

})