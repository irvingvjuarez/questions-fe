import { questionsContext } from "@app/contexts/questions.context"
import { API_ROOT } from "@app/globals"
import { getPostConfig } from "@app/services/getPostConfig"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useErrorValidation } from "./useErrorValidation"
import { useFetch } from "./useFetch"

export const useGameOver = () => {
	const validation = useErrorValidation()
	const setFetch = useFetch()
	const navigate = useNavigate()
	let deleteGameTimeout: NodeJS.Timeout | null

	const { gameCode, user } = useContext(questionsContext) as Questions

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
		validation()
		deleteGameTimeout = setTimeout(() => finishGame(), 5000)
	}, [])

	return {
		user,
		userfinishesGame
	}
}