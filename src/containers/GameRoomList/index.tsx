import { User } from "@app/types"

type GameRoomListProps = {
	list: User[]
}

export const GameRoomList: React.FC<GameRoomListProps> = ({ list }) => {
	return (
		<div className="w-full flex h-[inherit] py-2 space-x-1">
			{list.map(user => (
				<span
					key={user.nickname}
					className="bg-white text-background-dark font-semibold p-1 rounded-xl h-fit"
				>
					{user.nickname}
				</span>
			))}
		</div>
	)
}