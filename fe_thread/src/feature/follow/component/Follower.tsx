import { Box, Flex, Spacer, Text, Button, Image } from '@chakra-ui/react'
import { IFollow } from '@/type/follow'

export function Follower(props: IFollow) {
    return(
        <Flex alignItems='center' margin='12px 0'>
            <Flex alignItems='center'>
                <Image src={`${props.profile_picture}`} w='35px' h='35px' borderRadius='50%' border='2px solid black' objectFit='cover'/>
                <Box ml='5px'>
                    <Text fontSize='sm' color='white'>{props.fullname}</Text>
                    <Text fontSize='xs' color='gray'>@{props.username}</Text>
                    <Text fontSize='xs' color='white'>{props.profile_description}</Text>
                </Box>
            </Flex>
            <Spacer />
            <Button colorScheme='teal' variant='link' color='white' textDecoration='none' fontSize='12px' border='1px solid white' borderRadius='15px' padding='5px 10px'>Follow</Button>
        </Flex>
    )
}