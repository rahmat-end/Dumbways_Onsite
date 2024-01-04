import { API } from '../../../libs/api'
import { IThreadCard } from '../../../type/thread'
import { Box, Flex, Text, Button, Link, Image } from '@chakra-ui/react'
import React from 'react'
import { RiHeart3Line, RiHeartFill, RiReplyLine } from "react-icons/ri"

export function ThreadCard(props: IThreadCard) {
    const [likes, setLikes] = React.useState<number>(0)
    const [userLikes, setUserLikes] = React.useState<number>(0)
    const [replies, setReplies] = React.useState<number>(0)
    const [userReplies, setUserReplies] = React.useState<number>(0)
    const session = JSON.parse(localStorage.user)

    async function countLikes() {
        try {
            const response = await API.get(`/countLikes/${props.id}`)
            console.log(response.data)
            setLikes(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }
    async function countReplies() {
        try {
            const response = await API.get(`/countReplies/${props.id}`)
            console.log(response.data)
            setReplies(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }
    async function checkUserLikes() {
        try {
            const response = await API.get(`/checkUserLikes/${session.id}/${props.id}`)
            console.log(response.data)
            setUserLikes(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }
    async function checkUserReplies() {
        try {
            const response = await API.get(`/checkUserReplies/1/${props.id}`)
            console.log(response.data)
            setUserReplies(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }
    async function addLikes() {
        try {
            const response = await API.post(`/addLike/${session.id}/${props.id}`)
            console.log(response.data)
        } catch(err) {
            console.log(err)
        }
    }
    async function deleteLikes() {
        try {
            const response = await API.delete(`/deleteLike/${session.id}/${props.id}`)
            console.log(response.data)
        } catch(err) {
            console.log(err)
        }
    }
    async function addReplies() {
        try {
            const response = await API.post(`/addReply/1/${props.id}`)
            console.log(response.data)
        } catch(err) {
            console.log(err)
        }
    }
    async function deleteReplies() {
        try {
            const response = await API.delete(`/deleteReply/1/${props.id}`)
            console.log(response.data)
        } catch(err) {
            console.log(err)
        }
    }

    React.useEffect(() => {
        countLikes()
        checkUserLikes()
        countReplies()
        checkUserReplies()
    }, [props.id,session])

    return (
        <>
            <Flex alignItems='flex-start' borderBottom='1px solid gray' mr='-20px' ml='-20px' padding='20px'>
                <Image src={`${props.author_picture}`} w='35px' h='35px' borderRadius='50%' border='2px solid black' objectFit='cover'/>
                <Box ml='5px'>
                    
                    <Box>
                        <Text as='b' fontWeight='normal' fontSize='sm' color='white'>{props.author_fullname}</Text>
                        <Text as='b' fontWeight='normal' fontSize='xs' color='gray'>&nbsp;{props.author_username} • {props.posted_at}</Text>
                    </Box>
                    <Image src={`${props.image}`} maxHeight='250px' maxWidth='100%' margin='10px 0'/>
                    <Link href={`/detail_thread/${props.id}`} fontSize='12px' color='white' style={{textDecoration: 'none'}}>{props.content}</Link>
                    <Flex mt='10px'>
                        <Flex mr='15px'>
                            {userLikes ?  
                            <>
                                <Button onClick={deleteLikes} style={{backgroundColor: 'transparent', padding: '0', height: 'auto'}}>
                                    <RiHeartFill color='red' />
                                </Button>
                                <Text fontSize='xs' ml='5px' color='gray'>{likes}</Text>
                            </>
                            :
                            <>
                                <Button onClick={addLikes} style={{backgroundColor: 'transparent', padding: '0', height: 'auto'}}>
                                    <RiHeart3Line color='white' />
                                </Button>
                                <Text fontSize='xs' ml='5px' color='gray'>{likes}</Text>
                            </>
                            }

                        </Flex>
                        <Flex>
                            {userReplies ?
                            <>
                                <Button onClick={deleteReplies} style={{backgroundColor: 'transparent', padding: '0', height: 'auto'}}>
                                    <RiReplyLine color='red' />
                                </Button>
                                <Text fontSize='xs' ml='5px' color='gray'>{replies} replies</Text>
                            </>
                            :
                            <>
                                <Button onClick={addReplies} style={{backgroundColor: 'transparent', padding: '0', height: 'auto'}}>
                                    <RiReplyLine color='white' />
                                </Button>
                                <Text fontSize='xs' ml='5px' color='gray'>{replies} replies</Text>
                            </>
                            }
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    )
}