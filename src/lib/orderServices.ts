import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const notificationDefinitions = {
  email: {
    subject: "Tu arte floral está en camino - Flora Boutique",
    template: (orderId: string, customer: string) => `
      Hola ${customer},
      ¡Gracias por elegir Flora Boutique!
      Tu pedido ${orderId} ha sido confirmado y está siendo preparado por nuestros maestros floristas.
      Adjuntamos tu comprobante PDF.
    `
  },
  whatsapp: {
    message: (orderId: string, customer: string, deliveryDate: string) => 
      `¡Hola ${customer}! 🌸 Te saludamos de Flora Boutique. Tu pedido #${orderId} ha sido recibido con éxito. Estaremos enviando fotos de tu ramo el día ${deliveryDate}. ¡Gracias por confiar en nosotros! ✨`
  }
};

export const generatePDF = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff"
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(fileName);
};
