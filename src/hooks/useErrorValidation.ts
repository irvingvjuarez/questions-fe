import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const useErrorValidation = () => {
	const navigate = useNavigate()
	const { gameCode } = useContext(questionsContext) as Questions
	const { gameCode: paramGameCode } = useParams()

	return function() {
		if (gameCode !== Number(paramGameCode)) {
			navigate("/")
		}
	}
}