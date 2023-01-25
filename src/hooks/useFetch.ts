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

	return ({endpoint, config, callback}: UseFetch) => {
		questionsDispatch({ type: Q_TYPES.setLoading })

		fetch(endpoint, config ?? undefined)
			.then(res => {
				if(!res.ok) throw new Error()
				return res.json()
			}).then(data => {
				callback(data)
			})
	}
}