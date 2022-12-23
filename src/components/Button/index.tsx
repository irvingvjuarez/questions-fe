import { Link } from "react-router-dom";
import { getStyles } from "./services/getStyles";

type ButtonProps = {
	children: string;
	linkUrl?: string;
	containerCss?: string;
	variant?: "standard" | "active" | "inactive";
	disabled?: boolean;
	handleClick?: (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
	const { children, linkUrl, variant, containerCss, disabled = false, handleClick } = props
	const containerStyles = getStyles(variant, containerCss)

	if (linkUrl) return (
		<Link to={linkUrl} className={containerStyles}>
			{children}
		</Link>
	)

	return (
		<button onClick={handleClick} className={containerStyles} disabled={disabled}>
			{children}
		</button>
	)
}