import { PostConfig } from "@app/types"

export const getPostConfig = (data?: Object): PostConfig => {
	return {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: "POST",
		body: data ? JSON.stringify(data) : null
	}
}