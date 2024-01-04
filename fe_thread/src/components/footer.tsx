import { Box, Text, Link, Image } from '@chakra-ui/react'
import { RiFacebookCircleFill, RiGithubFill, RiInstagramFill, RiLinkedinBoxFill } from "react-icons/ri"

export default function Footer() {
    return (
        <Box bg='#262626' borderRadius='15px' padding='15px' mb='15px'>
            <Text as='b' fontSize='sm' color='white' fontWeight='normal' display='flex' alignItems='center'>Developed by <span style={{fontWeight: 'bold'}}>&nbsp; Rahmat Kurniawan •</span>
                <Link href='#' margin='0 3px' fontSize='20px' isExternal><RiGithubFill /></Link>
                <Link href='#' margin='0 3px' fontSize='20px' isExternal><RiLinkedinBoxFill /></Link>
                <Link href='#' margin='0 3px' fontSize='20px' isExternal><RiFacebookCircleFill /></Link>
                <Link href='#' margin='0 3px' fontSize='20px' isExternal><RiInstagramFill /></Link>
            </Text>
            <Text fontSize='xs' color='gray' mt='3px'>Powered by <Image src='/dw-favicon-final.png' alt='Dumbways Favicon' width='20px' display='inline-block' /> DumbWays Indonesia • #1 Coding Bootcamp</Text>
        </Box>
    )
}