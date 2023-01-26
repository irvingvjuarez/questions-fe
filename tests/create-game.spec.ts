import { test, expect } from '@playwright/test';

const answerOptions = [
	{
		content: "A",
		selector: "input[name='answerInput']"
	},
	{
		content: "B",
		selector: "input[name='answer2']"
	},
	{
		content: "C",
		selector: "input[name='answer3']"
	},
	{
		content: "D",
		selector: "input[name='answer4']"
	}
]

test("Making sure the game can be created", async ({ page }) => {
	await page.goto('/');
	await page.click("a[href='/game/new']")
	expect(page.url()).toMatch("game/new")

	const addOptionBtn = page.getByText("Add another answer option")
	expect(addOptionBtn).toBeDisabled()

	await page.waitForSelector("input[name='questionInput']")

	await page.type("input[name='questionInput']", "First question")

	for(let index in answerOptions) {
		const option = answerOptions[index]
		await page.type(option.selector, option.content)
		await addOptionBtn.click()
	}

	const goBtn = page.getByText("GO!")
	await goBtn.click()

	await page.waitForSelector(".page-container > span.highlighted")
	expect(page.url()).toMatch("/options")
})
