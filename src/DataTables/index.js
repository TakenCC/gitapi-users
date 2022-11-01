import React from 'react';
import './dataTables.css';

/**
 * Datatables
 * 
 * @author Taken <takencol@gmail.com>
 * @param {{label: string}[]} columns 
 * @param {{value: string}[]} data 
 * @returns {JSX}
 */

class DataTables extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: props.columns,
            rows: props.rows
        }

        this.fetch = false;
        if (props.rows.url) {
            this.fetch = props.rows;
            this.state.rows = [];
        }
    }

    /**
     * Request Data
     * Request the information from the url set in the rows variable.
     * 
     * @return {boolean}
     */
    requestData() {
        if (!this.fetch) return false;

        fetch(this.fetch.url, this.fetch.options)
            .then(response => response.json())
            .then(respuesta => {
                var rowsGen = respuesta;
                if (this.fetch.render) {
                    rowsGen = this.fetch.render(rowsGen);
                }

                this.setState({ columns: this.state.columns, rows: rowsGen });
            });

        return true;
    }

    componentDidMount() {
        this.requestData();
    }

    componentWillReceiveProps(nextProps) {
        this.fetch = false;
        if (nextProps.rows.url) {
            this.fetch = nextProps.rows;
            this.requestData();
        } else {
            this.setState({ columns: nextProps.columns, rows: nextProps.rows });
        }
    }

    /**
     * 
     */
    renderColumns() {
        var renderedColumns = [];
        this.state.columns.map(column => renderedColumns.push((<th className={`dt-column dt-column-type--${column.type}`}>{column.title}</th>)));
        return renderedColumns;
    }

    renderRows() {
        var renderedRows = [];
        this.state.rows.map((row) => {
            var print_cells = [];
            this.state.columns.map(column => {
                let renderType = column.type;
                let renderBlock = '';
                let additionalClass = '';
                let className = `dt-cell dt-cell-type--${column.type} ${additionalClass}`;
                if (column.render) {
                    let renderAction = typeof column.render;
                    if (renderAction === "function") {
                        renderBlock = <td className={className}>{column.render(row[column.data])}</td>;
                    } else {
                        renderBlock = <td className={className}>{column.render}</td>;
                    }
                } else {
                    if (renderType === "list") {
                        let info = Object.values(row[column.data]);
                        renderBlock = (<td className={className}>{info.join(", ")}</td>);
                    } else {
                        renderBlock = (<td className={className}>{row[column.data]}</td>);
                    }
                }

                return print_cells.push(renderBlock);
            });

            return renderedRows.push((<tr>{print_cells}</tr>));
        });

        return renderedRows;
    }

    render() {
        return (
            <div className='container-dt shadow-sm'>
                <table className='dt'>
                    <thead>
                        <tr>{this.renderColumns()}</tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                </table>
            </div>
        );
    }
}

export { DataTables }