export type Project = {
	name: string
	repo: string
	id: number
	info: string
	linkIds: number[]
}

export const allProjects: Project[] = [
	{
		id: 1,
		info: 'lla',
		name: 'p 1',
		repo: '12',
		linkIds: [3, 2],
	},
	{
		id: 3,
		info: 'lla',
		name: 'p 1',
		repo: '12',
		linkIds: [4],
	},
	{
		id: 2,
		info: 'lla',
		name: 'p 1',
		repo: '12',
		linkIds: [],
	},
	{
		id: 4,
		info: 'lla',
		name: 'p 1',
		repo: '12',
		linkIds: [2, 1],
	},
]
