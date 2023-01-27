import { test, expect, Browser, Page } from '@playwright/test';
import { chromium } from "@playwright/test"

const users: any[] = []
let gameCode, adminPage, userPage, user2Page, startGameBtn

const browsers: Array<{name: string; browser: Browser | undefined; page: Page | undefined}> = [{
		name: "admin", browser: undefined, page: undefined
	},
	{
		name: "user", browser: undefined, page: undefined
	},
	{
		name: "user2", browser: undefined, page: undefined
}]

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

test.beforeAll(async () => {
	for(let item of browsers) {
		item.browser = await chromium.launch()
		item.page = await item.browser.newPage()
	}

	adminPage = browsers[0].page as Page
	userPage = browsers[1].page as Page
	user2Page = browsers[2].page as Page

	users.push(
		{
			page: userPage,
			name: "Timon"
		}, {
			page: user2Page,
			name: "Pumba"
		}
	)
})

test.afterAll(() => {
	for(let item of browsers) {
		(item.browser as Browser).close()
	}
})

test.describe("Making sure the whole game process works fine", () => {

	test("Making sure the game can be created", async () => {
		await adminPage.goto('/');
		await adminPage.click("a[href='/game/new']")
		expect(adminPage.url()).toMatch("game/new")

		const addOptionBtn = adminPage.getByText("Add another answer option")
		expect(addOptionBtn).toBeDisabled()

		await adminPage.waitForSelector("input[name='questionInput']")

		for(let questionIndex in questions) {
			const question = questions[questionIndex]

			await adminPage.type("input[name='questionInput']", question.content)

			for(let index in question.options) {
				const option = question.options[index]

				await adminPage.type(option.selector, option.content)
				await addOptionBtn.click()
			}

			const goBtn = adminPage.getByText("GO!")
			await goBtn.click()

			await adminPage.waitForSelector(".page-container > span.highlighted")
			expect(adminPage.url()).toMatch("/options")

			const index = Number(questionIndex)

			if (index === 0) {
				const anotherQuestionBtn = adminPage.getByText("Add another question")
				expect(anotherQuestionBtn).toBeDisabled()

				await adminPage.click("label[tabindex='1']")
				await anotherQuestionBtn.click()

			} else if (index === 1) {
				const createGameBtn = adminPage.getByText("Create Game")
				expect(createGameBtn).toBeDisabled()

				await adminPage.click("label[tabindex='4']")
				await createGameBtn.click()

				await adminPage.waitForTimeout(1000)
				await adminPage.waitForSelector("span.highlighted")
				gameCode = await adminPage.$eval("span.highlighted", (el) => el.textContent)

				expect(adminPage.url()).toMatch("/room")

				startGameBtn = adminPage.getByText("Start Game!")
				expect(startGameBtn).toBeDisabled()
			}
		}

		// Users entering into the game
		for(let userIndex in users) {
			const currentUser = users[userIndex]
			const currentPage = currentUser.page

			await currentPage.goto("/game/code")
			const enterGameBtn = currentPage.locator("button")

			await currentPage.type("input[type='number']", gameCode)
			await currentPage.type("input[type='text']", currentUser.name)

			expect(enterGameBtn).not.toBeDisabled()
			await enterGameBtn.click()

			await currentPage.waitForSelector("h2.subtitle")
			const character = currentPage.getByText(currentUser.name + " (You)")
			expect(character).toBeVisible()
		}

		expect(startGameBtn).not.toBeDisabled()

		// Making sure the admin can see all the users in the waiting room
		for(let user of users) {
			expect(adminPage.getByText(user.name)).toBeVisible()
		}
	})

})
