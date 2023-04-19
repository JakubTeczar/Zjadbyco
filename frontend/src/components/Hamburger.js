function Hamburdeg ({display, displayFun}){
    return(
        <div className={display ? "hamburger-active hamburger" : "hamburger"} onClick={()=>displayFun()}>
            <li></li>
            <li></li>
            <li></li>
        </div>
    );
}
export default Hamburdeg;