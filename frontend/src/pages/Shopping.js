import {useParams} from "react-router-dom";
import DatePanel from "../components/DateNavigation";
function Shopping (){
    const params = useParams();
    console.log(params.data);
    return(
        <div className="box">
           <DatePanel date={params.data} localization={"shopping"} ></DatePanel>
        </div>
    );
};

export default Shopping;