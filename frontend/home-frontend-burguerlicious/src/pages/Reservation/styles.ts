import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 10rem);
  display: grid;
  grid-template-columns: 55% 45%;

  @media (width < 1280px) {
    grid-template-columns: 65% 35%;
  }
  @media (width < 1000px) {
    grid-template-columns: 75% 25%;
  }

  @media (width < 981px) {
    grid-template-columns: 85% 15%;
  }

  @media (width < 980px) {
    grid-template-columns: 99% 1%;
    height: 100vh;
  }

  @media (width < 690px) {
    margin: 0 2rem;
    height: 60rem;
  }
`;

export const ImageContainer = styled.div`
  display: grid;
  align-items: center;

  @media (width < 980px) {
    display: none;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const Welcome = styled.p`
  margin: 2rem 0 0;
  font-size: 2rem;

  @media (width < 690px) {
    font-size: 1.5rem;
  }
`;

export const Text = styled.div`
  margin: 3rem 0 2rem;
`;

export const Title = styled.h2`
  font-size: 3rem;

  @media (width < 690px) {
    font-size: 2rem;
  }
`;

export const SubTitle = styled.p`
  font-size: 1.5rem;
  color: #a4a4a4;
`;

export const Choose = styled.div`
  margin: 0 0 10rem;
`;

export const List = styled.div`
  width: 100%;
`;

export const ListWrapper = styled.div`
  display: grid;
  gap: 2px;
  grid-auto-flow: column;
  grid-auto-columns: 21%;

  overflow-x: auto;
  overscroll-behavior-inline: contain;

  @media (max-width: 760px) {
    grid-auto-columns: 30%;
  }
`;

export const Card = styled.div`
  display: inline-block;
  margin: 1rem;
  padding: 1rem;
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
`;

export const Cancel = styled.button`
  background-color: #eee;
  color: #bfbfbf;
  border: none;
  width: 4rem;
  height: 2rem;
  margin-top: 1rem;
  border-radius: 3.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.1s ease;

  &:hover {
    background-color: #c31e26;
    color: white;
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const Calendar = styled.input`
  padding: 0.5rem;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  margin-right: 1rem;

  ::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }

  ::-webkit-datetime-edit-day-field:focus,
  ::-webkit-datetime-edit-month-field:focus,
  ::-webkit-datetime-edit-year-field:focus {
    outline: none;
    background-color: #eee;
    color: black;
  }
`;

export const Time = styled.select`
  padding: 0.5rem;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  outline: none;
`;

export const Number = styled.input`
  padding: 0.5rem;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  margin: 0 1rem;
`;

export const Button = styled.button`
  display: inline-block;
  outline: 0;
  cursor: pointer;
  border: 1px solid black;
  padding: 0 1rem;
  height: 45px;
  line-height: 45px;
  border-radius: 7px;
  font-size: 16px;
  background: #fff;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  :hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 6px 20px rgb(93 93 93 / 23%);
  }
`;

export const ListText = styled.p`
  font-size: 1.5rem;
`;

export const Empty = styled.p`
  margin-top: 2rem;
  color: #999999;
  letter-spacing: 1px;
`;

export const Loader = styled.div`
  height: 100vh;
  width: 100%;
`;

export const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
