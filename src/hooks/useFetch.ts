import { questionsContext } from "@app/contexts/questions.context";
import { Q_TYPES } from "@app/globals";
import { PostConfig, Questions } from "@app/types";
import { useContext } from "react";

export type UseFetch = {
	endpoint: string;
	config?: PostConfig;
	callback(data: any): void
}

export const useFetch = (): (props: UseFetch) => void => {
	const { questionsDispatch } = useContext(questionsContext) as Questions
	questionsDispatch({ type: Q_TYPES.setLoading })

	return async ({endpoint, config, callback}: UseFetch) => {
		const res = await fetch(endpoint, config ?? undefined)
		if (!res.ok) throw new Error()

		const data = await res.json()
		callback(data)
	}
}