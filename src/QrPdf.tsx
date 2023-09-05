import {Document, Image, Page, View} from '@react-pdf/renderer';
import {pieceColorValues} from './GenricPieces';
import {type PieceColor} from './piece-types';

export default function QrPdf({
  qrPng,
  piecePng,
  piece,
}: {
  qrPng: string | undefined;
  piecePng: string | undefined;
  piece: PieceColor;
}) {
  return (
    <Document>
      <Page
        size="LETTER"
        orientation="landscape"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          padding: '1in',
          gap: '30px',
        }}
      >
        <View
          style={{
            width: '50vh',
            height: '50vh',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <View
            style={{
              padding: '20px',
            }}
          >
            {piecePng && (
              <Image style={{objectFit: 'contain'}} src={piecePng} />
            )}
          </View>
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderWidth: '6px',
              borderColor: pieceColorValues[piece],
              borderRadius: '9999px',
            }}
          />
        </View>
        <View
          style={{
            width: '50vh',
            height: '50vh',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '14px',
          }}
        >
          {qrPng && <Image style={{objectFit: 'contain'}} src={qrPng} />}
        </View>
      </Page>
    </Document>
  );
}
