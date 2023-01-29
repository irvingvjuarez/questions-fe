import right from "@app/assets/right.png"
import wrong from "@app/assets/wrong.png"
import { useUserResults } from "@app/hooks/useUserResults"

export const UserResults = () => {
	const { isUserRight, userData } = useUserResults()

	return(
		<section className="page-container h-[70vh] flex flex-col justify-between">
			<h2 className="subtitle font-bold text-xl tracking-wider">
				You got it {isUserRight ? "right" : "wrong"}
			</h2>

			<div className="w-full grid place-content-center">
				<img
					className="block w-[150px]"
					src={isUserRight ? right : wrong}
					alt="User Result"
				/>
			</div>

			<p>
				Current points:

				<span className="highlighted">
					{userData?.userScore || 0}
				</span>
			</p>
		</section>
	)
}