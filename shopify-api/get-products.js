import axios from "axios"

const getProducts = async ({filter}) => {


	try {

		//list products..
		const gq = JSON.stringify({
			query: `
			{ products(first:50, query: "${filter}") {
				edges {
					node {
						id
						title
						featuredImage {
							transformedSrc(maxWidth:100)
						}
					}
				}
			}
			}`
		})

		const config = {
			method: 'post',
			url: 'https://agility-cms-swag-test.myshopify.com/admin/api/graphql.json',
			headers: {
				'Authorization': 'Basic MDQwOGFjY2IwNWU1YWM4YWIyYmZhOGFjNmUwNGE2OTg6c2hwcGFfMjdjN2Y4Y2UxMzVjNTdlZTg0NjQyMmM0NzBiOGQzNTM=',
				'Content-Type': 'application/json',
				'Cookie': '__cfduid=d355d3b58a8bcc815bc1913d64f9317f41601386988'
			},
			data: gq
		};

		const axiosRes = await axios(config)

		return axiosRes.data.data.products.edges

	} catch (e) {

		throw new Error("An error occurred getting the products " + e)

	}
}

export default getProducts