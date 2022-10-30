import { RepeatIcon } from "@chakra-ui/icons"
import { Avatar, CircularProgress, CircularProgressLabel, Container, Flex, IconButton, keyframes, Text, usePrefersReducedMotion } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Canditado } from "../../components/candidato"

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const Home = () => {
  const [dados, setDados] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [deuErro, setDeuErro] = useState(false)
  const [recarregar, setRecarregar] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 1s linear`

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const { data } = await axios.get('https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json')
        setDados(data)
        setIsLoading(false)
        setRecarregar(false)
        setDeuErro(false)
      } catch (error) {
        console.log(error)
        setDeuErro(true)
      }
    })()
  }, [recarregar])

  return (
    <>
      {deuErro && !isLoading
        ? <Text>Ocorreu um erro</Text>
        : <Container h="65vh">
          <Flex my={5} alignItems="center" flexDir="column" gap={2}>
            <Text fontWeight="600">
              Última atualização {dados.hg}
            </Text>
            <Text fontWeight="600">
              Votos Totais: {Number(dados?.tv).toLocaleString('pt-BR')}
            </Text>
            <Text fontWeight="600">
              Urnas apuradas: {dados?.pst}%
            </Text>
          </Flex>
          {dados?.cand?.map(candidato => (
            <Canditado
              key={candidato.seq}
              nome={candidato.nm}
              num={candidato.n}
              partido={candidato.cc.split(' ')[0]}
              porc={candidato.pvap}
              votos={candidato.vap}
              sqcand={candidato.sqcand}
            />
          ))}
          <Flex
            mb={5}
            justifyContent="space-between"
            alignItems="center"
          >
            <Flex alignItems="center" gap={2}>
              <CircularProgress
                size={20}
                value={
                  Number(dados?.pvan?.split(',')[0]) +
                  Number(dados?.ptvn?.split(',')[0]) +
                  Number(dados?.pvb?.split(',')[0])
                }
                color='blue.500'
              />
            </Flex>
            <Flex flexDir="column">
              <Text as="small" fontWeight="600">
                Anulados: {Number(dados.van).toLocaleString('pt-BR')} -{' '}
                {dados.pvan}%
              </Text>
              <Text as="small" fontWeight="600">
                Nulos: {Number(dados.tvn).toLocaleString('pt-BR')} -{' '}
                {dados.ptvn}%
              </Text>
              <Text as="small" fontWeight="600">
                Brancos: {Number(dados.vb).toLocaleString('pt-BR')} -{' '}
                {dados.pvb}%
              </Text>
            </Flex>
          </Flex>
          <IconButton
            colorScheme="facebook"
            size="lg"
            position="absolute"
            bottom={2}
            right={5}
            animation={isLoading && animation}
            onClick={() => !isLoading && setRecarregar(true)}
            borderRadius={999}
            icon={<RepeatIcon />}
          />
        </Container>}
    </>
  )
}