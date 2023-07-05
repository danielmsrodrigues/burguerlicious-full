import {
  BestContainer,
  BestDescription,
  BestPrice,
  BestSeller,
  BestTitle,
  Button,
  ButtonContainer,
  Content,
  Image,
  ImageRight,
  Menu,
  Text,
  TextLeft,
  Title,
  Wrapper,
} from "./styles";

function Best() {
  return (
    <>
      <Wrapper>
        <Title>
          <h2>Our Best Sellers</h2>
        </Title>
        <Content>
          <BestContainer>
            <Image src="\assets\burger-01.png" alt="Jack'O Burger" />
            <Text>
              <BestTitle>
                Jack'O Burger &nbsp;<BestSeller>Best Seller</BestSeller>
              </BestTitle>
              <BestDescription>
                Beef burger with melted cheese, crispy bacon, pickles and
                tomato. Makes your taste buds taste what a real delicious burger
                tastes like
              </BestDescription>
              <BestPrice>9€</BestPrice>
            </Text>
          </BestContainer>
          <BestContainer>
            <ImageRight src="\assets\burger-02.png" alt="Popeye's Burger" />
            <TextLeft>
              <BestTitle>Popeye</BestTitle>
              <BestDescription>
                Burger with delicious homemade pickles, onion, lettuce and
                tomato...This is what you need to make your taste buds stronger
              </BestDescription>
              <BestPrice>8€</BestPrice>
            </TextLeft>
          </BestContainer>
          <BestContainer>
            <Image src="\assets\burger-03.png" alt="O'Cheese Burger" />
            <Text>
              <BestTitle>O'Cheese</BestTitle>
              <BestDescription>
                Burger filled with melted cheese, tomato and coriander. It will
                make you forget all your problems...at least for 5 minutes
              </BestDescription>
              <BestPrice>6€</BestPrice>
            </Text>
          </BestContainer>
          <ButtonContainer>
            <Button>
              <Menu to="/menu">See Others</Menu>
            </Button>
          </ButtonContainer>
        </Content>
      </Wrapper>
    </>
  );
}

export default Best;
