import React from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import { BsJustify, BsFillPeopleFill, BsFillTagsFill } from 'react-icons/bs';

interface Props {
  onClick?: () => void;
}

const Header = (props: Props) => {
  const { onClick } = props;
  return (
    <Container fluid>
      <Stack style={{ backgroundColor: '#323259' }} direction="horizontal">
        <Button variant="outline-light" style={{ margin: 10 }} onClick={onClick}>
          <BsJustify color="#b4b4db" />
        </Button>
        <h1 className="navbar-brand " style={{ color: '#fff' }}>
          Gear Focus Admin{' '}
        </h1>
      </Stack>
    </Container>
  );
};

export default Header;
