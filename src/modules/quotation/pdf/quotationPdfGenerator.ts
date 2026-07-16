import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { QuotationPdfData, QuotationPdfLine } from "./interface";
import Quotation from "../model";
import Car from "../../car/model";
import Customer from "../../customer/model";
import { Colors } from "./color";

import { Layout } from "./layout";

export class QuotationPdfGenerator {
  public generate(data: QuotationPdfData): PDFKit.PDFDocument {
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

    const tableEndY = this.drawItemsTable(doc, data);

    this.drawTotals(doc, data.quotation, tableEndY + 20);

    doc.end();

    return doc;
  }

  private formatQuotationNumber(id: number): string {
    return `QT-${id.toString().padStart(6, "0")}`;
  }

  private drawHeader(doc: PDFKit.PDFDocument, quotation: Quotation): void {
    this.drawLogo(doc);

    this.drawCompanyInfo(doc);

    this.drawQuotationInfo(doc, quotation);
  }
  private drawLogo(doc: PDFKit.PDFDocument): void {
    const logoPath = path.join(process.cwd(), "src", "assets", "logo.png");

    if (!fs.existsSync(logoPath)) {
      return;
    }

    doc.image(logoPath, Layout.logo.x, Layout.logo.y, {
      width: Layout.logo.width,
      height: Layout.logo.height,
    });
  }
  private drawCompanyInfo(doc: PDFKit.PDFDocument): void {
    let y = Layout.company.y;

    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text("MEKKAWY CAR CENTRE", Layout.company.x, y);

    y += 28;

    doc
      .font("Helvetica")
      .fontSize(12)
      .text("Car Maintenance & Repair", Layout.company.x, y);

    y += 20;

    doc.fontSize(10).text("New Cairo, Egypt", Layout.company.x, y);

    y += 15;

    doc.text("Phone: +20 XXX XXX XXXX", Layout.company.x, y);
  }

  private drawQuotationInfo(
    doc: PDFKit.PDFDocument,
    quotation: Quotation,
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
        `No: ${this.formatQuotationNumber(quotation.quotationId)}`,
        Layout.quotation.x,
        y,
      );

    y += 18;

    doc.text(
      `Date: ${quotation.createdAt?.toLocaleDateString()}`,
      Layout.quotation.x,
      y,
    );

    y += 18;

    doc.text(`Status: ${quotation.status}`, Layout.quotation.x, y);
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

  private drawSectionBox(
    doc: PDFKit.PDFDocument,
    title: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    // Border
    doc
      .lineWidth(1)
      .strokeColor(Colors.border)
      .rect(x, y, width, height)
      .stroke();

    // Title background
    doc.fillColor(Colors.tableHeaderBackground).rect(x, y, width, 25).fill();

    // Title
    doc
      .fillColor(Colors.text)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text(title, x + 10, y + 7);
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
  private drawLabelValue(
    doc: PDFKit.PDFDocument,
    label: string,
    value: string,
    x: number,
    y: number,
  ): void {
    doc.font("Helvetica-Bold").fontSize(10).text(`${label}:`, x, y, {
      width: 60,
    });

    doc.font("Helvetica").text(value, x + 65, y);
  }
  private drawItemsTable(
    doc: PDFKit.PDFDocument,
    data: QuotationPdfData,
  ): number {
    const tableHeight = this.calculateTableHeight(data.quotationLines.length);
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
      this.formatMoney(line.unitPrice),
      this.formatMoney(line.discount),
      this.formatMoney(line.lineTotal),
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

  private formatMoney(value: number): string {
    return value.toFixed(2);
  }
  private drawTotals(
    doc: PDFKit.PDFDocument,
    quotation: Quotation,
    y: number,
  ): void {
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
  }
}
