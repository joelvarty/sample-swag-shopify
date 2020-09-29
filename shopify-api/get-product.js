import axios from "axios"

const getProduct = async (productID) => {


	try {


		//list products..
		const gq = JSON.stringify({
			query: `
			{ product(id:"${productID}") {
				id
				title
				featuredImage {
					transformedSrc(maxWidth:800)
				}
				onlineStorePreviewUrl
					totalInventory
					variants(first:1) {
					edges {
						node {
							id
							price
							compareAtPrice
						}
					}
				}
			}  }`
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

		return axiosRes.data.data.product

	} catch (e) {

		throw new Error("Could not access the product " + e)

	}
}

export default getProduct