import {useRef, useState} from 'react';
import QRCode from 'react-qr-code';
import {allPieceColors, type PieceColor} from './piece-types';
import Popover from './Popover';

export default function Generator() {
  const [message, setMessage] = useState('');
  const [image, setImage] = useState('');
  const [piece, setPiece] = useState<PieceColor>('pink');

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
  const [size, setSize] = useState(800);

  return (
    <div className="flex flex-col w-full p-4 gap-4 items-stretch">
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
          <div className="mt-8 text-lg font-700">Popover Preview:</div>
          <div className="w-full overflow-hidden">
            <Popover message={message} imageSource={image} />
          </div>
        </>
      )}
      <div className="mt-8 text-lg font-700">QR Code:</div>
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
      <div className="text-lg font-700">Embedded URL (click to test):</div>
      <div className="break-all">
        <a href={url}>{url}</a>
      </div>
      <div className="flex-row gap-2 self-center">
        <select
          className="input-control"
          value={size}
          onChange={(event) => {
            setSize(Number.parseInt(event.target.value, 10));
          }}
        >
          <option value={400}>400px</option>
          <option value={800}>800px</option>
          <option value={1600}>1600px</option>
          <option value={2400}>2400px</option>
        </select>
        <button
          className="input-control"
          type="button"
          onClick={(event) => {
            event.preventDefault();
            // https://levelup.gitconnected.com/draw-an-svg-to-canvas-and-download-it-as-image-in-javascript-f7f7713cf81f
            const html = svgRef.current.outerHTML;
            const blob = new Blob([html], {
              type: 'image/svg+xml;charset=utf-8',
            });
            const blobUrl = URL.createObjectURL(blob);
            const qrImage = new Image();
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
              downloadData(png, 'qr.png');
            });

            // Setting the source triggers the load event
            qrImage.src = blobUrl;
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
      <div />
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
