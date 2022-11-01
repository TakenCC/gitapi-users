import React from 'react';
import logo from './../resources/imgs/github-logo.png';

import { BigInput } from './../BigInput';
import { PrintSearchResults } from './PrintSearchResults';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


function App() {
    // Search Event
    const [value, setValue] = React.useState("TakenCC");

    return (
        <div className="App">
            <header className="App-header mt-5">
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <img src={logo} className="App-logo" alt="logo" width='420' />
                        </div>
                    </div>
                    <div className="row">
                        <div className='col'>
                            <BigInput placeholder={"Type any github username"} icon={'magnifying-glass'} inputHook={setValue}/>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container text-center">
                <div className="row">
                    <div className="col">
                        <div className='mt-5'></div>
                        <PrintSearchResults value={value} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { App };
