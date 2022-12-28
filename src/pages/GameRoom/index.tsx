import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { questionsContext } from "@app/contexts/questions.context"
import { Q_TYPES } from "@app/globals"
import { Action, Questions, User } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const GameRoom = () => {
	const navigate = useNavigate()
	const { gameCode: contextGameCode, gameUsers = [], questions } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams()

	console.log({gameUsers, questions, contextGameCode})

	useEffect(() => {
		if (Number(paramGameCode) !== contextGameCode) {
			navigate("/")
		}
	}, [])

	return (
		<section>
			<h2 className="subtitle">
				Share the following code:
			</h2>

			<span className="highlighted">
				{paramGameCode}
			</span>

			<article className="border-2 border-white w-[90%] mx-auto h-[60vh] my-3 flex justify-center items-center p-3">
				{gameUsers.length < 1 ? (
					<span>
						This game room is currently empty.
					</span>
				) : (
					<>
						{gameUsers.map(user => (
							<span>
								{user.nickname}
							</span>
						))}
					</>
				)}
			</article>

			<ButtonsContainer>
				<Button variant="active">
					Start Game!
				</Button>
			</ButtonsContainer>
		</section>
	)
}