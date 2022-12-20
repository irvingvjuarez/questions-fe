import { Link } from "react-router-dom";

type ButtonProps = {
	children: string;
	linkUrl?: string;
	containerCss?: string;
	variant?: "standard" | "active" | "inactive"
}

const baseCss = "text-white rounded-lg py-2"

export const Button: React.FC<ButtonProps> = ({ children, linkUrl, variant, containerCss }) => {
	let complementaryCss = ""

	switch(variant) {
		case "standard":
			complementaryCss += "font-medium text-lg bg-logo-clear w-[261px]"
		break;
		case "active":
		break;
		case "inactive":
		break;
		default:
		break;
	}

	const finalStyles = `${baseCss} ${complementaryCss} ${containerCss}`

	if (linkUrl) {
		return (
			<Link to={linkUrl} className={finalStyles}>
				{children}
			</Link>
		)
	}

	return (
		<button className={finalStyles}>
			{children}
		</button>
	)
}