$(()=>{
    $('#register-form').on('submit',function(event){
        event.preventDefault();
        console.log('submit');

        console.log(event.target.name.value);
        fetch("http://localhost:5000/register",{
            method:'POST',
            headers:{
                'content-type':"application/json"
            },
            body:JSON.stringify({
                _id: parseInt(event.target.password.value),
                name: event.target.name.value,
                age: parseInt(event.target.age.value),
                gender: event.target.gender.value,
                "blood-group": event.target.bgroup.value,
                "marital-status": parseInt(event.target.mstatus.value),
                job: event.target.job.value,
                income: parseInt(event.target.income.value),
                address: event.target.address.value,
                aadharno: parseInt(event.target.aid.value),
                voterid: parseInt(event.target.vid.value)
            })
        }).then(response=>response.json())
        .then(data => inserted(data.response))
        function inserted(data){
            if(data){
                window.location.href = "./login.html";
            }
            else{
                window.location.href = "./register.html";
            }
        }
    })
})