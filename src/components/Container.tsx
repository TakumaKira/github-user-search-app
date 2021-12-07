import './Container.css';

function Container(props: any) {
  return (
    <div className="Container">
      {props.children}
    </div>
  );
}

export default Container;