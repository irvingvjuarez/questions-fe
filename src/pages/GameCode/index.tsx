import { useRef } from "react";
import { Form } from "@app/containers/Form"
import { Input } from "@app/components/Input"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"
import { API_ROOT } from "@app/globals"

export const GameCode = () => {
	const nicknameRef = useRef<HTMLInputElement | null>(null)
	const gameCodeRef = useRef<HTMLInputElement | null>(null)

	const enterGame = () => {
		const nickname = nicknameRef.current ? nicknameRef.current.value : ""
		const gameCode = gameCodeRef.current ? gameCodeRef.current.value : null

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
					// Handling the error of game code not found
					console.log("Game not found")
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
				<Input ref={gameCodeRef}>
					Enter the game code:
				</Input>

				<Input ref={nicknameRef}>
					Enter your nickname:
				</Input>
			</Form>

			<ButtonsContainer>
				<Button
					variant="active"
					handleClick={enterGame}
				>
					Enter to the Game!
				</Button>
			</ButtonsContainer>
		</section>
	)
}