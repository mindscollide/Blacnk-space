import React from "react";
import Button from "react-bootstrap/Button";

const CustomButton = ({
  text,
  icon,
  onDoubleClick,
  onClick,
  className,
  icon2,
  disableBtn,
  variant,
  size,
  color,
  align,
  type,
  onChange,
  style,
  pdfIcon,
  pdfIconClass,
  iconClass,
  imgIcon,
  id,
}) => {
  return (
    <>
      <Button
        type={type}
        color={color}
        size={size}
        className={className}
        variant={variant}
        disabled={disableBtn}
        onClick={onClick}
        onChange={onChange}
        align={align}
        style={style}
        id={id}
        onDoubleClick={onDoubleClick}
      >
        <span className={iconClass}>{icon}</span>
        {text}
        {icon2}
        {imgIcon && <img src={imgIcon} alt="Icon" />}
        <img className={pdfIconClass} src={pdfIcon} />
      </Button>
    </>
  );
};

export default CustomButton;
