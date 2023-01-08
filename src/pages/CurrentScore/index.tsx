import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { useEffect } from "react"

export const CurrentScore = () => {
	const validation = useErrorValidation()

	useEffect(() => {
		validation()
	}, [])

	return (
		<section className="page-container">
			<h2>Hi</h2>
		</section>
	)
}