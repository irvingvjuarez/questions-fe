import { Link } from "react-router-dom";
import { getStyles } from "./services/getStyles";

type ButtonProps = {
	children: string;
	linkUrl?: string;
	containerCss?: string;
	variant?: "standard" | "active" | "inactive";
	disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, linkUrl, variant, containerCss, disabled = false }) => {
	const containerStyles = getStyles(variant, containerCss)

	if (linkUrl) return (
		<Link to={linkUrl} className={containerStyles}>
			{children}
		</Link>
	)

	return (
		<button className={containerStyles} disabled={disabled}>
			{children}
		</button>
	)
}