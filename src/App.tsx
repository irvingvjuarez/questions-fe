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
import { GameRoom } from './pages/GameRoom'
import { CurrentQuestion } from './pages/CurrentQuestion'
import { CurrentScore } from './pages/CurrentScore'
import { UserScore } from './pages/UserScore'
import { UserResults } from './pages/UserResults'
import { GameOver } from './pages/GameOver'
import { getInitialState } from './services/getInitialState'
import { HelmetProvider } from 'react-helmet-async'

function App() {
	const [questions, questionsDispatch] = useReducer(questionsReducer, getInitialState());
	const questionsValue = { ...questions, questionsDispatch }

  return (
		<HelmetProvider>
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
								<Route path='/game/:gameCode/current/question' element={<CurrentQuestion />}/>
								<Route path='/game/:gameCode/current/score' element={<CurrentScore />}/>
								<Route
									path='/game/:gameCode/user/:nickname/current/score'
									element={<UserScore />}
								/>
								<Route path='/game/:gameCode/user/current/results' element={<UserResults />} />
								<Route path='/game/:gameCode/over' element={<GameOver />}/>
							</Routes>
						</QuestionsProvider>
				</Layout>
			</BrowserRouter>
		</HelmetProvider>
  )
}

export default App
