// types.ts
export type DownloadType = "PDF" | "MD" | "HTML" | "TXT";

export interface DownloadOptions {
  filename?: string;
  pdfOptions?: {
    scale?: number;
    backgroundColor?: string;
    orientation?: "portrait" | "landscape";
  };
}

export const generateFilename = (
  extension: string,
  customName?: string
): string => {
  const timestamp = Date.now();
  return customName
    ? `${customName}.${extension}`
    : `content-${timestamp}.${extension}`;
};

export const createDownloadLink = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const downloadHtml = (
  content: HTMLElement,
  options?: DownloadOptions
): void => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Downloaded Content</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body>
    ${content.innerHTML}
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: "text/html" });
  const filename = generateFilename("html", options?.filename);
  createDownloadLink(blob, filename);
};

const createPrintFallback = (content: HTMLElement): void => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Print Content</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            @media print { body { margin: 0; } }
        </style>
    </head>
    <body>
        ${content.innerHTML}
        <script>
            window.onload = function() {
                window.print();
                window.close();
            };
        </script>
    </body>
    </html>
  `);
  printWindow.document.close();
};

export const downloadPdf = async (
  content: HTMLElement,
  options?: DownloadOptions
): Promise<void> => {
  try {
    const [html2canvas, jsPDF] = await Promise.all([
      import("html2canvas").then((m) => m.default),
      import("jspdf").then((m) => m.jsPDF),
    ]);

    const pdfOpts = options?.pdfOptions || {};
    const canvas = await html2canvas(content, {
      useCORS: true,
      allowTaint: true,
      scale: pdfOpts.scale || 2,
      backgroundColor: pdfOpts.backgroundColor || "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: pdfOpts.orientation || "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
    const imgX = (pdfWidth - canvas.width * ratio) / 2;

    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      0,
      canvas.width * ratio,
      canvas.height * ratio
    );

    const filename = generateFilename("pdf", options?.filename);
    pdf.save(filename);
  } catch (error) {
    console.error("PDF generation failed, using print fallback:", error);
    createPrintFallback(content);
  }
};

export const downloadMarkdown = (
  content: string,
  options?: DownloadOptions
): void => {
  const blob = new Blob([content], { type: "text/markdown" });
  const filename = generateFilename("md", options?.filename);
  createDownloadLink(blob, filename);
};

export const downloadText = (
  content: string,
  options?: DownloadOptions
): void => {
  const blob = new Blob([content], { type: "text/plain" });
  const filename = generateFilename("txt", options?.filename);
  createDownloadLink(blob, filename);
};

export const downloadContent = (
  type: DownloadType,
  content: string | HTMLElement,
  options?: DownloadOptions
): void => {
  const allDownloader = {
    HTML: () => downloadHtml(content as HTMLElement, options),
    MD: () => downloadMarkdown(content as string, options),
    PDF: () => downloadPdf(content as HTMLElement, options),
    TXT: () => downloadText(content as string, options),
  };

  const downloader = allDownloader[type];
  if (!downloader) {
    throw new Error(`Unsupported download type: ${type}`);
  }

  downloader();
};
