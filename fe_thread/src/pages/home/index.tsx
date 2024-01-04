// import React from 'react'
// import { API } from '../../libs/api'
// import { IThreadCard } from '../../type/thread'
import { Box, Button, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react'
import Navbar from '../../components/navbar'
import Profile from '../../components/profile'
import UseFollow from '@/feature/follow/hook/useFollow'
import Footer from '../../components/footer'
// import FormThread from '../../feature/thread/component/FormThread'
// import ThreadCard from '../../thread/component/ThreadCard'
import { useThread } from '../../feature/thread/hook/useThread'
import { ThreadCard } from '../../feature/thread'
import { BiSolidImageAdd } from "react-icons/bi";

export default function Home() {
    const { form, threads, fileInputRef, handleChange, handleClickButton, handleSubmit} = useThread()
    // const [thread, setThread] = React.useState<IThreadCard[] | null>([])

    // async function getThread() {
    //     try {
    //         const response = await API.get('/threads')
    //         console.log(response.data)
    //         setThread(response.data.data)
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    // React.useEffect(() => {
    //     getThread()
    // }, [])

   return(
        <Flex>
            <Navbar />

            <Flex flexDirection='column' width='45vw' padding='20px' borderLeft='1px solid gray' borderRight='1px solid gray' borderBottom='1px solid gray' bg='#1D1D1D' zIndex='1'>
                <Text fontSize='lg' color='white' fontWeight='bold' mb='15px'>Home</Text>
                
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <FormControl 
                        display={"flex"} 
                        flexDirection={"column"} 
                        gap={2} 
                        bg={"transparent"}  
                        color={"white"}
                    >
                        <FormLabel>Content</FormLabel>
                        <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        >
                        <Input 
                            placeholder="isikan apa yang kamu pikirkan..." 
                            name="content" 
                            onChange={handleChange} 
                            value={form.content}
                        />
                        <Button
                            variant={"ghost"}
                            color={"brand.green"}
                            onClick={handleClickButton}
                        >
                            <BiSolidImageAdd
                            style={{
                                height: "50px",
                                width: "50px",
                            }}
                            />
                        </Button>
                        <Input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            style={{ display: "none" }}
                            ref={fileInputRef}
                        />

                        <Box display={"flex"} justifyContent={"end"}>
                            <Button 
                            backgroundColor={"green"} 
                            color={"white"} 
                            colorScheme="green" 
                            type="submit"
                            >
                            Submit
                            </Button>
                        </Box>
                        </Box>
                    </FormControl>
                </form>

                {/* <FormThread /> */}

                { threads && (threads.map((data: any) => (
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