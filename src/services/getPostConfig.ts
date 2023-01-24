export const getPostConfig = (data?: Object) => {
	return {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		method: "POST",
		body: data ? JSON.stringify(data) : null
	}
}