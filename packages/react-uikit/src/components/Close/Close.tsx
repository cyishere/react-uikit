interface CloseProps {
  red?: boolean;
}

export const Close: React.FC<CloseProps> = ({ red }) => {
  return <div style={{ backgroundColor: red ? 'red' : 'none' }}>Close Component</div>;
};
