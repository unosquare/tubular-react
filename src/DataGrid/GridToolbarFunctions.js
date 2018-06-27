"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_fns_1 = require("date-fns");
var Column_1 = require("./Models/Column");
var cellValue = function (cellDataType, cell) {
    switch (cellDataType) {
        case Column_1.ColumnDataType.DATE:
            return date_fns_1.format(cell, 'MMMM Do YYYY') || '';
        case Column_1.ColumnDataType.DATE_TIME:
        case Column_1.ColumnDataType.DATE_TIME_UTC:
            return date_fns_1.format(cell, 'MMMM Do YYYY, h:mm:ss a') || '';
        case Column_1.ColumnDataType.BOOLEAN:
            return (cell === true ? 'Yes' : 'No');
        default:
            return (cell || '').toString();
    }
};
var objToArray = function (row) {
    return row instanceof Object
        ? Object.keys(row).map(function (key) { return row[key]; })
        : row;
};
var processRow = function (row, columns, ignoreType) {
    var finalVal = objToArray(row).reduce(function (prev, value, i) {
        if (!columns[i].Visible) {
            return;
        }
        var result = cellValue(ignoreType ? Column_1.ColumnDataType.STRING : columns[i].DataType, value)
            .replace(/"/g, '""');
        if (result.search(/("|,|\n)/g) >= 0) {
            result = "\"" + result + "\"";
        }
        return "" + prev + (i > 0 ? ',' : '') + result;
    }, '');
    return finalVal + "\n";
};
function printDoc(gridResult, columns, gridName) {
    var tableHtml = "<table class=\"table table-bordered table-striped\"><thead><tr>" + columns
        .filter(function (c) { return c.Visible; })
        .reduce(function (prev, el) { return prev + "<th>" + (el.Label || el.Name) + "</th>"; }, '') + "</tr></thead><tbody>" + gridResult.reduce(function (prevRow, row) {
        return prevRow + "<tr>" + objToArray(row).reduce(function (prev, cell, index) {
            return !columns[index].Visible ? prev : prev + "<td>" + cellValue(columns[index].DataType, cell) + "</td>";
        }, '') + "</tr>";
    }, '') + "</tbody></table>";
    var documentToPrint = window.open('about:blank', 'Print', 'location=0,height=500,width=800');
    documentToPrint.document
        .write('<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />');
    documentToPrint.document.title = gridName;
    documentToPrint.document.write('<body onload="window.print();">');
    documentToPrint.document.write("<h1>" + gridName + "</h1>");
    documentToPrint.document.write(tableHtml);
    documentToPrint.document.write('</body>');
    documentToPrint.document.close();
}
function exportFile(gridResult, columns) {
    var csvFile = gridResult.reduce(function (prev, row) { return prev + processRow(row, columns, false); }, processRow(columns.map(function (x) { return x.Label; }), columns, true));
    var fileURL = URL.createObjectURL(new Blob(["\uFEFF" + csvFile], {
        type: 'text/csv;charset=utf-8;'
    }));
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', fileURL);
    downloadLink.setAttribute('id', 'download');
    downloadLink.setAttribute('download', 'data.csv');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(fileURL);
}
exports.exportGrid = function (format, gridResult, columns, gridName) {
    if (format === 'csv')
        exportFile(gridResult, columns);
    else
        printDoc(gridResult, columns, gridName);
};
//# sourceMappingURL=GridToolbarFunctions.js.map