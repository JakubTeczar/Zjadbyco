import Element from "./ListElement";

function List ({elements }){
    console.log(elements);
    return (
        <div className="list-container">
            <ul className="list">
            {elements.map((element) =>(
                <>
                <Element name={element.name} date={element.date} amount={element.amount}></Element>
                </>
            ))}
            </ul>
        </div>
    );
};

export default List;