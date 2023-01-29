import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { WinnerTable } from "@app/containers/WinnerTable"
import { useGameOver } from "@app/hooks/useGameOver"
import { Fragment } from "react"

export const GameOverAdmin = () => {
	const { userfinishesGame } = useGameOver()

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