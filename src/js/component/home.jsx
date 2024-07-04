import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';

//create your first component
const Home = () => {

const [todoList, setTodoList] = useState(["HACER LA CAMA", "HACER LA LOZA", "SACAR A LOS PERROS"])
const [valorinput, setValorInput] = useState("")
const [hoveredIndex, setHoveredIndex] = useState(null)

const handleChange = (e) => {
	const newValue = e.target.value;
	setValorInput(newValue);
}

const handleSubmit = (e) => {
	e.preventDefault();
	const newTodolist =[...todoList, valorinput] 
	setTodoList(newTodolist)
	setValorInput("")
}

const handleOnClick = (index) => {
    const eliminarElemento = [...todoList]
	eliminarElemento.splice(index, 1)
	setTodoList(eliminarElemento)
}

const handleMouseEnter = (index) => {
setHoveredIndex(index)
}

const handleMouseLeave = () => {
	setHoveredIndex(null)
}

return (
    <div className="bg-light d-flex flex-column justify-content-start align-items-center min-vh-100">
        <h1 className="display-3 text-danger text-opacity-25">todos</h1>
        <div className="card bg-light rounded-0 shadow w-50">
            <div className="card-body text-justify">
                <form onSubmit={handleSubmit}>
                    <input className="lead border-0 m-2 p-2 w-75" type="text" placeholder="What needs to be done?" value={valorinput} onChange={handleChange}/>
                </form>
                <ul className="lead list-group list-group-flush list-unstyled">
                    {todoList.map((todo, index) => (
                        <li className="d-flex justify-content-between m-1 list-group-item bg-light" key={index} onMouseEnter={() => handleMouseEnter(index)}onMouseLeave={handleMouseLeave}>
                            {todo}
                            {hoveredIndex === index && (<span><button onClick={()=>handleOnClick(index)} >X</button></span>) }</li>
                    ))}
                </ul>
                {todoList.length > 0 && (
                    <p className="lead fs-6">{todoList.length} items left</p>
                )}
                {todoList.length === 0 &&(
                    <p className="lead fs-6">No hay tareas, añadir tareas.</p>
                )}
            </div>
        </div>
    </div>
    );
};
export default Home;

