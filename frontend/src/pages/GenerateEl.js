import React from 'react';
function Genereate () {
    return (
        <div className="generate-el__box box">
            <h1>Automatyczne generowanie posiłków</h1>
            <h2>Ile ma być kalior na dzień</h2>
            <input type="number"></input>
            <h2>Na dni do przodu zaplanować posiłki </h2>
            <input type="number"></input>
            <h2>Czy uwzgędnić tylko jedzenie z lodówki</h2>
            <input type="checkbox" className='generate-el__checkbox'></input>
            info jak nie to storzy sie automatycznie lista zakupów
            <button className="info-btn">? <span>Stworzy automatycznie co chcesz i nie tylko wiesz o co chodzi mordo</span></button>

        </div>
    );
}
export default Genereate;