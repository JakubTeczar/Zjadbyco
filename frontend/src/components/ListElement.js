function Element ({name,data,amount}){
    return(
        <li>
            <div className="list__content">
                <div className="list__content--text">{name}</div>
                <div className="list__content--data">{data}</div>
            </div>
            <div className="list__amount">{amount}</div>
        </li>
    );
};

export default Element;