$(() => {
    fetch("http://localhost:5000/appointments")
    .then(response => response.json())
    .then(data => hello(data.response));
    
    /**
     * 
     * @param {any[]} data 
     */
    function hello(data){
        // const res = data.flatMap(element=>{
        //     return element.announcements
        // })

        $("#mytable tr").remove(); 
        // const res = data
        //     .map(element=>element.announcements)
        //     .filter(e=>e!==undefined).forEach(ele=>{
        //         //for each child
        //         ele.childid.forEach(e=>{
        //             $('#mytable').append(`<tr>
        //                 <td>${e}</td>
        //                 <td>${ele.orgid}</td>
        //                 <td>${ele.orgname}</td>
        //             </tr>`)
        //         })
                
        //     });
        console.log(data);
        const res = data.map(element => element.announcements)
        res[0].forEach(element => {
            $("#mytable").append(`<tr>
                <td>${element.childid}</td>
                <td>${element.orgid}</td>
                <td>${element.organame}</td>
                <td>${element.status}</td>
            </tr>`)
        });

         console.log(res);

    }

})