import { API } from '@/libs/api'
import { Box, Flex, Spacer, Text, Link, Image } from '@chakra-ui/react'
import React from 'react'

interface User {
    fullname: string
    username: string
    profile_description: string
}

export default function Profile() {
    const session = JSON.parse(localStorage.user)
    const [user, setUser] = React.useState<User | null>(null)
    const [follower, setFollower] = React.useState<number>(0)
    const [followed, setFollowed] = React.useState<number>(0)

    async function getUser() {
        try {
            const response = await API.get(`/user/${session.id}`)
            console.log(response.data)
            setUser(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }
    async function getFollowerCounted() {
        try {
          const response = await API.get(`/followerCounted/${session.id}`)
          setFollower(response.data.data)
        } catch(err) {
          console.log(err)
        }
    }
    async function getFollowedCounted() {
        try {
          const response = await API.get(`/followedCounted/${session.id}`)
          setFollowed(response.data.data)
        } catch(err) {
          console.log(err)
        }
    }

    React.useEffect(() => {
        getUser()
        getFollowerCounted()
        getFollowedCounted()
    }, [session])

    return (
        <>
            <Box bg='#262626' borderRadius='15px' padding='15px' mb='15px'>
                <Text fontSize='sm' color='white' fontWeight='bold' mb='10px'>My Profile</Text>
                <Box 
                bgGradient={[
                    'linear(to-tr, teal.300, yellow.400)',
                    'linear(to-t, blue.200, teal.500)',
                    'linear(to-b, orange.100, purple.300)',
                ]}
                width='100%'
                height='70px'
                borderRadius='15px'
                mb='10px'>
                </Box>
                <Flex>
                    <Image src={session.profile_picture} w='60px' h='60px' borderRadius='50%' border='2px solid black' objectFit='cover' mt='-40px' ml='20px'/>
                    <Spacer />
                    <Link href='/edit_profile' colorScheme='teal' variant='link' color='white' textDecoration='none' fontSize='12px' border='1px solid white' borderRadius='15px' padding='5px 10px'>Edit Profile</Link>

                </Flex>
                <Text fontSize='lg' color='white' fontWeight='bold' mt='10px'>{user?.fullname}</Text>
                <Text fontSize='xs' color='gray'>@{user?.username}</Text>
                <Text fontSize='sm' color='white'>{user?.profile_description}</Text>
                <Text as='b' color='white' fontSize='14px'>{followed} </Text>
                <Text as='b' color='white' fontWeight='normal' fontSize='14px'>Following </Text>
                <Text as='b' color='white' fontSize='14px'>{follower} </Text>
                <Text as='b' color='white' fontWeight='normal' fontSize='14px'>Followers</Text>
            </Box>
        </>
    )
}