import React from 'react'
import { API } from '../../libs/api'
import { Flex, Text } from '@chakra-ui/react'
import Navbar from '../../components/navbar'
import Profile from '../../components/profile'
import UseFollow from '@/feature/follow/hook/useFollow'
import Footer from '../../components/footer'
import { ThreadCard } from '../../feature/thread'
import { IThreadCard } from '../../type/thread'
import { Link, useParams } from 'react-router-dom'
import { RiLogoutBoxLine } from 'react-icons/ri'

export default function DetailThread() {
    const [thread, setThread] = React.useState<IThreadCard[] | null>([])
    const { idThread } = useParams()

    async function getThread() {
        try {
            const response = await API.get(`/thread/${idThread}`)
            console.log(response.data)
            setThread(response.data.data)
        } catch(err) {
            console.log(err)
        }
    }
    
    React.useEffect(() => {
        getThread()
    }, [])

    return(
        <Flex>
            <Navbar />

            <Flex flexDirection='column' width='45vw' padding='20px' borderLeft='1px solid gray' borderRight='1px solid gray' borderBottom='1px solid gray' bg='#1D1D1D' zIndex='1'>
                <Link to='/'>
                    <Flex alignItems='center'>
                        <RiLogoutBoxLine style={{color: 'white', marginRight: '5px'}} />
                        <Text fontSize='md' color='white' fontWeight='bold'>Back</Text>
                    </Flex>
                </Link>
                { thread && (thread.map((data: any) => (
                    <ThreadCard 
                        key={data.id}
                        id={data.id}
                        author_picture={data.user.profile_picture}
                        author_fullname={data.user.fullname}
                        author_username={data.user.username}
                        content={data.content}
                        image={data.image}
                        posted_at={data.created_at}
                    />
                ))) }
                </Flex>
            
            <Flex padding='30px' width='450px' height='100vh' flexDirection='column' bg='#1D1D1D' position='sticky' top='0'>
                <Profile />
                <UseFollow/>
                <Footer />
            </Flex>
        </Flex>
    )
}