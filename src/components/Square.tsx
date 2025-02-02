interface Props {
  value?: string | null; //  question mark means the field is not required
  onClickSquare: () => void;
}

export default function Square(props: Props) {
  const { value, onClickSquare } = props;

  return (
    <>
      <button className="square" onClick={() => onClickSquare()}>
        {value}
      </button>
    </>
  );
}
