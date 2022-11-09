export type Posts = {
    id: string,
    name: string,
    email: string,
    phone: string,
    title: string,
    address: string,
    benefits: Array<string>,
    createdAt: string,
    updatedAt: string,
    description: string,
    employment_type: Array<string>,
    location: {
        lat: number,
        long: number,
    },
    pictures: Array<string>,
    salary: string
    selected?: boolean
}