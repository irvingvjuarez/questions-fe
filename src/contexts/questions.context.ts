import { createContext } from "react";

const questionsContext = createContext({})
const QuestionsProvider = questionsContext.Provider;

export { questionsContext, QuestionsProvider }