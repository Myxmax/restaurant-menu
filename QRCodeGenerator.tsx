import React from 'react';
import QRCode from 'qrcode.react';
import { Download, Printer } from 'lucide-react';

interface QRCodeGeneratorProps {
  tableNumber: string | number;
  restaurantId: string;
  baseUrl?: string;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  includeMargin?: boolean;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  tableNumber,
  restaurantId,
  baseUrl = 'https://myxmax.github.io/restaurant-menu',
  size = 256,
  level = 'H',
  includeMargin = true,
}) => {
  const qrRef = React.useRef<any>(null);

  // ایجاد URL QR code
  const qrValue = `${baseUrl}?table=${tableNumber}&restaurant=${restaurantId}`;

  // دانلود QR code
  const handleDownload = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qr-table-${tableNumber}.png`;
      link.href = url;
      link.click();
    }
  };

  // چاپ QR code
  const handlePrint = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      const url = canvas.toDataURL('image/png');
      const printWindow = window.open();
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>QR Code - جدول ${tableNumber}</title>
              <style>
                body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                  background: white;
                  font-family: Arial, sans-serif;
                  direction: rtl;
                }
                .container {
                  text-align: center;
                }
                img {
                  max-width: 500px;
                  border: 3px solid #333;
                  padding: 20px;
                }
                h2 {
                  margin: 10px 0;
                  color: #333;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>جدول ${tableNumber}</h2>
                <img src="${url}" alt="QR Code" />
                <p>کد QR را اسکن کنید تا منو ببینید</p>
              </div>
            </body>
          </html>
        `);
        printWindow.document.close();
        setTimeout(() => {
          printWindow.print();
        }, 250);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-lg">
      {/* QR Code */}
      <div ref={qrRef} className="bg-white p-4 rounded border-2 border-gray-200">
        <QRCode
          value={qrValue}
          size={size}
          level={level}
          includeMargin={includeMargin}
          renderAs="canvas"
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>

      {/* معلومات */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800">جدول {tableNumber}</h3>
        <p className="text-sm text-gray-500 mt-1">کد QR برای مشتریان</p>
        <p className="text-xs text-gray-400 mt-2 break-all">{qrValue}</p>
      </div>

      {/* دکمه‌های عمل */}
      <div className="flex gap-2">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          <Download size={18} />
          <span>دانلود</span>
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          <Printer size={18} />
          <span>چاپ</span>
        </button>
      </div>

      {/* نکات مفید */}
      <div className="text-xs text-gray-600 text-center bg-yellow-50 p-3 rounded w-full">
        <p className="font-semibold">💡 نکات:</p>
        <ul className="text-right mt-1 space-y-1">
          <li>✓ مشتری QR را اسکن می‌کند</li>
          <li>✓ منو رستوران خودکار باز می‌شود</li>
          <li>✓ قیمت و توضیحات قابل مشاهده‌ای</li>
        </ul>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
