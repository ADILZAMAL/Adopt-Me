import { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundaries from "./ErrorBoundaries";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true, showModal: false, redirect: false };
    this.toggleModal = this.toggleModal.bind(this);
    this.adopt = this.adopt.bind(this);
  }
  async componentDidMount() {
    console.log(this.props);
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  adopt = () => {
    this.toggleModal();
    window.alert("Pet Adopted");
    this.setState({ redirect: true });
  };
  render() {
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    } else if (this.state.redirect) {
      return <Redirect to="/details" />;
    }

    const { animal, breed, city, state, description, name, images, showModal } =
      this.state;

    return (
      <div className="details">
        <Carousel images={images} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
        </div>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.adopt}>Yes</button>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundaries(props) {
  return (
    <ErrorBoundaries>
      <DetailsWithRouter {...props} />
    </ErrorBoundaries>
  );
}
