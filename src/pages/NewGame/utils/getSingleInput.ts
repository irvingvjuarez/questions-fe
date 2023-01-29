import { NewGameInput } from "@app/types"
import React from "react"

export const getSingleInput = (inputNumber: number): NewGameInput => {
	return {
		label: "",
		ref: React.createRef<HTMLInputElement | null>(),
		name: "answer" + inputNumber,
		value: ""
	}
}