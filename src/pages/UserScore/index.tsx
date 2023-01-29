import { useUserScore } from "@app/hooks/useUserScore"

export const UserScore = () => {
	const { answeredQuestion } = useUserScore()

	return (
		<section className="page-container flex flex-col h-[70vh] justify-between">
			<h2 className="subtitle">
				You Chose
			</h2>

			<div className={`w-[90%] max-w-[200px] mx-auto grid place-content-center rounded-lg py-4 option-${answeredQuestion?.optionIndex}`}>
				<img className="w-[115px]" src={answeredQuestion?.optionImg} alt="" />
			</div>

			<span className="subtitle">
				Waiting the other game members to answer...
			</span>
		</section>
	)
}