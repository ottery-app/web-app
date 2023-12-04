import * as React from 'react';
import Ottery from './src';
import { QRCode } from './ottery-ui/image/QRCode';
import { image } from './ottery-ui/styles/image';

function App() {
  return <QRCode
    value={"https://youtu.be/dQw4w9WgXcQ?si=rA8lEFmnFf0dSFu1"}
    size={image.largeProfile}
  />
  //return <Ottery />
}

export default App;