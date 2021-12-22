function Wrapper({...props}) {
  return (
    <div
      role='group'
      {...props}
    >
      {props.children}
    </div>
  );
}

export default Wrapper;