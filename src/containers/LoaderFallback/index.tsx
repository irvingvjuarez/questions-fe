import { Loader } from "@app/components/Loader"
import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { useContext } from "react"

export const LoaderFallback: React.FC<LoaderFallbackProps> = ({ children }) => {
	const { loading } = useContext(questionsContext) as Questions

	if (loading) return (
		<div className="w-full h-[60vh] grid place-content-center">
			<Loader />
		</div>
	)

	return (
		<section className="page-container">
			{children}
		</section>
	)
}