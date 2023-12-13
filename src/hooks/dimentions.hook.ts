import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));

    const onChange = ({ window }) => {
        setWindowDimensions(window);
    };

    useEffect(() => {
        const onChangeHandler = Dimensions.addEventListener('change', onChange);

        return () => {
        onChangeHandler.remove(); // Remove the listener when the component unmounts
        };
    }, []);

    return windowDimensions;
};

export const useScreenDimensions = () => {
    const [screenDimensions, setScreenDimensions] = useState(Dimensions.get('screen'));
  
    const onChange = ({ screen }) => {
      setScreenDimensions(screen);
    };
  
    useEffect(() => {
      const onChangeHandler = Dimensions.addEventListener('change', onChange);
  
      return () => {
        onChangeHandler.remove(); // Remove the listener when the component unmounts
      };
    }, []);
  
    return screenDimensions;
};
