import { AUTH_LOGOUT } from '@/store/rootReducer'
import { Box, Flex, Text, Button, Link } from '@chakra-ui/react'
import { RiHome7Fill, RiLogoutBoxLine, RiProfileLine, RiUserFollowLine, RiUserSearchLine } from "react-icons/ri"
import { useDispatch } from 'react-redux'

export default function Navbar() {
    const dispatch = useDispatch()

    function logout() {
        dispatch(AUTH_LOGOUT())
        window.location.reload()
    }

    return (
        <Flex flexDirection='column' justifyContent='space-between' padding='30px' width='350px' height='100vh' bg='#1D1D1D' position='sticky' top='0'>
            <Box>
                <Text fontSize='4xl' color='green' fontWeight='bold'>Circle</Text>
                <Link href='/' style={{margin: '5px 0'}}>
                    <Flex alignItems='center'>
                        <RiHome7Fill style={{color: 'white', marginRight: '5px'}} />
                        <Text fontSize='md' color='white' fontWeight='bold'>Home</Text>
                    </Flex>
                </Link>
                <Link href='/search' style={{margin: '5px 0'}}>
                    <Flex alignItems='center'>
                        <RiUserSearchLine style={{color: 'white', marginRight: '5px'}} />
                        <Text fontSize='md' color='white' fontWeight='bold'>Search</Text>
                    </Flex>
                </Link>
                <Link href='/follow' style={{margin: '5px 0'}}>
                    <Flex alignItems='center'>
                        <RiUserFollowLine style={{color: 'white', marginRight: '5px'}} />
                        <Text fontSize='md' color='white' fontWeight='bold'>Follows</Text>
                    </Flex>
                </Link>
                <Link href='/edit_profile' style={{margin: '5px 0'}}>
                    <Flex alignItems='center'>
                        <RiProfileLine style={{color: 'white', marginRight: '5px'}} />
                        <Text fontSize='md' color='white' fontWeight='bold'>Profile</Text>
                    </Flex>
                </Link>
                <Button colorScheme='green' borderRadius='50px' margin='5px 0'>Create Post</Button>
            </Box>
            <Link onClick={logout}>
                <Flex alignItems='center'>
                    <RiLogoutBoxLine style={{color: 'white', marginRight: '5px'}} />
                    <Text fontSize='md' color='white' fontWeight='bold'>Logout</Text>
                </Flex>
            </Link>
        </Flex>
    )
}