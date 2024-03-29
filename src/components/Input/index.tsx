import React from "react"

type InputProps = {
	children: string;
	name?: string;
	handleChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void;
	type?: "text" | "number" | "radio" | "checkbox";
	placeholder?: string;
}

export const Input = React.forwardRef<HTMLInputElement | null, InputProps>((props, ref) => {
	const { children, name, handleChange, type = "text", placeholder = "" } = props;
	const inputID = children.split(" ").join("-")

	return (
		<div className="text-left tracking-wide text-lg flex flex-col space-y-1">
			<label className="text-white" htmlFor={inputID}>
				{children}
			</label>

			<input
				autoComplete="off"
				onChange={handleChange}
				name={name}
				ref={ref}
				type={type}
				id={inputID}
				placeholder={placeholder}
				className="w-full rounded-md p-1 bg-background border-2 border-white outline-none text-white"
			/>
		</div>
	)
})