import { Answer } from "@app/types";

type PossibleCorrectAnswersProps = {
	answers: Answer[];
	handleChange: (evt: React.ChangeEvent<HTMLInputElement>, id: string) => void;
	questionContent: string | null;
}