import { useEffect, useState } from "react"

export const useKeypress = () => {
	const [hoveredOption, setHoveredOption] = useState<null | string>(null)

	const hoverOption = (evt: React.FocusEvent<HTMLLabelElement, Element>) => {
		const optionId = evt.target.htmlFor
		setHoveredOption(optionId)
	}

	const chooseKeyboardController = (evt: KeyboardEvent) => {
		const keyboardKey = evt.key

		if (keyboardKey == "Enter" || keyboardKey == " ") {
			if (hoveredOption) {
				const allLabels = [...document.querySelectorAll("label")]
				const hoveredLabel = allLabels.find(label => label.htmlFor == hoveredOption)

				hoveredLabel?.click();
				setHoveredOption(null)
			}
		}
	}

	useEffect(() => {
		document.addEventListener("keypress", chooseKeyboardController);

		return () => document.removeEventListener("keypress", chooseKeyboardController);
	}, [])

	return { hoverOption }
}