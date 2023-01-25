import { useContext, useState } from "react";
import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { ErrorMsgList } from "@app/containers/ErrorMsgList";
import { questionsContext } from "@app/contexts/questions.context";
import { Questions } from "@app/types";
import { useNavigate } from "react-router-dom";
import { getPostConfig } from "@app/services/getPostConfig";
import { setFetch } from "@app/services/setFetch";

export const GameCode = () => {
	const navigate = useNavigate();

	const [nickname, setNickname] = useState("")
	const [gameCode, setGameCode] = useState<null | number>(null)
	const [errorMsgs, setErrorMsgs] = useState<string[]>([])

	const { questionsDispatch } = useContext(questionsContext) as Questions;
	const changeNickname = (evt: React.ChangeEvent<HTMLInputElement>) => setNickname(evt.target.value)
	const changeGameCode = (evt: React.ChangeEvent<HTMLInputElement>) => setGameCode(Number(evt.target.value))
	const bothInputsFilled = nickname && gameCode;

	const enterGame = () => {
		const endpoint = API_ROOT + `/user/${gameCode}/join`
		const config = getPostConfig({ nickname })

		try {
			setFetch({
				endpoint,
				config,
				callback: (data) => {
					const {gameQuestions: questions, gameUsers, gameCode} = data;
					const payload = {questions, gameUsers, gameCode, nickname}

					questionsDispatch({ type: Q_TYPES.userJoins, payload });
					navigate(`/game/${gameCode}/room`)
				}
			})
		} catch (err) {
			setErrorMsgs(prev => [
				...prev,
				(err as Error).message
			]);
		}
	}

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