import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    
    const [todoList, setTodoList] = useState([]);
    const [valorInput, setValorInput] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const getUserTasks = () => {
        fetch("https://playground.4geeks.com/todo/users/sofia")
        .then (resp => {
            console.log(resp);
            if (resp.ok === false) {
                creatUser()
            } else  return resp.json()})
        .then(data => {setTodoList(data.todos)})
        .catch(error => console.log(error))
    };

    const creatUser = () => {
        fetch("https://playground.4geeks.com/todo/users/sofia", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
        })
        .then(resp => resp.json())
        .then(data => getUserTasks())
        .catch(error => console.log(error))

    }
    useEffect(() => {
        getUserTasks();
    }, []
    );

    const createTask = (task) => {
        fetch("https://playground.4geeks.com/todo/todos/sofia", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                label: task,
                is_done: false
              })
        })
        .then(resp => resp.json())
        .then(data => getUserTasks())
        .catch(error => console.log(error))
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValorInput(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(valorInput);
        setValorInput("");
    };
    console.log(todoList);
    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    }

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleOnclick = (id) =>{
        fetch("https://playground.4geeks.com/todo/todos/"+id, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
        })
        .then(resp => resp.text())
        .then(data => getUserTasks())
        .catch(error => console.log(error))
        };

        const deleteAll = () => {
            fetch("https://playground.4geeks.com/todo/users/sofia", {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json"
                },
            })
            .then(resp => resp.text())
            .then(data => getUserTasks())
            .catch(error => console.log(error))
        }

    return (
    <div className="bg-light d-flex flex-column justify-content-start align-items-center min-vh-100">
        <h1 className="display-3 text-danger text-opacity-25">todos</h1>
        <div className="card bg-light rounded-0 shadow w-50">
            <div className="card-body text-justify">
                <form onSubmit={handleSubmit}>
                    <input className="lead border-0 m-2 p-2 w-75" type="text" placeholder="What needs to be done?" value={valorInput} onChange={handleChange}/>
                </form>
                <ul className="lead list-group list-group-flush list-unstyled">
                    {todoList.map((elemento, index) => (
                        <li className="d-flex justify-content-between m-1 list-group-item bg-light" key={index} onMouseEnter={() => handleMouseEnter(index)}onMouseLeave={handleMouseLeave}>
                            {elemento.label}
                            {hoveredIndex === index && (<span><button className="border-0 bg-light text-danger" onClick={()=>handleOnclick(elemento.id)}>x</button></span>)}
                        </li>
                    ))}
                </ul>
                {todoList.length > 0 && (
                    <p className="lead fs-6">{todoList.length} items left</p>
                )}
                {todoList.length === 0 &&(
                    <p className="lead fs-6">No hay tareas, añadir tareas.</p>
                )}
                <button onClick={deleteAll} >DELETE ALL</button>
            </div>
        </div>
    </div>
    );
};
export default Home;