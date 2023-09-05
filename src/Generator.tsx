import {useRef, useState, useEffect} from 'react';
import QRCode from 'react-qr-code';
import {PDFDownloadLink, PDFViewer} from '@react-pdf/renderer';
import {allPieceColors, type PieceColor} from './piece-types';
import Popover from './Popover';
import FixedPiece3D from './FixedPiece3D';
import QrPdf from './QrPdf';

export default function Generator() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [piece, setPiece] = useState<PieceColor>('pink');
  const [qrPng, setQrPng] = useState<string>();
  const [takeSnapshot, setTakeSnapshot] = useState<() => string>(() => '');
  const [piecePng, setPiecePng] = useState<string>();

  const searchParameters = new URLSearchParams([['p', piece]]);
  if (message) {
    searchParameters.set('m', encodeURIComponent(message));
  }

  if (image) {
    searchParameters.set('i', encodeURIComponent(image));
  }

  const url = `${window.location.origin}${
    import.meta.env.BASE_URL
  }?${searchParameters.toString()}`;

  const svgRef = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    // Once the snapshot function has been set, take a snapshdot
    if (takeSnapshot) {
      const data = takeSnapshot();
      setPiecePng(data);
    }
  }, [takeSnapshot]);

  // Render the QR SVG to PNG
  useEffect(() => {
    // https://levelup.gitconnected.com/draw-an-svg-to-canvas-and-download-it-as-image-in-javascript-f7f7713cf81f
    const html = svgRef.current.outerHTML;
    const blob = new Blob([html], {
      type: 'image/svg+xml;charset=utf-8',
    });
    const blobUrl = URL.createObjectURL(blob);
    const qrImage = new Image();
    const size = 800;
    qrImage.width = size;
    qrImage.height = size;
    qrImage.addEventListener('load', () => {
      URL.revokeObjectURL(blobUrl);
      const canvas = document.createElement('canvas');
      canvas.style.backgroundColor = 'white';
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d')!;
      context.fillStyle = 'white';
      context.fillRect(0, 0, size, size);
      context.drawImage(qrImage, 0, 0, size, size);
      const png = canvas.toDataURL();
      setQrPng(png);
    });

    // Setting the source triggers the load event
    qrImage.src = blobUrl;
  }, [piece, message, image, setQrPng]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute w-800px h-800px top-0 left-0 invisible">
        <FixedPiece3D
          setTakeSnapshot={setTakeSnapshot}
          color={piece}
          rotation={[Math.PI / -8, Math.PI / 4.8, Math.PI / 16]}
        />
      </div>

      <div className="max-w-screen-sm w-full flex flex-col w-full p-4 gap-4 items-stretch">
        <div className="admin-header">Customize Piece</div>
        <label className="flex flex-row gap-2 items-center self-center">
          <div className="items-start">Piece*</div>
          <select
            className="input-control"
            value={piece}
            onChange={(event) => {
              setPiece(event.target.value as PieceColor);
            }}
          >
            {allPieceColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col items-stretch">
          <div className="items-start">Message (optional)</div>
          <input
            className="input-control"
            type="text"
            value={message}
            placeholder="Popover message for users to dismiss"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </label>
        <label className="flex flex-col items-stretch">
          <div className="items-start">External image url (optional)</div>
          <input
            className="input-control"
            type="text"
            value={image}
            placeholder="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg"
            onChange={(event) => {
              setImage(event.target.value);
            }}
          />
        </label>
        {(message || image) && (
          <>
            <div className="mt-8 text-lg font-bold">Popover Preview:</div>
            <div className="w-full overflow-hidden">
              <Popover message={message} imageSource={image} />
            </div>
          </>
        )}
        <div className="admin-header">URL (click to test)</div>
        <div className="break-all">
          <a href={url}>{url}</a>
        </div>
        <div className="admin-header">Assets</div>
        <div className="flex-row">
          <div className="flex-1">Piece</div>
          <div className="flex-1">QR Code</div>
        </div>
        <div className="flex-row">
          <div className="flex-1">
            <img src={piecePng} />
          </div>
          <div className="flex-1">
            <div className="bg-white p-4 self-center">
              {/* @ts-expect-error some of the props are not defined in the library typings */}
              <QRCode
                ref={svgRef}
                value={url}
                size={256}
                version={1.1}
                title={`Add ${piece} piece`}
              />
            </div>
          </div>
        </div>
        <div className="flex-row items-start">
          <div className="flex-1">
            <a
              className="input-control"
              href={piecePng}
              download={`${piece}.png`}
            >
              Download PNG
            </a>
          </div>
          <div className="flex-1 flex-row justify-center gap-2">
            <button
              className="input-control"
              type="button"
              onClick={(event) => {
                event.preventDefault();
                downloadData(qrPng!, 'qr.png');
              }}
            >
              Download PNG
            </button>
            <button
              className="input-control"
              type="button"
              onClick={() => {
                const html = svgRef.current.outerHTML;
                const blob = new Blob([html], {
                  type: 'image/svg+xml;charset=utf-8',
                });
                const blobUrl = URL.createObjectURL(blob);
                downloadData(blobUrl, 'qr.svg');
              }}
            >
              Download SVG
            </button>
          </div>
        </div>
        <div className="admin-header">PDF</div>
        <div>
          <PDFViewer className="w-full aspect-[11/8.5]" showToolbar={false}>
            <QrPdf qrPng={qrPng} piecePng={piecePng} piece={piece} />
          </PDFViewer>
        </div>
        <PDFDownloadLink
          className="input-control self-center"
          document={<QrPdf qrPng={qrPng} piecePng={piecePng} piece={piece} />}
          fileName={`${piece}.pdf`}
        >
          {/* {blob, url, loading, error} */}
          {({loading}) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

// https://dev.to/nombrekeff/download-file-from-blob-21ho
function downloadData(dataUrl: string, name: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = name;

  // Append link to the body
  document.body.append(link);

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    }),
  );

  // Remove link from body
  link.remove();
}
