const { createCanvas, loadImage } = require("canvas");
const qr = require("qr-image");

// Helper function to generate certificate image buffer
const generateCertificateBuffer = async (certificate) => {
  const dataURL = certificate.templateId.image;
  const base64Data = dataURL.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const image = await loadImage(buffer);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);
  ctx.textBaseline = "top";

  for (const varConfig of certificate.templateId.variables) {
    if (varConfig.type === "text") {
      const posX = (varConfig.x / 100) * canvas.width;
      const posY = (varConfig.y / 100) * canvas.height;
      ctx.font = `${varConfig.fontSize}px ${varConfig.fontFamily}`;
      ctx.fillStyle = varConfig.color;
      ctx.fillText(certificate.studentData[varConfig.name] || "", posX, posY);
    } else if (varConfig.type === "qr") {
      // Ensure process.env.FRONTEND_VERIFY_URL is available
      if (!process.env.FRONTEND_VERIFY_URL) {
        console.error(
          "FRONTEND_VERIFY_URL is not defined in environment variables."
        );
        // You might want to handle this more gracefully, maybe skip QR or throw an error
        continue;
      }
      const qrUrl = `${process.env.FRONTEND_VERIFY_URL}/${certificate.verificationCode}`;
      const qrBuffer = qr.imageSync(qrUrl, { type: "png" });
      const qrImage = await loadImage(qrBuffer);
      const posX = (varConfig.x / 100) * canvas.width;
      const posY = (varConfig.y / 100) * canvas.height;
      const size = (varConfig.size / 100) * canvas.width;
      ctx.drawImage(qrImage, posX, posY, size, size);
    }
  }

  return canvas.createPNGStream();
};

module.exports = {
  generateCertificateBuffer,
};
