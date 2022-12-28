import { useState } from "react";
import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { API_ROOT } from "@app/globals"
import { ErrorMsgList } from "@app/containers/ErrorMsgList";

export const GameCode = () => {
	const [nickname, setNickname] = useState("")
	const [gameCode, setGameCode] = useState<null | number>(null)
	const [errorMsgs, setErrorMsgs] = useState<string[]>([])

	const changeNickname = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setNickname(evt.target.value)
	}
	const changeGameCode = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setGameCode(Number(evt.target.value))
	}
	const bothInputsFilled = nickname && gameCode;

	const enterGame = () => {
		const fetchConfig = {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({ nickname })
		}

		fetch(API_ROOT + `/user/${gameCode}/join`, fetchConfig)
			.then(res => {
				if (res.status === 404) {
					setErrorMsgs(prev => [
						...prev,
						`Game code ${gameCode} is probably wrong.`
					])
				} else if (res.ok) {
					return res.json()
				}
			})
			.then(data => {
				console.log({ data })
			})
			.catch(err => {
				console.log({ err })
			})
	}

	return (
		<section>
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

			<ErrorMsgList list={errorMsgs}/>

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