import { Link } from "react-router-dom"

export const Header = () => {
	return (
		<header className="w-full mb-5">
			<Link to="/">
				<img className="m-auto" width={205} src="src/assets/questions-logo-clear.png" alt="logo" />
			</Link>
		</header>
	)
}