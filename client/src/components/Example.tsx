


type MyComponentProps = {
    message: string;
};
  
const MyComponent: React.FC<MyComponentProps> = ({ message }) => {
    return <div>{message}</div>;
};