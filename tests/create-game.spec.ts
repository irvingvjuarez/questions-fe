import { test, expect } from '@playwright/test';

const questions = [
	{
		content: "First question",
		options: [
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
	},
	{
		content: "Second question",
		options: [
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
	}
]

test.describe("Making sure the whole game process works fine", () => {
	let gameCode

	test("Making sure the game can be created", async ({ page }) => {
		await page.goto('/');
		await page.click("a[href='/game/new']")
		expect(page.url()).toMatch("game/new")

		const addOptionBtn = page.getByText("Add another answer option")
		expect(addOptionBtn).toBeDisabled()

		await page.waitForSelector("input[name='questionInput']")

		for(let questionIndex in questions) {
			const question = questions[questionIndex]

			await page.type("input[name='questionInput']", question.content)

			for(let index in question.options) {
				const option = question.options[index]

				await page.type(option.selector, option.content)
				await addOptionBtn.click()
			}

			const goBtn = page.getByText("GO!")
			await goBtn.click()

			await page.waitForSelector(".page-container > span.highlighted")
			expect(page.url()).toMatch("/options")

			const index = Number(questionIndex)

			if (index === 0) {
				const anotherQuestionBtn = page.getByText("Add another question")
				expect(anotherQuestionBtn).toBeDisabled()

				await page.click("label[tabindex='1']")
				await anotherQuestionBtn.click()

			} else if (index === 1) {
				const createGameBtn = page.getByText("Create Game")
				expect(createGameBtn).toBeDisabled()

				await page.click("label[tabindex='4']")
				await createGameBtn.click()

				await page.waitForSelector("span.highlighted")

				gameCode = await page.$eval("span.highlighted", (el) => el.textContent)
				console.log({ gameCode })

				expect(page.url()).toMatch("/room")
			}
		}


		// test.describe("Making sure the user is able to join the game", () => {
		// 	test("Entering the correct game code", async ({ page }) => {
		// 		await page.goto("/game/code")
		// 		const btn = page.getByText("Enter to the Game!")

		// 		expect(btn).toBeDisabled()

		// 		await page.type("input[type='number']", gameCode)
		// 		await page.type("input[type='text']", "Vladi")

		// 		expect(btn).not.toBeDisabled()
		// 	})
		// })

	})

})
