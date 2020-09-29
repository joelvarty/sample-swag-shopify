import axios from "axios"

export default async (req, res) => {

	res.setHeader('Access-Control-Allow-Credentials', true)
	res.setHeader('Access-Control-Allow-Origin', '*')
	// another common pattern
	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	)
	if (req.method === 'OPTIONS') {
		res.status(200).end()
		return
	}


	try {
		const filter = req.query.filter ?? ""



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
		axiosRes.data

		res.statusCode = 200
		res.json(axiosRes.data.data.products.edges)

	} catch (e) {

		res.statusCode = 500
		res.json({ message: "An error occurred ", error: e })

	}
}
