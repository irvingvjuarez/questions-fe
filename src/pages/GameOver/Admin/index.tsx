import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { WinnerTable } from "@app/containers/WinnerTable"
import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT } from "@app/globals"
import { Questions } from "@app/types"
import { Fragment, useContext, useEffect } from "react"
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
	let deleteGameTimeout: number | null

	const { gameCode } = useContext(questionsContext) as Questions

	const userfinishesGame = () => {
		if (deleteGameTimeout !== null) {
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
					clearTimeout(deleteGameTimeout as number)
					deleteGameTimeout = null
				} else {
					throw new Error()
				}
			})
			.catch((err) => console.log(err))
	}

	useEffect(() => {
		deleteGameTimeout = setTimeout(() => finishGame(), 5000)
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