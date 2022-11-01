import React from 'react';

// Components
import { DataTables } from './DataTables';
import { BigInput } from './BigInput';

// Resources
import logo from './resources/imgs/github-logo.png';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import './resources/css/global.css';

function App() {
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

function PrintSearchResults({ value }) {
    var fetchRows = [];
    if (value !== "") {
        fetchRows = {
            'url': `https://api.github.com/search/users?q=${value}&per_page=10`,
            'options': { method: 'GET' },
            'render': (response) => {
                if (typeof response.items === "undefined") {
                    alert("You can not make more queries at the moment, wait a few seconds.");
                    return [];
                }

                return response.items;
            }
        };
    }

    var columns = [
        { data: 'id', title: 'ID', type: "text" },
        { data: 'avatar_url', title: 'Avatar', type: "image", render: (value) => { return <img alt='' src={value} width='32' height='32' /> } },
        { data: 'login', title: 'Login', type: "text", render: value => { return (<a href={`https://github.com/${value}`}>{value}</a>) } },
        { data: 'score', title: 'Score', type: "number" }
    ];

    return (
        <DataTables rows={fetchRows} columns={columns} />
    );
}


export default App;
