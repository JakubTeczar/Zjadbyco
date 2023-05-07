import React, { useContext, useEffect } from 'react';
import LoadPoolSettings from './LoadPoolSettings';
import {NavLink, Outlet, useLoaderData, Await } from 'react-router-dom';
import { Suspense } from 'react';
import ElementInput from "../../components/loadYourPool";
import { useCookies } from 'react-cookie';
function Settings (){
    const elements = useLoaderData();
    const [cookies, setCookie] = useCookies(['ownDishName']);
    console.log(elements);
    useEffect(()=>{
        setCookie('ownDishName','',{ sameSite: 'none', secure: true });
    });
    return(
        <>
            <div className='settings-box box'>
                <div className='settings__rectangle'></div>
                <div className='settings__triangle--small'>
                <svg  width="178.511" height="156.747" viewBox="0 0 178.511 156.747">
                    <path id="Polygon_4" data-name="Polygon 4" d="M66.45,32.975a22,22,0,0,1,38.1,0l47.383,82.02A22,22,0,0,1,132.883,148H38.117a22,22,0,0,1-19.05-33.005Z" transform="translate(0 8.949) rotate(-3)" fill="#ecebe6"/>
                </svg>
                </div>
                <div className='settings__triangle--big'>
                    <svg  width="477.915" height="464.693" viewBox="0 0 477.915 464.693">
                    <path id="Polygon_3" data-name="Polygon 3" d="M162.951,32.969a22,22,0,0,1,38.1,0L344.93,281.994A22,22,0,0,1,325.881,315H38.119A22,22,0,0,1,19.07,281.994Z" transform="translate(176.146) rotate(34)" fill="#ecebe6"/>
                    </svg>
                </div>
                <div className='settings__circle'></div>
                <h1 className='settings-h1'>Twoja pula dań i produktów</h1>
                
                <LoadPoolSettings>
                    <Suspense fallback={<p style={{ textAlign: 'center' }}>Ładowanie...</p>}>
                        <Await resolve={elements}>
                            {(loadedElements) => <ElementInput elements={loadedElements} settingPool={true}/>}
                        </Await>
                    </Suspense>
                </LoadPoolSettings>
                <div className='settings-container'>
                    <h4 className='settings-h4'>Dzienne zapotrzebowanie <span></span> kaloryczne</h4>
                    <div className='settings__input-wrapper'>
                        <input className='settings__cal-input' defaultValue={2500} step={10} min={1000} type='number'></input>
                        <button className='settings__cal-btn' >Zmień</button>
                    </div>
                </div>
                <div className='settings__logout'>Wyloguj</div>
            </div>
        
        </>
    );
};

export default Settings;