import './App.css'
import { useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './containers/Layout'
import { GameCode } from './pages/GameCode'
import { Home } from './pages/Home'
import { NewGame } from './pages/NewGame'
import { questionsReducer } from "@app/reducers/questions.reducer"
import { QuestionsProvider } from "@app/contexts/questions.context"
import { Options } from './pages/Options'
import { Questions } from './types'
import { GameRoom } from './pages/GameRoom'
import { CurrentQuestion } from './pages/CurrentQuestion'

function App() {
	const initialState: Omit<Questions, "questionsDispatch"> = {
		questions: [],
		gameCode: null,
		gameUsers: [],
		user: {
			isUser: false,
			nickname: ""
		}
	}

	// @ts-ignore
	const [questions, questionsDispatch] = useReducer(questionsReducer, initialState);
	const questionsValue = { ...questions, questionsDispatch }

  return (
		<BrowserRouter>
			<Layout>
					<QuestionsProvider value={questionsValue}>
						<Routes>
							<Route index element={<Home />} />
							<Route path='/game/new' element={<NewGame />} />
							<Route path='/game/code' element={<GameCode />} />
							<Route path='/questions/:questionId/options' element={<Options />} />
							<Route path='/game/questions/new' element={<NewGame />} />
							<Route path='/game/:gameCode/room' element={<GameRoom />} />
							<Route path='/game/on/current/question' element={<CurrentQuestion />}/>
						</Routes>
					</QuestionsProvider>
			</Layout>
		</BrowserRouter>
  )
}

export default App
