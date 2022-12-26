import { Button } from "@app/components/Button"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const Options = () => {
	const navigate = useNavigate()
	const [isChecked, setIsChecked] = useState(false)

	const {questionId} = useParams()
	const {questions} = useContext(questionsContext) as Questions
	const currentQuestion = questions.find(question => question.id == questionId)

	const handleChecked = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const isInputChecked = evt.target.checked;

		if (isInputChecked && !isChecked) {
			setIsChecked(true)
		}
	}

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
							onChange={handleChecked}
							hidden
						/>

						<label htmlFor={id} className="block w-full py-2 h-[inherit] rounded-lg">
							{content}
						</label>
					</li>
				))}
			</ul>

			<ButtonsContainer>
				<Button variant="active" disabled={!isChecked}>
					Create Game!
				</Button>

				<Button variant="inactive" disabled={!isChecked}>
					Add another question
				</Button>
			</ButtonsContainer>
		</section>
	)
}