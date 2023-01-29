import { questionsContext } from "@app/contexts/questions.context"
import { Q_TYPES } from "@app/globals"
import { Questions } from "@app/types"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { getGameOverMsgs } from "./utils/getGameOverMsgs"

export const useUserGameOver = () => {
	const navigate = useNavigate()

	const { user, score, questionsDispatch } = useContext(questionsContext) as Questions
	const nickname = user.nickname
	const scoreIndex = score.findIndex(item => item.nickname == nickname)

	const quitGame = () => {
		questionsDispatch({ type: Q_TYPES.clearGame })
		navigate("/")
	}

	const { message } = getGameOverMsgs()

	return { scoreIndex, message, score, quitGame }
}