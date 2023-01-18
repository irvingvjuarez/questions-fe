import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { WinnerTable } from "@app/containers/WinnerTable"
import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT } from "@app/globals"
import { Questions } from "@app/types"
import { Fragment, useContext, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"

const fetchConfig = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: "POST"
}

export const GameOverAdmin = () => {
	const navigate = useNavigate()
	const isGameDeleted = useRef<boolean | null>(null)

	const { gameCode } = useContext(questionsContext) as Questions

	const userfinishesGame = () => {
		if (!isGameDeleted.current) {
			finishGame()
		}

		navigate("/")
	}

	const finishGame = () => {
		fetch(API_ROOT + `/game/${gameCode}/delete`, fetchConfig)
			.then(res => {
				if (!res.ok) throw new Error()
				return res.json()
			})
			.then(data => {
				if (data.deletedGame) {
					isGameDeleted.current = true
				} else {
					throw new Error()
				}
			})
			.catch(() => navigate("/"))
	}

	useEffect(() => {
		setTimeout(() => finishGame(), 5000)
	}, [])

	return (
		<Fragment>
			<WinnerTable />

			<ButtonsContainer>
				<Button
					variant="active"
					handleClick={userfinishesGame}
				>
					Finish Game!
				</Button>
			</ButtonsContainer>
		</Fragment>
	)
}