import {
	Box,
	Button,
	Heading,
	HStack,
	Image,
	Text,
	useColorModeValue,

} from "@chakra-ui/react";
import { IoBagAddOutline } from "react-icons/io5";
const ProductCard = ({ product }) => {

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
	
	return (
		<Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					€{product.price}
				</Text>
				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					{product.description}
				</Text>		  
				<HStack spacing={2}>
          <Button colorScheme='blue'>
            <IoBagAddOutline fontSize={20} />
          </Button>
			</HStack>
			</Box>


		</Box>
	);
};
export default ProductCard;