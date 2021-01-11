$(()=>{
    var id = localStorage.getItem('password');
    fetch('http://localhost:5000/adoption',{
        method:'POST',
        headers:{
            'content-type': "application/json"
        },
        body:JSON.stringify({
            id : id
        })
    }).then(response => response.json())
    .then(data => display(data.response))
    
    function display(data){
        data.forEach(({CHILD_ID,CHILD_NAME,REG_ID}) => {
            $("#mytable").append(`<tr>
                <td>${CHILD_ID}</td>
                <td>${CHILD_NAME}</td>
                <td>${REG_ID}</td>
            </tr>`)
        });
    }
})