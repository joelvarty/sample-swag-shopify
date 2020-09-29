
import Feature from "../features/TwoColSingleFeatureWithStats2"
import getProduct from "../../shopify-api/get-product"

const FeaturedProduct = ({  customData}) => {

	console.log(customData)


	return (


		<Feature { ...customData }/>


	)
}


FeaturedProduct.getCustomInitialProps = async function ({item, agility, languageCode, channelName, pageInSitemap, dynamicPageItem}) {

	const api = agility;

	try {

		//get the product id from the Agility item
		const productStub = JSON.parse(item.fields.product)

		//pull the actual product from Shopify...
		const product = await getProduct(productStub.id)


		return  {

			heading: item.fields.header,
			subheading:  item.fields.subHeading,
			description: item.fields.description,
			primaryButtonText:item.fields.buyNowText,
			primaryButtonUrl: product.onlineStorePreviewUrl,
			imageSrc: product.featuredImage.transformedSrc,
			statistics: [
				{
				  key: product.title,
				  value: `$${ product.variants.edges[0].node.price}`
				},
				{
					key: "Compare At",
					value: `$${ product.variants.edges[0].node.compareAtPrice}`
				},
				{
					key: "In Stock",
					value: product.totalInventory
				  }
			]

		}

	} catch (error) {
		if (console) console.error(error);
	}
}

export default FeaturedProduct