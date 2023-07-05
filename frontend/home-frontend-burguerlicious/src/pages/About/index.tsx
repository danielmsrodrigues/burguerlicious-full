import Navbar from "../../components/Navbar";
import {
  Body,
  Container,
  Content,
  Image,
  ImageWrapper,
  Title,
  Wrapper,
} from "./styles";

function About() {
  return (
    <>
      <Navbar />

      <Container>
        <Wrapper>
          <Title>About Us</Title>
          <ImageWrapper>
            <Image src="/assets/making-burger.jpg" />
          </ImageWrapper>
          <Content>
            <Body>
              We are a burger shop that has been established since 2023 that
              puts forward a unique but delicious concept in each of our dishes.
              We have used this concept since we first opened in Lisbon. Come
              visit us!
            </Body>
          </Content>
        </Wrapper>
      </Container>
    </>
  );
}

export default About;
