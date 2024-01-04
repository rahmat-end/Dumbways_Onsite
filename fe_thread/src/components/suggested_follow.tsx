import { API } from '@/libs/api'
import { Box, Flex, Spacer, Text, Button, Image } from '@chakra-ui/react'
// import React from 'react'
import { IFollow } from '@/type/follow'

export default function SuggestedFollow(props: IFollow) {
    const session = JSON.parse(localStorage.user)
    // const [follow, setFollow] = React.useState<IFollowPost>({
    //     followerId: session.id,
    //     followedId: 0
    // })

    // function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     setFollow({
    //       ...follow,
    //       [e.target.name]: e.target.value
    //     })
    // }
    
    async function addFollow() {
        try {
            const response = await API.post(`/addFollow/${session.id}/${props.id}`)
            console.log(response.data)
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <Flex alignItems='center' mb='5px'>
            <Flex alignItems='center'>
                <Image src={`${props.profile_picture}`} w='35px' h='35px' borderRadius='50%' border='2px solid black' objectFit='cover'/>
                <Box ml='5px'>
                    <Text fontSize='sm' color='white'>{props.fullname}</Text>
                    <Text fontSize='xs' color='gray'>@{props.username}</Text>
                </Box>
            </Flex>
            <Spacer />
            <Button onClick={addFollow} colorScheme='teal' variant='link' color='white' textDecoration='none' fontSize='12px' border='1px solid white' borderRadius='15px' padding='5px 10px'>Follow</Button>
        </Flex>
    )
}