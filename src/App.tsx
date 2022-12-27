import './App.css'
import { Reducer, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './containers/Layout'
import { GameCode } from './pages/GameCode'
import { Home } from './pages/Home'
import { NewGame } from './pages/NewGame'
import { questionsReducer } from "@app/reducers/questions.reducer"
import { QuestionsProvider } from "@app/contexts/questions.context"
import { Options } from './pages/Options'
import { Action, Questions } from './types'
import { GameRoom } from './pages/GameRoom'

function App() {
	const initialState: Omit<Questions, "questionsDispatch"> = { questions: [], gameCode: null }

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
						</Routes>
					</QuestionsProvider>
			</Layout>
		</BrowserRouter>
  )
}

export default App
