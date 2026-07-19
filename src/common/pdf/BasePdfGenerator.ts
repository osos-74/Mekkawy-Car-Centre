import PDFDocument from "pdfkit";
import { Colors } from "./Colors";
import fs from "fs";
import path from "path";
import { Layout } from "./Layout";
import { CompanyInfo } from "./CompanyInfo";

export abstract class BasePdfGenerator {
  protected formatMoney(value: number | string): string {
    return Number(value).toFixed(2);
  }

  protected drawLabelValue(
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

  protected drawSectionBox(
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

  protected drawLogo(doc: PDFKit.PDFDocument): void {
    const logoPath = path.join(process.cwd(), "src", "assets", "logo.png");

    if (!fs.existsSync(logoPath)) {
      return;
    }

    doc.image(logoPath, Layout.logo.x, Layout.logo.y, {
      width: Layout.logo.width,
      height: Layout.logo.height,
    });
  }

  protected drawCompanyInfo(doc: PDFKit.PDFDocument): void {
    let y = Layout.company.y;

    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text(CompanyInfo.name, Layout.company.x, y);

    y += 28;

    doc
      .font("Helvetica")
      .fontSize(12)
      .text(CompanyInfo.slogan, Layout.company.x, y);

    y += 20;

    doc.fontSize(10).text(CompanyInfo.address, Layout.company.x, y);

    y += 15;

    doc.text(CompanyInfo.phone, Layout.company.x, y);
  }
  protected checkPageBreak(
    doc: PDFKit.PDFDocument,
    currentY: number,
    requiredHeight: number = 0,
  ): number {
    const bottomMargin = 40;

    if (currentY + requiredHeight > doc.page.height - bottomMargin) {
      doc.addPage();

      return 40;
    }

    return currentY;
  }
}
