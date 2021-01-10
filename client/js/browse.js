$(()=>{
    fetch("http://localhost:5000/organisation")
    .then(response => response.json())
    .then(data => display(data.response))

    function display(data){
        console.log(data);
        data.forEach(({REGID,ADDRESS,PHONE_NUMBER,NAME}) => {
            $('#profiles').append(`<div class="col-lg-3 col-md-4 col-xs-6">
                <div name = "regid"><h3>${REGID}</h3></div>
                <div name = "name"><h3>${NAME}</h3></div>
                <div name = "address"><h3>${ADDRESS}</h3></div>
                <div name = "phno"><h3>${PHONE_NUMBER}</h3></div>
                <button id="hi-${REGID}" type='button'>View</button>
            </div>`);

            $(`#hi-${REGID}`).on('click',function(){
                console.log('work-'+REGID)
                localStorage.setItem('regid',REGID)
                window.location.replace('./children.html');
            });
        });
        
    }
    
})