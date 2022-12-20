import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Layout } from './containers/Layout'
import { GameCode } from './pages/GameCode'
import { Home } from './pages/Home'
import { NewGame } from './pages/NewGame'

function App() {
  return (
		<BrowserRouter>
			<Layout>
					<Routes>
						<Route index element={<Home />} />
						<Route path='/game/new' element={<NewGame />} />
						<Route path='/game/code' element={<GameCode />} />
					</Routes>
			</Layout>
		</BrowserRouter>
  )
}

export default App
