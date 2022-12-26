import { useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from './containers/Layout'
import { GameCode } from './pages/GameCode'
import { Home } from './pages/Home'
import { NewGame } from './pages/NewGame'
import { questionsReducer } from "@app/reducers/questions.reducer"
import { QuestionsProvider } from "@app/contexts/questions.context"

function App() {
	const [questions, questionsDispatch] = useReducer(questionsReducer, { questions: [] });
	const questionsValue = { ...questions, questionsDispatch }

  return (
		<BrowserRouter>
			<Layout>
					<QuestionsProvider value={questionsValue}>
						<Routes>
							<Route index element={<Home />} />
								<Route path='/game/new' element={<NewGame />} />
							<Route path='/game/code' element={<GameCode />} />
						</Routes>
					</QuestionsProvider>
			</Layout>
		</BrowserRouter>
  )
}

export default App
