import React, { useState , useContext} from "react";
import AuthContext from "../store/auth-context";

const Elements = ({nameRef , content , idTab ,calTab ,unitTab ,chosenFun,settingPool=false }) => {
  const [selectedElement, setSelectedElement] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [isActive, setIsActive] = useState(false);
  let ctx = useContext(AuthContext);
  if(ctx.name === "" && selectedElement !==""){
    setSelectedElement("");
  }
  // let elements = [...content];
  const [elements , setElements] = useState([...content]);
  // let elements = [...content];
  async function deleteElement(id , index){
    let url = `http://localhost:8080/food/remove/${id}`; 
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
    });
    //czy można zrobić tak że zostanie wysłane polecenie
    //które usunie z bazy danych dany element bez przeładowywania strony ? oooo
    const newList =[...elements];
    console.log(idTab.splice(index, 1));
    console.log(newList.splice(index, 1));
    // newList.splice(index, 1);
    console.log(newList ,newList[index] );
    idTab.splice(index, 1);
    setElements(newList);
    setSearchWord("");
}

  console.log(content);
  
  const addElement = (selectedElement) => {
    return elements.map((element,index) => (
      <li
        key={idTab[index]}
        onClick={() =>{ if(!settingPool){ updateName(element,idTab[index],calTab[index],unitTab[index])}}}
        className={element === selectedElement ? "selected" : ""}
      >
        {element}
        {settingPool && <button className="delete-btn" onClick={()=>deleteElement(idTab[index],index)}> usuń </button>}
      </li>
   
    ));
  
  };

  const updateName = (selectedElement,id ,calorie,unit) => {
    setSearchWord("");
    setSelectedElement(selectedElement);
    ctx.changeName(selectedElement);
    ctx.changeValues(calorie,unit,unit !== "szt" ? 100 : 1,id);
    console.log(ctx.calories,unit,);  

    if(chosenFun){
      chosenFun([selectedElement,id ,calorie,unit]);
    }
    setIsActive(false);
  };

  const filterElements = (searchWord) => {
    return elements
      .filter((element) =>
        element.toLowerCase().startsWith(searchWord.toLowerCase())
      )
      .map((element, index) => (
        <li
          key={idTab[index]}
          onClick={() =>{ if(!settingPool){ updateName(element,idTab[index],calTab[index],unitTab[index])}}} className={element === selectedElement ? "selected" : ""}>
          {element}
          {settingPool && <button className="delete-btn" onClick={()=>deleteElement(idTab[index],index)}> usuń </button>}
        </li>
      ));
  };

  const handleInputChange = (e) => {
    // console.log(e);
    setSearchWord(e.target.value);
  };

  const handleToggleActive = () => {
    setIsActive(!isActive);
    console.log(isActive);
  };

  return (
    <div className="addElement__form--wrapper">
      <div className="select-btn" onClick={handleToggleActive}>
        <input name="name"  type="text" style={{display:"none"}} defaultValue={selectedElement ? selectedElement : ""} ref={nameRef}></input>
        {!settingPool && <span>{selectedElement ? selectedElement : "Wybierz element"}</span>}
        {settingPool && <span>{selectedElement ? selectedElement : "Sprawdź"}</span>}
        <i className="uil uil-angle-down"></i>
      </div>
      <div className='content' style={{ display: isActive ? "block" : "none" }}>
            <div className="search">
                <i className="uil uil-search"></i>
                <input
                    spellCheck="false" 
                    type="text"
                    placeholder="Wyszukaj..."
                    value={searchWord}
                    onChange={handleInputChange}
                />
            </div>
            <ul className="options">
            {searchWord
                ? filterElements(searchWord)
                : addElement(selectedElement)}
            </ul>
        </div>
      </div>
  );
};

export default Elements;





