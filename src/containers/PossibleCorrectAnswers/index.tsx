import { useKeypress } from "@app/hooks/useKeypress"
import { PossibleCorrectAnswersProps } from "./type"

export const PossibleCorrectAnswers: React.FC<PossibleCorrectAnswersProps> = ({ answers, handleChange, questionContent }) => {
	const { hoverOption } = useKeypress()

	return (
		<ul className="my-4 py-3 flex flex-col space-y-3">
			{answers.map(({ id, content }, index) => (
				<li key={id} className="rounded-lg bg-background-dark">
					<input
						className="option"
						type="radio"
						name={questionContent || ""}
						id={id}
						onChange={e => handleChange(e, id)}
						hidden
					/>

					<label
						tabIndex={index + 1}
						htmlFor={id}
						className="block w-full py-2 h-[inherit] rounded-lg"
						onFocus={hoverOption}
					>
						{content}
					</label>
				</li>
			))}
		</ul>
	)
}