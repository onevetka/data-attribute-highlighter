import { Dispatch } from "./dispatch";

export type Effector<Effect, Event> = (effect: Effect, injection: { dispatch: Dispatch<Event> }) => void;