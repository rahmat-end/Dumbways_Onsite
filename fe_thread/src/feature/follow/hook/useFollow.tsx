import { API } from "@/libs/api"
import SuggestedFollow from "@/components/suggested_follow"
import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export default function UseFollow() {
    const [suggestion, setSuggestion] = React.useState<[] | null>([])
    const session = JSON.parse(localStorage.user)

    async function getSuggestion() {
        try {
          const response = await API.get(`/suggestion/${session.id}`)
          setSuggestion(response.data.data)
        } catch(err) {
          console.log(err)
        }
    }

    React.useEffect(() => {
        getSuggestion()
    }, [session])
    
    return(
      <Box bg='#262626' borderRadius='15px' padding='15px' mb='15px'>
        <Text fontSize='sm' color='white' fontWeight='bold' mb='10px'>Suggested for you</Text>
        { suggestion && (suggestion.map((data: any) => (
          <SuggestedFollow 
              key={data.id}
              id={data.id}
              fullname={data.fullname}
              username={data.username}
              profile_picture={data.profile_picture}
              profile_description={data.profile_description}
          />
        ))) }
      </Box>
    )
}