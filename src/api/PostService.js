import axios from 'axios'

export class PostService {
    static #url = 'https://jsonplaceholder.typicode.com/posts'

    static async getAll(limit = 30, page = 1) {
        const response = await axios.get(this.#url, {
            params: {
                _limit: limit,
                _page: page,
            },
        })

        return response.data
    }
}
