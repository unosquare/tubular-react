import { getCsv, getHtml } from 'tubular-common';

function printDoc(gridResult: any, columns: any, gridName: string) {
    const tableHtml = getHtml(gridResult, columns);

    const documentToPrint = window.open('about:blank', 'Print', 'location=0,height=500,width=800');
    documentToPrint.document.write(
        '<link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap/latest/css/bootstrap.min.css" />',
    );
    documentToPrint.document.title = gridName;
    documentToPrint.document.write('<body onload="window.print();">');
    documentToPrint.document.write(`<h1>${gridName}</h1>`);
    documentToPrint.document.write(tableHtml);
    documentToPrint.document.write('</body>');
    documentToPrint.document.close();
}

function exportFile(gridResult: any, columns: any) {
    const csvFile = getCsv(gridResult, columns);

    const fileURL = URL.createObjectURL(
        new Blob([`\uFEFF${csvFile}`], {
            type: 'text/csv;charset=utf-8;',
        }),
    );

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
