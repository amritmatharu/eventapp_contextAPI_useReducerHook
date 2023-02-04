import { createContext, useContext, useReducer } from "react";
import eventReducer from "../store/events-store";

const EventContext = createContext(null);
const EventDispatchContext = createContext(null);
const ContextProvider = ({ children }) => {
  const [events, dispatch] = useReducer(eventReducer, []);
  return (
    <EventContext.Provider value={events}>
      <EventDispatchContext.Provider value={dispatch}>
        {children}
      </EventDispatchContext.Provider>
    </EventContext.Provider>
  );
};
export default ContextProvider;
export function useEventContext() {
  return useContext(EventContext);
}
export function useEventDispatchContext() {
  return useContext(EventDispatchContext);
}
