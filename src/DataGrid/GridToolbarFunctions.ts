import * as moment from 'moment';
import { ColumnDataType } from './Models/Column';

const cellValue = (cellDataType: string, cell: any) => {
    switch (cellDataType) {
        case ColumnDataType.DATE:
            return moment(cell).format('MMMM Do YYYY') || '';
        case ColumnDataType.DATE_TIME:
        case ColumnDataType.DATE_TIME_UTC:
            return moment(cell).format('MMMM Do YYYY, h:mm:ss a') || '';
        case ColumnDataType.BOOLEAN:
            return (cell === true ? 'Yes' : 'No');
        default:
            return cell || '';
    }
};

const objToArray = (row: any) => {
    if (row instanceof Object) {
        row = Object.keys(row).map((key: any) => row[key]);
    }

    return row;
}

const processRow = (row: any, columns: any[]) => {
    let finalVal = objToArray(row).reduce((prev, value, i) => {
        if (!columns[i].Visible) return;
        
        let result = cellValue(columns[i].DataType, value)
            .replace(/"/g, '""');

        if (result.search(/("|,|\n)/g) >= 0) {
            result = `"${result}"`;
        }

        if (i > 0) {
            prev += ',';
        }

        prev += result;
    }, '');

    return `${finalVal}\n`;
};

function printDoc(gridResult: any, columns: any, gridName: string) {
        const tableHtml = `<table class="table table-bordered table-striped"><thead><tr>${
            columns
                .filter((c: any) => c.Visible)
                .reduce((prev: any, el: any) => `${prev}<th>${el.Label || el.Name}</th>`, '')
            }</tr></thead><tbody>${
            gridResult.map((row: any) => 
                `<tr>${objToArray(row).map((cell: any, index: number) => 
                    !columns[index].Visible ? '' : `<td>${cellValue(columns[index].DataType, cell)}</td>`
                ).join(' ')}</tr>`)
            .join(' ')}</tbody></table>`;

        const documentToPrint = window.open('about:blank', 'Print', 'location=0,height=500,width=800');
        documentToPrint.document
            .write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
        documentToPrint.document.title = gridName;
        documentToPrint.document.write('<body onload="window.print();">');
        documentToPrint.document.write(`<h1>${gridName}</h1>`);
        documentToPrint.document.write(tableHtml);
        documentToPrint.document.write('</body>');
        documentToPrint.document.close();
}

function exportFile(gridResult: any, columns: any) {
    const header = columns.map((x: any) => x.Label);

    let csvFile = '';
    if (header.length > 0) {
        csvFile += processRow(header, columns);
    }

    gridResult.forEach((row: any) => {
        csvFile += processRow(row, columns);
    });

    const blob = new Blob([`\uFEFF${csvFile}`], {
        type: 'text/csv;charset=utf-8;'
    });
    const fileURL = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');

    downloadLink.setAttribute('href', fileURL);
    downloadLink.setAttribute('id', 'download');
    downloadLink.setAttribute('download', 'data.csv');
    document.body.appendChild(downloadLink);

    downloadLink.click();
    URL.revokeObjectURL(fileURL);
}

export = { printDocument: printDoc, exportCSV: exportFile };
