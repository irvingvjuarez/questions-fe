import { Fragment } from "react"

export const GameOverUser = () => {
	return (
		<Fragment>
			<h2 className="subtitle">
				Questionnaire finished
			</h2>

			<div>
				Results
			</div>

			<p>
				Total points: <span className="highlighted">1928</span>
			</p>
		</Fragment>
	)
}