import Element from "./ListElement";

function List ({elements }){
    console.log(elements);
    return (
        <div className="list-container">
            <ul className="list">
            {elements.map((element) =>(
                <>
                <Element name={element.name} date={element.date} amount={element.quantity} unit={element.unit} id={element.id}></Element>
                </>
            ))}
            </ul>
        </div>
    );
};

export default List;