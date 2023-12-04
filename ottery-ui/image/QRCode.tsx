import QRCodeInternal from 'react-native-qrcode-svg';

export interface QRCodeProps {
    value: string,
    size: number,
}

export function QRCode({value, size}: QRCodeProps) {
    // const [imgProps, setImageProps] = useState({});

    // useEffect(()=>{
    //     setImageProps({
    //         logo:logoHead.src,
    //         logoSize:size*0.50,
    //         logoBackgroundColor:'transparent'
    //     });
    // }, []);

    return <QRCodeInternal
        value={value}
        size={size}
        // {...imgProps}
    />
}