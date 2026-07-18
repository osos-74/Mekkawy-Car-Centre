import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { QuotationPdfData, QuotationPdfLine } from "./interface";
import Quotation from "../model";
import Car from "../../car/model";
import Customer from "../../customer/model";

import { CompanyInfo } from "../../../common/pdf/CompanyInfo";
import { Colors } from "../../../common/pdf/Colors";
import { Layout } from "../../../common/pdf/Layout";
import { table } from "console";
import {Invoice} from "../interface"
import { BasePdfGenerator } from "../../../common/pdf/BasePdfGenerator";
import {PdfDocumentData} from "../../../common/pdf/interface"
export class InvoicePdfGenerator extends BasePdfGenerator {
  public generate(data: PdfDocumentData): PDFKit.PDFDocument {
    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
    });

    const outputPath = path.join(process.cwd(), "quotation.pdf");

    doc.pipe(fs.createWriteStream(outputPath));
    this.drawHeaderBackground(doc);

    this.drawHeader(doc, data.quotation);

    this.drawHeaderBorder(doc);
    this.drawDetailsSection(doc, data);

    var tableEndY = this.drawItemsTable(doc, data);

    tableEndY = this.drawTotals(doc, data.quotation, tableEndY + 20);
    tableEndY = this.drawNotes(doc, data.quotation.notes, tableEndY+20);
    this.drawSignatureSection(doc, tableEndY+20);

    doc.end();

    return doc;
  }

  private formatQuotationNumber(id: number): string {
    return `QT-${id.toString().padStart(6, "0")}`;
  }

  private drawHeader(doc: PDFKit.PDFDocument, quotation: Quotation): void {
    this.drawLogo(doc);

    this.drawCompanyInfo(doc);

    this.drawInvoiceInfo(doc, quotation);
  }
  
  

  private drawInvoiceInfo(
    doc: PDFKit.PDFDocument,
    invoice: Invoice,
  ): void {
    let y = Layout.quotation.y;

    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .text("QUOTATION", Layout.quotation.x, y);

    y += 28;

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(
        `No: ${this.formatQuotationNumber(invoice.invoiceId)}`,
        Layout.quotation.x,
        y,
      );

    y += 18;

    doc.text(
      `Date: ${invoice.createdAt?.toLocaleDateString()}`,
      Layout.quotation.x,
      y,
    );

    y += 18;

    doc.text(`Status: ${invoice.status}`, Layout.quotation.x, y);
  }

  private drawHeaderBorder(doc: PDFKit.PDFDocument): void {
    doc
      .lineWidth(1)
      .moveTo(Layout.header.left, Layout.header.bottom)
      .lineTo(Layout.header.right, Layout.header.bottom)
      .stroke();
  }

  private drawHeaderBackground(doc: PDFKit.PDFDocument): void {
    doc
      .save()
      .fillColor(Colors.headerBackground)
      .rect(
        Layout.header.left,
        Layout.header.top,
        Layout.header.right - Layout.header.left,
        Layout.header.bottom - Layout.header.top,
      )
      .fill()
      .restore();
  }

 

  private drawDetailsSection(
    doc: PDFKit.PDFDocument,
    data: QuotationPdfData,
  ): void {
    this.drawSectionBox(
      doc,
      "Customer Information",
      Layout.details.customerX,
      Layout.details.y,
      Layout.details.sectionWidth,
      Layout.details.sectionHeight,
    );

    this.drawSectionBox(
      doc,
      "Vehicle Information",
      Layout.details.vehicleX,
      Layout.details.y,
      Layout.details.sectionWidth,
      Layout.details.sectionHeight,
    );
    this.drawCustomerInfo(doc, data.customer);

    this.drawVehicleInfo(doc, data.car);
  }

  private drawCustomerInfo(doc: PDFKit.PDFDocument, customer: Customer): void {
    const x = Layout.details.customerX + 10;
    let y = Layout.details.y + 35;

    this.drawLabelValue(doc, "Name", customer.name, x, y);

    y += 18;

    this.drawLabelValue(doc, "Phone", customer.phoneNumber, x, y);

    y += 18;

    this.drawLabelValue(doc, "Address", customer.address, x, y);
  }

  private drawVehicleInfo(doc: PDFKit.PDFDocument, car: Car): void {
    const x = Layout.details.vehicleX + 10;
    let y = Layout.details.y + 35;

    this.drawLabelValue(doc, "Make", car.make, x, y);

    y += 18;

    this.drawLabelValue(doc, "Model", car.model, x, y);

    y += 18;

    this.drawLabelValue(doc, "Year", String(car.year), x, y);

    y += 18;

    this.drawLabelValue(doc, "Plate", car.plateNumber, x, y);
  }
 
  private drawItemsTable(
    doc: PDFKit.PDFDocument,
    data: PdfDocumentData,
  ): number {
    const tableHeight = this.calculateTableHeight(data.lines.length);
    // Outer border
    doc
      .lineWidth(1)
      .strokeColor(Colors.border)
      .rect(
        Layout.table.x,
        Layout.table.y,
        Layout.table.width,
        tableHeight, // temporary table height
      )
      .stroke();

    // Header background
    doc
      .fillColor(Colors.tableHeaderBackground)
      .rect(
        Layout.table.x,
        Layout.table.y,
        Layout.table.width,
        Layout.table.headerHeight,
      )
      .fill();

    let currentX = Layout.table.x;

    doc.font("Helvetica-Bold").fontSize(10).fillColor(Colors.text);

    for (const column of Layout.table.columns) {
      doc.text(column.title, currentX + 5, Layout.table.y + 7, {
        width: column.width - 10,
        align: "center",
      });

      currentX += column.width;

      if (currentX < Layout.table.x + Layout.table.width) {
        doc
          .moveTo(currentX, Layout.table.y)
          .lineTo(
            currentX,
            Layout.table.y + tableHeight, // temporary table height
          )
          .stroke();
      }
    }
    // Bottom border of the header
    doc
      .strokeColor(Colors.border)
      .moveTo(Layout.table.x, Layout.table.y + Layout.table.headerHeight)
      .lineTo(
        Layout.table.x + Layout.table.width,
        Layout.table.y + Layout.table.headerHeight,
      )
      .stroke();

    this.drawTableRows(doc, data);
    return Layout.table.y + tableHeight;
  }
  private calculateTableHeight(rowCount: number): number {
    return Layout.table.headerHeight + rowCount * Layout.table.rowHeight;
  }
  private drawTableRows(doc: PDFKit.PDFDocument, data: QuotationPdfData): void {
    let y = Layout.table.y + Layout.table.headerHeight;

    data.quotationLines.forEach((line, index) => {
      this.drawTableRow(doc, line, index, y);

      y += Layout.table.rowHeight;
    });
  }
  private drawTableRow(
    doc: PDFKit.PDFDocument,
    line: QuotationPdfLine,
    index: number,
    y: number,
  ): void {
    if (index % 2 === 1) {
      doc
        .fillColor("#F8F8F8")
        .rect(Layout.table.x, y, Layout.table.width, Layout.table.rowHeight)
        .fill();
    }
    const values = [
      String(index + 1),
      line.type,
      line.description,
      String(line.quantity),
      super.formatMoney(line.unitPrice),
      super.formatMoney(line.discount),
      super.formatMoney(line.lineTotal),
    ];
    let currentX = Layout.table.x;

    doc.font("Helvetica").fontSize(10).fillColor(Colors.text);

    Layout.table.columns.forEach((column, i) => {
      doc.text(values[i], currentX + 5, y + 6, {
        width: column.width - 10,
        align: "center",
      });

      currentX += column.width;
    });
  }

 
  private drawTotals(
    doc: PDFKit.PDFDocument,
    quotation: Quotation,
    y: number,
  ): number {
    const x = Layout.totals.x;

    doc.fontSize(10).fillColor(Colors.text);

    this.drawLabelValue(
      doc,
      "Subtotal",
      this.formatMoney(quotation.subtotal),
      x,
      y,
    );

    y += Layout.totals.lineHeight;

    this.drawLabelValue(
      doc,
      "Discount",
      this.formatMoney(quotation.discount),
      x,
      y,
    );

    y += Layout.totals.lineHeight + 5;

    doc
      .moveTo(x, y)
      .lineTo(x + Layout.totals.width, y)
      .stroke();

    y += 10;

    doc.font("Helvetica-Bold").fontSize(12);

    this.drawLabelValue(doc, "TOTAL", this.formatMoney(quotation.total), x, y);
    return doc.y;
  }
  private drawNotes(
    doc: PDFKit.PDFDocument,
    notes: string | null,
    y: number,
  ): number {
    doc.font("Helvetica-Bold").fontSize(11).text("Notes", Layout.notes.x, y);

    y += 20;

    doc
      .font("Helvetica")
      .fontSize(10)
      .text(notes ?? "No additional notes.", Layout.notes.x, y, {
        width: Layout.notes.width,
      });

    return doc.y;
  }
  private drawSignatureSection(doc: PDFKit.PDFDocument, y: number): void {
    doc
      .moveTo(Layout.signature.leftX, y)
      .lineTo(Layout.signature.leftX + Layout.signature.width, y)
      .stroke();

    doc.text("Customer Signature", Layout.signature.leftX, y + 5, {
      width: Layout.signature.width,
      align: "center",
    });

    doc
      .moveTo(Layout.signature.rightX, y)
      .lineTo(Layout.signature.rightX + Layout.signature.width, y)
      .stroke();

    doc.text("Authorized Signature", Layout.signature.rightX, y + 5, {
      width: Layout.signature.width,
      align: "center",
    });
  }
}
