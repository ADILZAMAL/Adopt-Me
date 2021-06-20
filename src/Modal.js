import ReactDOM from "react-dom";
export default function Modal({ children }) {
  return ReactDOM.createPortal(
    <div>{children}</div>,
    document.getElementById("modal")
  );
}
