function Text({ className, text }: { className: string, text: string }) {
  return (<span className={className}>{text}</span>);
}

export default Text;