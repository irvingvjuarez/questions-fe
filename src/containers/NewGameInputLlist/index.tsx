import { Input } from "@app/components/Input"
import { NewGameInput } from "@app/types";
import { Fragment } from "react"

type NewGameInputListProps = {
	list: NewGameInput[];
	changeHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NewGameInputList: React.FC<NewGameInputListProps> = ({ list, changeHandler }) => {
	return (
		<Fragment>
			{list.map(input => (
				<Input
					key={input.name}
					ref={input.ref}
					name={input.name}
					handleChange={changeHandler}
				>
					{input.label}
				</Input>
			))}
		</Fragment>
	)
}