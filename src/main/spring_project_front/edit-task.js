let urlParams = new URLSearchParams(window.location.search);
let taskId = urlParams.get("id");
const urlTodos = "http://localhost:8080/todos/" + taskId;
axios.get(urlTodos).then(response=>{
    let data = response.data;
    $("#title").val(data.task);
    $("#complete")[0].checked = data.complete;
}).catch(error=>{
    console.log(error);
})

$("#updateTaskForm").on("submit",e=>{
    e.preventDefault();
    let data = {
        task: e.target["task"].value,
        complete: e.target["complete"].checked
    }
    axios.put(urlTodos,data).then(response=>{
        window.open("index.html","_self");
    }).catch(error=>{
        console.log(error);
    })
})