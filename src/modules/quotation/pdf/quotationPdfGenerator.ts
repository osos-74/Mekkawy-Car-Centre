import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export class QuotationPdfGenerator {

    public generate(): PDFKit.PDFDocument {

        const doc = new PDFDocument({
            size: "A4",
            margin: 40,
        });

        const outputPath = path.join(process.cwd(), "quotation.pdf");

        doc.pipe(fs.createWriteStream(outputPath));

        this.drawHeader(doc);

        doc.end();

        return doc;
    }

    private drawHeader(doc: PDFKit.PDFDocument): void {

        const logoPath = path.join(process.cwd(), "src", "assets", "logo.png");

        if (fs.existsSync(logoPath)) {
            doc.image(logoPath, 40, 40, {
                width: 70,
                height: 70,
            });
        }

        doc
            .font("Helvetica-Bold")
            .fontSize(22)
            .text("MEKKAWY CAR CENTRE", 130, 45);

        doc
            .font("Helvetica")
            .fontSize(12)
            .text("Quotation", 130, 75);
    }

}