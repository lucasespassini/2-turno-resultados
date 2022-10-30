import { Avatar, CircularProgress, CircularProgressLabel, Flex, Text } from "@chakra-ui/react"
import { useEffect } from "react"

export const Canditado = ({ nome, porc, votos, partido, num, sqcand }) => {
  useEffect(() => {

  }, [])

  return (
    <Flex
      mb={5}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex alignItems="center" gap={2}>
        <CircularProgress
          size={20}
          value={porc.split(',')[0]}
          color='green.400'
        >
          <CircularProgressLabel>
            <Avatar
              size="lg"
              src={`https://resultados.tse.jus.br/oficial/ele2022/545/fotos/br/${sqcand}.jpeg`}
            />
          </CircularProgressLabel>
        </CircularProgress>

        <Flex flexDir="column">
          <Text as="small" fontWeight="600">{partido} - {num}</Text>
          <Text fontWeight="700">{nome}</Text>
        </Flex>
      </Flex>
      <Flex flexDir="column">
        <Text fontWeight="600">{votos} votos</Text>
        <Text fontWeight="600">{porc}%</Text>
      </Flex>
    </Flex>
  )
}