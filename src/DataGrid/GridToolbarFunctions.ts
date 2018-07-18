import { format } from 'date-fns';
import { ColumnDataType } from 'tubular-common';

const cellValue = (cellDataType: string, cell: any) => {
    switch (cellDataType) {
        case ColumnDataType.DATE:
            return format(cell, 'MMMM Do YYYY') || '';
        case ColumnDataType.DATE_TIME:
        case ColumnDataType.DATE_TIME_UTC:
            return format(cell, 'MMMM Do YYYY, h:mm:ss a') || '';
        case ColumnDataType.BOOLEAN:
            return (cell === true ? 'Yes' : 'No');
        default:
            return (cell || '').toString();
    }
};

const objToArray = (row: any) => {
    return row instanceof Object
        ? Object.keys(row).map((key: any) => row[key])
        : row;
};

const processRow = (row: any, columns: any[], ignoreType: boolean) => {
    const finalVal = objToArray(row).reduce((prev: any, value: any, i: any) => {
        if (!columns[i].Visible) { return; }

        let result = cellValue(ignoreType ? ColumnDataType.STRING : columns[i].DataType, value)
            .replace(/"/g, '""');

        if (result.search(/("|,|\n)/g) >= 0) {
            result = `"${result}"`;
        }

        return `${prev}${i > 0 ? ',' : ''}${result}`;
    }, '');

    return `${finalVal}\n`;
};

function printDoc(gridResult: any, columns: any, gridName: string) {
    const tableHtml = `<table class="table table-bordered table-striped"><thead><tr>${
        columns
            .filter((c: any) => c.Visible)
            .reduce((prev: any, el: any) => `${prev}<th>${el.Label || el.Name}</th>`, '')
        }</tr></thead><tbody>${
        gridResult.reduce((prevRow: string, row: any) =>
            `${prevRow}<tr>${objToArray(row).reduce((prev: string, cell: any, index: number) =>
                !columns[index].Visible ? prev : `${prev}<td>${cellValue(columns[index].DataType, cell)}</td>`,
                '')}</tr>`
            , '')}</tbody></table>`;

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
    const csvFile = gridResult.reduce(
        (prev: string, row: any) => prev + processRow(row, columns, false),
        processRow(columns.map((x: any) => x.Label), columns, true));

    const fileURL = URL.createObjectURL(new Blob([`\uFEFF${csvFile}`], {
        type: 'text/csv;charset=utf-8;'
    }));

    const downloadLink = document.createElement('a');

    downloadLink.setAttribute('href', fileURL);
    downloadLink.setAttribute('id', 'download');
    downloadLink.setAttribute('download', 'data.csv');
    document.body.appendChild(downloadLink);

    downloadLink.click();
    URL.revokeObjectURL(fileURL);
}

export const exportGrid = (media: string, gridResult: any, columns: any, gridName: string) => {
    if (media === 'csv') {
        exportFile(gridResult, columns);
    } else {
        printDoc(gridResult, columns, gridName);
    }
};
