import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { ErrorMsgList } from "@app/containers/ErrorMsgList";
import { useGameCodeForm } from "@app/hooks/useGameCodeForm";

export const GameCode = () => {
	const { changeGameCode, changeNickname, errorMsgs, enterGame, bothInputsFilled } = useGameCodeForm()

	return (
		<section className="page-container">
			<Form>
				<Input
					type="number"
					placeholder="Eg. 3392"
					handleChange={changeGameCode}
				>
					Enter the game code:
				</Input>

				<Input handleChange={changeNickname}>
					Enter your nickname:
				</Input>
			</Form>

			<ErrorMsgList
				className="min-w-[300px] w-[90%] mx-auto my-4"
				list={errorMsgs}
			/>

			<ButtonsContainer>
				<Button
					variant="active"
					handleClick={enterGame}
					disabled={!bothInputsFilled}
				>
					Enter to the Game!
				</Button>
			</ButtonsContainer>
		</section>
	)
}