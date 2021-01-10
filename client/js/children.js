$(()=>{
    var regid = localStorage.getItem('regid');
    var orgname = localStorage.getItem('orgname');
    fetch("http://localhost:5000/child",{
        method:'POST',
        headers:{
            'content-type':"application/json"
        },
        body:JSON.stringify({
            rid: regid
        })
    })
    .then(response => response.json())
    .then(data => display(data.response))

    function display(data){
        data.forEach(({CHILD_ID, NAME, DOB, AGE, GENDER, WEIGHT, HEIGHT, BLOOD_GROUP, REG_ID}) => {
            $("#mytable").append(`<tr>
                <td>${CHILD_ID}</td>
                <td>${NAME}</td>
                <td>${DOB}</td>
                <td>${AGE}</td>
                <td>${GENDER}</td>
                <td>${WEIGHT}</td>
                <td>${HEIGHT}</td>           
                <td>${BLOOD_GROUP}</td>
                <td>${REG_ID}</td>
                <td><button id = "request-${CHILD_ID}" type = "submit">Select</button></td>

            </tr>`)
            $(`#request-${CHILD_ID}`).on('click',function(){
                console.log(`work-`+CHILD_ID);
                localStorage.setItem('childid',CHILD_ID);
                fetch("http://localhost:5000/add-appointment",{
                    method:'POST',
                    headers:{
                        'content-type':"application/json"
                    },
                    body:JSON.stringify({
                        cid: CHILD_ID,
                        rid: regid,
                        oname: orgname,
                    })
                })
                .then(response => response.json())
                .then(data => hello(data.response));
                function hello(data){
                    console.log("hi");
                }
            })

        });
    }
})