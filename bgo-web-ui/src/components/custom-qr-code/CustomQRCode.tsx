import { QRCode } from 'react-qrcode-logo'
import logo from '@assets/image/torch.png'

export interface CustomQRCodeProps {
  url: string
}

export default function CustomQRCode({ url }: CustomQRCodeProps) {
  return (
    <QRCode
      qrStyle={'dots'}
      size={100}
      bgColor={'#f0feff'}
      fgColor={'#232675'}
      logoImage={logo}
      logoHeight={30}
      logoWidth={15}
      logoPadding={1}
      eyeRadius={2}
      quietZone={5}
      removeQrCodeBehindLogo={true}
      eyeColor={'gray'}
      value={url}
    />
  )
}
