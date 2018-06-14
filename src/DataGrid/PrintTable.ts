
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

export default class PrintTable {
    private GridResult: any;
    private GridRequestColumns: any;
    private GridName: string;
    private FilteredRecordCount: number;
    constructor(gridResult: any, gridRequestColumns: any, gridName: string, filteredRecordCount: number) {
        this.GridResult = gridResult;
        this.GridRequestColumns = gridRequestColumns;
        this.GridName = gridName;
        this.FilteredRecordCount = filteredRecordCount;
    }

    public PrintDocument() {
        if (this.FilteredRecordCount === 0) { return; }

        const tableHtml = `<table class="table table-bordered table-striped"><thead><tr>${
            this.GridRequestColumns
                .filter((c: any) => c.Visible)
                .reduce((prev: any, el: any) => `${prev}<th>${el.Label || el.Name}</th>`, '')
            }</tr></thead><tbody>${
            this.GridResult.map((row: any) => {
                if (row instanceof Object) {
                    row = Object.keys(row).map((key: any) => row[key]);
                }
                return `<tr>${row.map((cell: any, index: number) => {
                    if (this.GridRequestColumns[index] && !this.GridRequestColumns[index].Visible) {
                        return '';
                    }
                    return `<td>${cellValue(this.GridRequestColumns[index].DataType, cell)}</td>`;
                }).join(' ')}</tr>`;
            }).join(' ')}</tbody></table>`;

        const documentToPrint = window.open('about:blank', 'Print', 'location=0,height=500,width=800');
        documentToPrint.document
            .write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
        documentToPrint.document.title = this.GridName;
        documentToPrint.document.write('<body onload="window.print();">');
        documentToPrint.document.write(`<h1>${this.GridName}</h1>`);
        documentToPrint.document.write(tableHtml);
        documentToPrint.document.write('</body>');
        documentToPrint.document.close();
    }
}
