import React, { useState } from "react";

const Elements = ({nameRef , content }) => {
  const [selectedElement, setSelectedElement] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [isActive, setIsActive] = useState(false);


  let elements = [...new Set(content)];
  // console.log(date , elements);

  const addElement = (selectedElement) => {
    return elements.map((element) => (
      <li
        key={element}
        onClick={() => updateName(element)}
        className={element === selectedElement ? "selected" : ""}
      >
        {element}
      </li>
   
    ));
  
  };

  const updateName = (selectedElement) => {
    setSearchWord("");
    setSelectedElement(selectedElement);
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





