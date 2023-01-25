import { Loader } from "@app/components/Loader"
import { questionsContext } from "@app/contexts/questions.context"
import { Questions } from "@app/types"
import { Fragment, useContext } from "react"

export const LoaderFallback: React.FC<LoaderFallbackProps> = ({ children }) => {
	const { loading } = useContext(questionsContext) as Questions

	if (loading) return (
		<div className="w-f my-4">
			<Loader />
		</div>
	)

	return <Fragment>{children}</Fragment>
}