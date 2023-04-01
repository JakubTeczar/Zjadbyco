import Element from "./ListElement";

function List ({elements}){
    return (
        <div className="list-container">
            <ul className="list">
            {elements.map((element) =>(
                <Element name={element.name} date={element.date} amount={element.quantity}></Element>
            ))}
            </ul>
        </div>
    );
};

export default List;