export const getTotalPages = (countries, limit) => {
    return Math.ceil(countries.length / limit)
}