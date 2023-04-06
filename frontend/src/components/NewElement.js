function NewElement ({text,pickFunction , index , pickClass}){
    return(
        <div key={index} onClick={()=>pickFunction(index)} className={`choose-el__box--element ${pickClass}`} >{text}</div>
    );
};

export default NewElement;