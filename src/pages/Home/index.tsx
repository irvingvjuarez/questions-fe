import { Header } from "@app/components/Header"
import { ButtonsContainer } from "@app/containers/ButtonsContainer"
import { Button } from "@app/components/Button"

export const Home = () => {
	return (
		<>
			<Header />

			<main className="h-[76vh] flex flex-col justify-between">
				<h3 className="text-white tracking-wide text-lg">
					Create questionnaries easily, quickly and for free.
				</h3>

				<ButtonsContainer>
					<Button>
						Create New Game Room
					</Button>

					<Button>
						Enter Game Code
					</Button>
				</ButtonsContainer>
			</main>
		</>
	)
}