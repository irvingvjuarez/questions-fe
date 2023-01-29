import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT, Q_TYPES } from "@app/globals"
import { getPostConfig } from "@app/services/getPostConfig"
import { Questions, User } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useErrorValidation } from "./useErrorValidation"
import { useFetch } from "./useFetch"

export const useGameRoom = () => {
	const validation = useErrorValidation()
	const setFetch = useFetch()
	let getUsersInterval: NodeJS.Timer

	const navigate = useNavigate()
	const { gameCode: contextGameCode, gameUsers = [], user, questionsDispatch } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams();

	const [currentUsers, setCurrentUsers] = useState<User[]>(gameUsers)

	const fetchUsers = () => {
		const apiTail = user.isUser
			? `/game/${contextGameCode}/users/${user.nickname}`
			: `/game/${contextGameCode}/users`;

		try {
			setFetch({
				endpoint: API_ROOT + apiTail,
				callback: (data) => {
					const newUsers = data.users.map((user: User) => ({
						nickname: user.nickname
					}))

					if (data.gameStarted) {
						navigate(`/game/${contextGameCode}/current/question`)
					}

					if (currentUsers.length < newUsers.length) {
						setCurrentUsers(newUsers)
					}
				}
			})
		} catch (err) {
			navigate("/")
		}
	}

	const startGame = () => {
		const config = getPostConfig()

		try {
			setFetch({
				endpoint: API_ROOT + `/game/${contextGameCode}/start`,
				config,
				callback: (data) => {
					if (data.game.started) {
						clearInterval(getUsersInterval)
						questionsDispatch({ type: Q_TYPES.removeLoading })

						navigate(`/game/${contextGameCode}/current/question`);
					}
				}
			})
		} catch (err) {
			navigate("/")
		}
	}

	useEffect(() => {
		// validation()
		getUsersInterval = setInterval(fetchUsers, 1000)

		return () => clearInterval(getUsersInterval)
	}, [])

	return { user, paramGameCode, currentUsers, startGame }
}