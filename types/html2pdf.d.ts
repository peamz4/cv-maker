declare module "html2pdf.js" {
    interface Html2PdfOptions {
      margin?: number;
      filename?: string;
      html2canvas?: any;
      jsPDF?: any;
    }
  
    interface Html2Pdf {
      set: (options: Html2PdfOptions) => Html2Pdf;
      from: (element: string | HTMLElement) => Html2Pdf;
      save: (filename?: string) => void;
      outputPdf: () => Blob;
    }
  
    function html2pdf(element?: string | HTMLElement): Html2Pdf;
    export default html2pdf;
  }
  