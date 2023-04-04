function Element ({name,data,amount, unit,id}){
    console.log(id);
    return(
        <li key={id}>
            <div className="list__content" >
                <div className="list__content--text">{name}</div>
                <div className="list__content--data">{data}</div>
            </div>
            <div className="list__amount">{amount}{unit}</div>
        </li>
    );
};

export default Element;