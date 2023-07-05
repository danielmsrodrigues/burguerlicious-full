import { Container, Image, SubTitle, Title, Wrapper } from "./styles";

function Hero() {
  return (
    <Container>
      <Wrapper>
        <div>
          <Title>Burgerlicious</Title>
          <SubTitle>Best burgers in town</SubTitle>
        </div>
        <Image src="\assets\burger.png" alt="Burger" />
      </Wrapper>
    </Container>
  );
}

export default Hero;
