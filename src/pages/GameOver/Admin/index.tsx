import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { WinnerTable } from "@app/containers/WinnerTable"
import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT } from "@app/globals"
import { useFetch } from "@app/hooks/useFetch"
import { getPostConfig } from "@app/services/getPostConfig"
import { Questions } from "@app/types"
import { Fragment, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const GameOverAdmin = () => {
	const setFetch = useFetch()
	const navigate = useNavigate()
	let deleteGameTimeout: NodeJS.Timeout | null

	const { gameCode } = useContext(questionsContext) as Questions

	const userfinishesGame = () => {
		if (deleteGameTimeout !== null) {
			finishGame()
		}

		navigate("/")
	}

	const finishGame = () => {
		const config = getPostConfig()
		try {
			setFetch({
				endpoint: API_ROOT + `/game/${gameCode}/delete`,
				config,
				callback: (data) => {
					if (data.deletedGame) {
						clearTimeout(deleteGameTimeout as NodeJS.Timeout)
						deleteGameTimeout = null
					}
				}
			})
		} catch (err) {
			navigate("/")
		}
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