const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

run().catch(err => console.log(err));

async function run() {
    const SourceDir = "./public";
    const inFileName = "test";
    const inFileExt = ".pdf";
    const inFile = SourceDir + "/" + inFileName + inFileExt;
    const incomingPdf = await PDFDocument.load(fs.readFileSync(inFile));

    // Create a new document
    const newDoc = await PDFDocument.create();

    // Add individual content pages
    const contentPages = await newDoc.copyPages(incomingPdf, incomingPdf.getPageIndices());
    for (const page of contentPages) {
        newDoc.addPage(page);
    }

    // Write the PDF to a file
    fs.writeFileSync(`./public/${inFileName}-filtered.pdf`, await newDoc.save());
}
