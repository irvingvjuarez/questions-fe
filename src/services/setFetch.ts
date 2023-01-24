import { PostConfig } from "@app/types";

export type SetFetch = {
	endpoint: string;
	config?: PostConfig;
	callback(data: any): void
}

export const setFetch = async ({endpoint, config, callback}: SetFetch) => {
	const res = await fetch(endpoint, config ?? undefined)
	if (!res.ok) throw new Error()

	const data = await res.json()
	callback(data)
}