import { useNavigation } from "@react-navigation/native";
import { useCallback, createContext, useRef, useContext } from "react";
import * as Linking from "expo-linking";

const NavigatorContext = createContext();

function useNext() {
  //null states it has been consumed
  //undefined means it has not been set yet
  //might want to make a flag for this instead...
  const nextRef = useRef(undefined);

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
    return n;
  }, [])

  const hasNext = useCallback(()=>!!nextRef.current, []);

  //this will not run at the right time when put in a use effect
  initializeNext();

  return {hasNext, consumeNext, initializeNext};
}

export function NavigatorProvider({children}) {
  const {hasNext, consumeNext} = useNext();

  return (
    <NavigatorContext.Provider
        value={{
          hasNext,
          consumeNext,
      }}
    >
      {children}
    </NavigatorContext.Provider>
  );
} 

//This should be used in the home screen?
export function useGotoNext() {
  const navigator = useNavigator()
  const {hasNext, consumeNext} = useContext(NavigatorContext);
  console.log("trigger next");
  if (hasNext()) {
    let next = consumeNext();
    next = Linking.parse(next);

    setTimeout(()=>{
      //WORKS WITH THIS LINK:
      //http://localhost:19006//child/:childId/addguardian?childId=65408d3f9b8ed4e9ed45942b&token=CVWDUWCX9AKUYQ8QUPHBSPF6SCTMH36T&email=benjamin@ottery.app
      console.log(next);
      navigator(next.path, next.queryParams);
    }, 10);
  }
}

export function useNavigator() {
  const navigation = useNavigation();

  return function navigator(path, params) {
    navigation.navigate(path, params);
  };
}
