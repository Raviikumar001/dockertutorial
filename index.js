import express, { query } from 'express';

const app = express();

app.use(express.json());

const TodoArray = [
    { id: 1, name: "study mathematics", completed: true },
    { id: 2, name: "study science", completed: true },
    { id: 3, name: "study english", completed: false },
    { id: 4, name: "study hindi", completed: true },
    ]; 


app.get("/todo", (req, res)=>{

    res.json({
        todo: TodoArray,
    });
})

app.get("/todo/:id", (req, res)=>{
    console.log(req.params, "ravi");
    let {id} = req.params;
    let todo;
    for(let i =0; i<TodoArray.length; i++)
    {
        if(id == TodoArray[i].id)
        {
            todo= TodoArray[i];
            break;
        }

    }
    if(todo === undefined)
    {
        res.status(404).json({ message: 'No todo was found with this id'});
    }

    res.json(
       { todo}
    )
})


app.post("/todo", (req,res)=>{
let {name, completed} = req.body;

if(name === undefined)
{
   res.status(401).json({ message: "name is required"});
}

let id = TodoArray.at(-1) + 1;

let todo ={ id,name,completed};

TodoArray.push(todo);

res.json(todo);
})
app.listen(3000);