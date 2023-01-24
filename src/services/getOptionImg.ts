import option0 from "@app/assets/option-0.png"
import option1 from "@app/assets/option-1.png"
import option2 from "@app/assets/option-2.png"
import option3 from "@app/assets/option-3.png"

export const getOptionImg = (numberId: number) => {
	switch (numberId) {
		case 0: return option0
		case 1: return option1
		case 2: return option2
		case 3: return option3
	}
}