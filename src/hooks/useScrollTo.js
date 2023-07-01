import { useRef } from "react"

export function useScrollTo(behavior="smooth") {
    const ref = useRef()

    const scrollTo = () => {
      ref.current?.scrollIntoView({ behavior })
    }

    return [ref, scrollTo];
}