import { questionsContext } from "@app/contexts/questions.context";
import { API_ROOT, Q_TYPES } from "@app/globals";
import { getPostConfig } from "@app/services/getPostConfig";
import { Questions } from "@app/types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "./useFetch";

export const useGameCodeForm = () => {
	const navigate = useNavigate();
	const setFetch = useFetch()

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

	return {
		changeGameCode,
		changeNickname,
		errorMsgs,
		enterGame,
		bothInputsFilled
	}
}