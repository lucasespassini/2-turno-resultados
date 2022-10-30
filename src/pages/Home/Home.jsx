import { RepeatIcon } from "@chakra-ui/icons"
import { Container, IconButton, keyframes, Text, usePrefersReducedMotion } from "@chakra-ui/react"
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
        console.log(data)
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
        : <Container h="60vh">
          <Text my={7} align="center" fontWeight="600">
            Última atualização {dados.hg}
          </Text>
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
          <IconButton
            colorScheme="facebook"
            size="lg"
            position="absolute"
            bottom={2}
            right={5}
            animation={isLoading && animation}
            onClick={() => setRecarregar(true)}
            borderRadius={999}
            icon={<RepeatIcon />}
          />
        </Container>}
    </>
  )
}