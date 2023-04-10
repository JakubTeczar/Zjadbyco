import React, { useState , useContext} from "react";
import AuthContext from "../store/auth-context";

const Elements = ({nameRef , content , idTab ,calTab ,unitTab ,chosenFun}) => {
  const [selectedElement, setSelectedElement] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [isActive, setIsActive] = useState(false);
  let ctx = useContext(AuthContext);
  if(ctx.name === "" && selectedElement !==""){
    setSelectedElement("");
  }

  let elements = [...new Set(content)];
  // console.log(idTab);
  
  const addElement = (selectedElement) => {
    return elements.map((element,index) => (
      <li
        key={idTab[index]}
        onClick={() => updateName(element,idTab[index],calTab[index],unitTab[index])}
        className={element === selectedElement ? "selected" : ""}
      >
        {element}
      </li>
   
    ));
  
  };

  const updateName = (selectedElement,id ,calorie,unit) => {
    setSearchWord("");
    setSelectedElement(selectedElement);
    ctx.changeName(selectedElement);
    ctx.changeValues(calorie,unit,1,id);
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
      .map((element) => (
        <li
          key={element}
          onClick={() => updateName(element)}
          className={element === selectedElement ? "selected" : ""}
        >
          {element}
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
        <span>{selectedElement ? selectedElement : "Wybierz element"}</span>
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





