import Element from "./ListElement";

function List (){
    return (
        <div className="list-container">
            <ul className="list">
              <Element></Element>
              <Element></Element>
            </ul>
        </div>
    );
};

export default List;