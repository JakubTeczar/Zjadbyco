function Element ({name,data,amount, unit,id}){
    return(
        <li>
            <div className="list__content" key={id}>
                <div className="list__content--text">{name}</div>
                <div className="list__content--data">{data}</div>
            </div>
            <div className="list__amount">{amount}{unit}</div>
        </li>
    );
};

export default Element;