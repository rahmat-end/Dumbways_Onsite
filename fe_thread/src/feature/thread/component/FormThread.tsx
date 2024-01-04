// import { Flex, Circle, Textarea, Button, Image } from "@chakra-ui/react"
import { Button, Box, FormControl, FormLabel, Input } from "@chakra-ui/react"
// import { RiImageAddFill } from "react-icons/ri"

export default function FormThread() {
    return (
        // <Flex alignItems='center' mb='15px' borderBottom='1px solid gray' mr='-20px' ml='-20px' padding='20px'>
        //     <Flex alignItems='center' width='100%' >
        //         <Circle style={{width: '35px', height: '35px', marginRight: '15px'}}>
        //             <Image src='./public/profile.jpg' w='35px' h='35px' borderRadius='50%' border='2px solid black' objectFit='cover' />
        //         </Circle>
        //         <Textarea color='white' size='md' placeholder='What is happening?!' border='none' />
        //     </Flex>
        //     <Flex alignItems='center' marginLeft='15px'>
        //         <RiImageAddFill color='green' fontSize='27px' />
        //         <Button size='sm' colorScheme='green' borderRadius='50px' padding='0 20px' marginLeft='15px'>Post</Button>
        //     </Flex>
        // </Flex>
        <FormControl display={"flex"} flexDirection={"column"} gap={2} bg={"transparent"}  color={"white"}>
            <FormLabel>Content</FormLabel>
            <Input 
                placeholder="isikan apa yang kamu pikirkan..." 
                name="content" 
            />
            <Input 
                placeholder="image..." 
                name="image" 
            />
            <Box display={"flex"} justifyContent={"end"}>
                <Button 
                backgroundColor={"green"} 
                color={"white"} 
                colorScheme="green" 
                >
                Submit
                </Button>
            </Box>
        </FormControl>
    )
}