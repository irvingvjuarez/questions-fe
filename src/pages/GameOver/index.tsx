import { useErrorValidation } from "@app/hooks/useErrorValidation"
import { useEffect } from "react"

export const GameOver = () => {
	const validation = useErrorValidation()

	useEffect(() => {
		validation()
	}, [])

	return (
		<section className="page-container">
			<h2>I am the Game Over page</h2>
		</section>
	)
}