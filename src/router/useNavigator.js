import { useNavigation } from "@react-navigation/native";
import { useCallback, createContext, useRef, useContext } from "react";
import * as Linking from "expo-linking";

const NavigatorContext = createContext();

function useNext() {
  //null states it has been consumed
  //undefined means it has not been set yet
  //might want to make a flag for this instead...
  const nextRef = useRef(undefined);
  const paramsRef = useRef(undefined);

  const initializeNext = useCallback(()=>{
    Linking.getInitialURL().then((link)=>{
      if (nextRef.current === undefined) {
        nextRef.current = link
      }
    });
  }, []);

  const consumeNext = useCallback(()=>{
    const n = nextRef.current;
    nextRef.current = undefined;
    const p = paramsRef.current
    paramsRef.current = undefined;
    return [n, p];
  }, [])

  const addNext = useCallback((next, params)=>{
    nextRef.current = next;
    paramsRef.current = params;
  }, []);

  const hasNext = useCallback(()=>!!nextRef.current, []);

  //this will not run at the right time when put in a use effect
  initializeNext();

  return {hasNext, consumeNext, initializeNext, addNext};
}

export function NavigatorProvider({children}) {
  const {hasNext, consumeNext, addNext} = useNext();

  return (
    <NavigatorContext.Provider
        value={{
          addNext,
          hasNext,
          consumeNext,
      }}
    >
      {children}
    </NavigatorContext.Provider>
  );
} 

export function useGotoNext() {
  const navigator = useNavigator()
  const {hasNext, consumeNext} = useContext(NavigatorContext);

  return ()=>{
    if (hasNext()) {
      let [next] = consumeNext();
      next = Linking.parse(next);
  
      setTimeout(()=>{
        //WORKS WITH THIS LINK:
        //http://localhost:19006//child/:childId/addguardian?childId=65408d3f9b8ed4e9ed45942b&token=CVWDUWCX9AKUYQ8QUPHBSPF6SCTMH36T&email=benjamin@ottery.app
        navigator(next.path, next.queryParams);
      }, 10);
    }
  }
}

export function useNavigator() {
  const {addNext, hasNext, consumeNext} = useContext(NavigatorContext);
  const navigation = useNavigation();

  return function navigator(path, params) {
    let addedNext = false;
    if (params?.next) {
      addedNext = true;
      addNext(params.next, params.nextParams);
    }

    if (addedNext === false && hasNext()) {
      const [next, nextParams] = consumeNext();
      navigation.navigate(next, nextParams);
      return;
    }

    navigation.navigate(path, params);
  };
}
