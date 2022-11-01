import React from "react";
import { DataTables } from './../DataTables';

/**
 * PrintSearchResults
 * 
 * @param {String} value 
 * @returns {JXS}
 */
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
        { data: 'login', title: 'Login', type: "text", render: value => { return (<a target="_blank" href={`https://github.com/${value}`}>{value}</a>) } },
        { data: 'type', title: 'Type', type: "text" },
        { data: 'score', title: 'Score', type: "number" }
    ];

    return (
        <DataTables rows={fetchRows} columns={columns} />
    );
}

export { PrintSearchResults }