
import { Form, Link, NavLink } from "react-router-dom";
import Date from "../components/DateNavigation";

function AddElement () {
    return(
        <>
            <div className="date-margin"></div>
            <Date></Date>

            <div className="addElement__info">
                <div className="addElement__info--text">
                    Co juz jest zaplanowane
                    <button className="addElement__info--text-btn">rozwiń</button>
                </div>
                <div className="addElement__info--calories">2300/3400 kcal</div>
            </div>

            <div className="addElement__box box">
                <div className="addElement__switch">  {/*wywal ta klase activee i pozniej w css zmien na acticve*/}
                  <NavLink className="addElement__switch--btn activee" >Produkty</NavLink>   
                <NavLink className="addElement__switch--btn"> Dania </NavLink>
                </div>
                <Form className="addElement__form" method="POST">
                    <h2>Nowe Danie</h2>
                    <input className="addElement__form--name" name="name"></input>
                    <select id="kolor" name="kolor">
                        <option value="czerwony">Czerwony</option>
                        <option value="niebieski">Niebieski</option>
                        <option value="zielony">Zielony</option>
                        <option value="żółty">Żółty</option>
                    </select>
                    <div className="addElement__form--bottom-panel">
                        <li>
                            <h4>Ilosc</h4>
                            <input className="addElement__form--amount" type="number" name="amount"></input>
                        </li>
                        <li>
                            <h4>Kalorycznosc</h4>
                            <input className="addElement__form--calories" name="calories"></input>
                        </li>
                    </div>
                    <button className="addElement__form--btn" type="submit">Dodaj</button>
                    <Link className="addElement__backLink backLink" to="/calendar">Wróć</Link>
                </Form>
            </div>
        </>
    );
};

export default AddElement;

export async function action({ request, params }) {
    const data = await request.formData();
  
    const eventData = {
        name: data.get('name'),
        amount: data.get('amount'),
        calories: data.get('calories'),
    };
  
    let url = 'http://localhost:8080/calendar/addElement';
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
  
    // if (response.status === 422) {
    //   return response;
    // }
    console.log(JSON.stringify(eventData));
    console.log(response.json());
    return null;
    // if (!response.ok) {
    //   throw json({ message: 'Could not save event.' }, { status: 500 });
    // }
  
  }
  
  