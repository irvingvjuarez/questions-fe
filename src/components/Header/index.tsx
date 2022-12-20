import { Link } from "react-router-dom"
import questionsLogo from "@app/assets/questions-logo-clear.png"

export const Header = () => {
	return (
		<header className="w-full mb-5">
			<Link to="/">
				<img className="m-auto" width={205} src={questionsLogo} alt="logo" />
			</Link>
		</header>
	)
}