import { Link } from "react-router-dom";

type ButtonProps = {
	children: string;
	linkUrl?: string;
	containerCss?: string;
	variant?: "standard" | "active" | "inactive"
}

const baseCss = "rounded-lg py-2"

export const Button: React.FC<ButtonProps> = ({ children, linkUrl, variant, containerCss }) => {
	let complementaryCss = ""

	switch(variant) {
		case "standard":
			complementaryCss += "text-white font-medium text-lg bg-logo-clear w-[261px]"
		break;
		case "active":
			complementaryCss += "text-background-dark font-bold text-xl bg-logo-clear w-input"
		break;
		case "inactive":
			complementaryCss += "text-white border-logo-clear border-2 font-bold w-input"
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