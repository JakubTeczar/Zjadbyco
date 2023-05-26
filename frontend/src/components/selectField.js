import React, { useState , useContext, useEffect, useRef} from "react";
import AuthContext from "../store/auth-context";

const Elements = ({nameRef , content , idTab ,calTab ,unitTab ,chosenFun,settingPool=false}) => {
  const [selectedElement, setSelectedElement] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [isActive, setIsActive] = useState(false);
  let ctx = useContext(AuthContext);
  if(ctx.name === "" && selectedElement !==""){
    setSelectedElement("");
  }
  let elementsName = [...content];
  
  const elements = elementsName.map((el,index)=>{return {name : el,id:idTab[index],calorie:calTab[index] ,unit: unitTab[index]}});

  async function deleteElement(id){
    const loaderDiv = document.querySelector(".loading-screen");
    loaderDiv.style.display = "block";

    let url = `http://localhost:8080/food/remove/${id}`; 
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
    });
   
    document.querySelector("#E"+id).style.display = "none";
    console.log("#E"+id);
    setSearchWord("");
    loaderDiv.style.display = "none";
}
  
  const addElement = (selectedElement) => {
    return elements.map((el) => (
      <li
        id={"E"+el.id}
        key={el.id}
        onClick={() =>{ if(!settingPool){ updateName(el.name,el.id,el.calorie,el.unit)}}}
        className={el.name === selectedElement ? "selected" : ""}
      >
        {el.name}
        {settingPool && <button className="delete-btn" onClick={()=>{
            deleteElement(el.id);}}> usuń </button>}
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
        element.name.toLowerCase().startsWith(searchWord.toLowerCase())
      )
      .map((el) => {
        return(
        <li
          key={el.id}
          id={"E"+el.id}
          onClick={() =>{ if(!settingPool){ updateName(el.name,el.id,el.calorie,el.unit)}}} className={el.name === selectedElement ? "selected" : ""}>
          {el.name}
          {settingPool && <button className="delete-btn" onClick={()=>deleteElement(el.id)}> usuń </button>}
        </li>
        )
    });
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





