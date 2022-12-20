const baseCss = "rounded-lg py-2"

export const getStyles = (variant: string = "", containerCss?: string) => {
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

	return finalStyles
}