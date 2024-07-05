interface LabelProps {
  text: string;
}

function Label({ text }: LabelProps) {
  return (
    <span>{text}</span>
  )
}

export { Label };