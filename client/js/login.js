$(()=>{
    $('#login-form').on('submit', function (event) {
		event.preventDefault();
		console.log('submit');

		console.log(event.target.Username.value);
		console.log(event.target.Password.value);
		var username = event.target.Username.value;
		var password = parseInt(event.target.Password.value);
        localStorage.setItem('password',password);
        fetch("http://localhost:5000/getlogin",{
            method:'POST',
            headers:{
                'content-type': "application/json"
            },
            body:JSON.stringify({
                uid: username,
                pwd: password
            })
        }).then(response=>response.json())
        .then(data => checklogin(data.response));
        function checklogin(data){
            console.log(data);
            console.log(data.length);
            if(data.length){
                window.location.href = "./appointments.html";
            }
        }
    })
})