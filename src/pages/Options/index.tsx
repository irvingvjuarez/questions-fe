import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const Options = () => {
	const navigate = useNavigate()

	const {questionId} = useParams()
	const {questions} = useContext(questionsContext) as Questions
	const currentQuestion = questions.find(question => question.id == questionId)

	useEffect(() => {
		if (!currentQuestion) {
			// TODO: send to a 404 page
			navigate("/")
		}
	}, [])

	return (
		<section>
			<h2 className="subtitle mb-2 font-light">
				Choose the correct option for the following question:
			</h2>

			<span className="underline tracking-wide font-semibold px-4">
				{currentQuestion?.content}
			</span>

			<ul className="my-4 p-3 flex flex-col space-y-3">
				{currentQuestion?.answers.map(({ id, content }) => (
					<li key={id} className="rounded-lg bg-background-dark">
						<input
							className="option"
							type="radio"
							name={currentQuestion.content || ""}
							id={id}
							hidden
						/>

						<label htmlFor={id} className="block w-full py-2 h-[inherit] rounded-lg">
							{content}
						</label>
					</li>
				))}
			</ul>
		</section>
	)
}