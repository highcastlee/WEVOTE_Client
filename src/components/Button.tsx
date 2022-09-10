import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  bgColor?: string;
  color?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: string;
}

interface buttonStyleProps {
  bgColor?: string;
  color?: string;
}

export default function StyledButton(props: ButtonProps) {
  const { type, bgColor, color, disabled, onClick, children } = props;

  return (
    <Button
      type={type}
      bgColor={bgColor}
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

const Button = styled.button<buttonStyleProps>`
  width: 100px;
  height: 40px;
  border-radius: 15px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2));
  background: ${(props) => props.bgColor};
  color: ${(props) => props.color};
`;
