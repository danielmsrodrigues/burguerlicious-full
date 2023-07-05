import Navbar from "../../components/Navbar";

import {
  BestContainer,
  BestDescription,
  BestPrice,
  BestSeller,
  BestTitle,
  Content,
  Drinks,
  Image,
  ImageRight,
  Text,
  TextLeft,
  Title,
  Wrapper,
} from "./styles";

function Menu() {
  return (
    <>
      <Navbar />

      <Wrapper>
        <Title>
          <h2>Our Menu</h2>
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
        </Content>

        <Drinks>
          <h2>Appetizers</h2>
          <ul>
            <li>Chips - 3€</li>
            <li>Sauce - 1€</li>
          </ul>

          <h2>Drinks</h2>
          <ul>
            <li>Water - 1.5€</li>
            <li>Ice Tea - 2€</li>
            <li>Coca Cola - 2€</li>
          </ul>
        </Drinks>
      </Wrapper>
    </>
  );
}

export default Menu;
