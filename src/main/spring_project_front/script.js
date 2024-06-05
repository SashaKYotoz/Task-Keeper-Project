const urlTodos = "http://localhost:8080/todos";
let taskList;

$("#addTaskForm").on("submit",(e)=>{
    e.preventDefault();
    let taskText = e.target["task"].value;
    if(taskText != " "){
        const data = {
            task : taskText
        }
        axios.post(urlTodos,data).then(response =>{
            $("span").removeClass(`d-none`);
            $("span").fadeIn(1000);
            $("span").text(`Task ${response.data.task} was added`);
            $("span").addClass(`text-success`);
            $("span").removeClass(`text-danger`);
            setTimeout(()=>{
                $("span").fadeOut(1000);
            },3000);
            e.target.reset();
            sendRequest(urlTodos,"", "get")
        }).catch(error =>{
            $("span").removeClass(`d-none`);
            $("span").fadeIn(1000);
            $("span").text(`${error}`);
            $("span").addClass(`text-danger`);
            $("span").removeClass(`text-success`);
            setTimeout(()=>{
                $("span").fadeOut(1000);
            },3000);
        })
    }else{
        alert("Write task name");
    }
})
sendRequest(urlTodos,"", "get")

function sendRequest(url,data,method){
    if(method == "get"){
        axios.get(url,data).then(response =>{
            taskList = response.data;
            taskList.sort((t1,t2)=>{
                if(t1.complete && !t2.complete)
                    return -1;
                else if(!t1.complete && t2.complete)
                    return 1;
                else{
                    return 0;
                }
            });
            render();
    })
    }else if(method == "delete"){
        axios.delete(url).then(()=>{
            console.log(response.data);
            sendRequest(urlTodos,"","get");
        }).catch(error=>{
            console.log(error);
        })
    }else if(method == "put"){
        axios.put(url,data).then(()=>{
            
        }).catch(error=>{
            console.log(error);
        })
    }

}
function render(){
    $("tbody").empty();
    for (const item of taskList) {
        let type = "";
        if(item.complete) type = "checked";
        $("tbody").append(`
            <tr>
                <td>${item.task}</td>
                <td>${item.date}</td>
                <td><input class="form-check-input" type="checkbox" name="complete" id="${item.id}" ${type}></td>
                <td><a href="edit-task.html?id=${item.id}" class="btn btn-warning"><i class="bi bi-pencil-square"></i></a>
                <td><button type="button" class="btn btn-danger" id="del-${item.id}"><i class="bi bi-trash-fill"></i></button>
            </tr>
        `)
    }
    let check = $("input[name='complete']");
    Array.from(check).forEach(isCheck=>{
        isCheck.addEventListener("change",updateComplete);
    });
    let buttons = $(".btn-danger");
    Array.from(buttons).forEach(btn=>{
        btn.addEventListener("click",deleteTask);
    })
}
function updateComplete(){
    let id = $(this)[0].id;
    let checked = $(this)[0].checked;
    let urlCompl = urlTodos + "/" + id;
    let data = {
        complete : checked
    }  
    sendRequest(urlCompl,data,"put");
}

function deleteTask(){
    let id = $(this)[0].id.split("-")[1];
    let urlDel = urlTodos + "/" + id;
    sendRequest(urlDel,"","delete");
}

let radios = $("input[type= 'radio']");
Array.from(radios).forEach(rd=>{
    rd.addEventListener("change",filterByComplete);
})

function filterByComplete(){
    let value = $(this).val();
    sendRequest(urlTodos + value,"","get");
}