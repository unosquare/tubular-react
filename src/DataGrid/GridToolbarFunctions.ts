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
            return cell;
    }
};

const processRow = (row: any, visibleColumns: any) => {
    if (row instanceof Object) {
        row = Object.keys(row).map((key: any) => row[key]);
    }
    let finalVal = '';

    for (let i = 0; i < row.length; i++) {
        if (!visibleColumns[i]) { continue; }
        let innerValue = (row[i] === null || row[i] === undefined) ? '' :
            (typeof (row[i]) === 'boolean') ? (row[i] === true && 'Yes') :
                row[i].toString();

        if (moment(row[i], moment.ISO_8601, true).isValid()) {
            innerValue = moment(row[i]).format('MMMM Do YYYY, h:mm:ss a');
        }

        let result = innerValue.replace(/"/g, '""');

        if (result.search(/("|,|\n)/g) >= 0) {
            result = `"${result}"`;
        }

        if (i > 0) {
            finalVal += ',';
        }

        finalVal += result;

    }

    return `${finalVal}\n`;

};

function printDoc(gridResult: any, gridRequestColumns: any, gridName: string) {
        const tableHtml = `<table class="table table-bordered table-striped"><thead><tr>${
            gridRequestColumns
                .filter((c: any) => c.Visible)
                .reduce((prev: any, el: any) => `${prev}<th>${el.Label || el.Name}</th>`, '')
            }</tr></thead><tbody>${
            gridResult.map((row: any) => {
                if (row instanceof Object) {
                    row = Object.keys(row).map((key: any) => row[key]);
                }
                return `<tr>${row.map((cell: any, index: number) => {
                    if (gridRequestColumns[index] && !gridRequestColumns[index].Visible) {
                        return '';
                    }
                    return `<td>${cellValue(gridRequestColumns[index].DataType, cell)}</td>`;
                }).join(' ')}</tr>`;
            }).join(' ')}</tbody></table>`;

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

function exportFile(gridResult: any, gridRequestColumns: any) {
    const header = gridRequestColumns.map((x: any) => x.Label);
    const visibleColumns = gridRequestColumns.map((x: any) => x.Visible);

    let csvFile = '';
    if (header.length > 0) {
        csvFile += processRow(header, visibleColumns);
    }

    gridResult.forEach((row: any) => {
        csvFile += processRow(row, visibleColumns);
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
